const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Store = require("electron-store").default;
const { log, initLogger } = require('./logger');

// Set userData path to 'data' folder next to the executable
// This keeps user data portable with the app
app.setPath(
  "userData",
  path.join(path.dirname(app.getPath("exe")), "data")
);

const store = new Store({
  name: "window-state"
});


const isDev = !app.isPackaged && process.env.NODE_ENV === "development";

const WINDOW_WIDTH = 620;
const WINDOW_HEIGHT = 862;

/**
 * Creates the main application window
 * Restores previous window position if available
 */
function createWindow() {
    log('Creating application window...');

    // Restore previous window position from storage
    const savedState = store.get("windowState", {
        x: undefined,
        y: undefined
    });

    // Determine correct preload script path based on environment
    // In development: preload.js is in src/ folder
    // In production: preload.js is copied to resources/ folder (not in app.asar)
    // We need this distinction to ensure the preload script is accessible after packaging
    const preloadPath = app.isPackaged 
        ? path.join(process.resourcesPath, "preload.js")
        : path.join(__dirname, "src", "preload.js");

    log(`Environment: ${isDev ? 'DEVELOPMENT' : 'PRODUCTION'}`);
    log(`Preload path: ${preloadPath}`);

    // Create the browser window with custom titlebar
    const mainWindow = new BrowserWindow({
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        x: savedState.x,
        y: savedState.y,
        resizable: false,
        frame: false,              // Remove default titlebar for custom controls
        transparent: true,         // Enable transparent background for rounded corners
        backgroundColor: '#00000000',
        title: "IBUS-SAS Calculator",
        icon: path.join(__dirname, "public/Ibus-Sas-Calculator.png"),
        webPreferences: {
            contextIsolation: true,  // Security: isolate preload context from renderer
            nodeIntegration: false,  // Security: disable Node.js in renderer
            preload: preloadPath
        }
    });

    // Load appropriate content based on environment
    if (isDev) {
        // Development: connect to React dev server
        mainWindow.loadURL('http://localhost:3000');        
        mainWindow.webContents.openDevTools();
    } else {
        // Production: load built static files
        mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
    }

    // Verify preload script loaded successfully
    mainWindow.webContents.on('did-finish-load', () => {
        log('Window content loaded successfully');
        
        mainWindow.webContents.executeJavaScript('typeof window.electron !== "undefined"')
            .then(result => log(`Preload bridge active: ${result}`))
            .catch(err => log(`Preload bridge check failed: ${err}`, 'ERROR'));
    });

    /**
     * Save window position before closing
     * Only saves position, not size (since window is fixed size)
     */
    const saveWindowState = () => {
        if (!mainWindow) return;
        
        const bounds = mainWindow.getBounds();
        store.set("windowState", {
            x: bounds.x,
            y: bounds.y
        });
        log('Window state saved');
    };

    mainWindow.on("close", saveWindowState);
}

// Initialize app when Electron is ready
app.whenReady().then(() => {
    initLogger(app);
    log('=== IBUS-SAS Calculator Started ===');
    createWindow();
});

// Quit when all windows are closed (except on macOS)
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        log('All windows closed, quitting app');
        app.quit();
    }
});

// Recreate window when dock icon is clicked on macOS
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

/**
 * IPC Handler: Minimize window
 * Called from renderer via window.electron.minimize()
 */
ipcMain.on("window:minimize", (event) => {
    log('Minimize requested');
    const win = BrowserWindow.fromWebContents(event.sender);
    
    if (win) {
        win.minimize();
        log('Window minimized');
    } else {
        log('Failed to minimize: window not found', 'ERROR');
    }
});

/**
 * IPC Handler: Close window
 * Called from renderer via window.electron.close()
 */
ipcMain.on("window:close", (event) => {
    log('Close requested');
    const win = BrowserWindow.fromWebContents(event.sender);
    
    if (win) {
        win.close();
        log('Window closed');
    } else {
        log('Failed to close: window not found', 'ERROR');
    }
});