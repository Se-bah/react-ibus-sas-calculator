const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Store = require("electron-store").default;
const { log, initLogger } = require('./logger');

// Determine if running in portable mode or installed mode 
const isPortable = process.env.PORTABLE_EXECUTABLE_DIR !== undefined;

if (isPortable) {
    // APPDATA is used on Windows, HOME on linux
    const appDataPath = path.join(
        process.env.APPDATA || process.env.HOME,
        "IBUS-SAS-Calculator"
    );
    app.setPath("userData", appDataPath);
} else {
    // For installed version: use data folder next to executable
    app.setPath(
        "userData",
        path.join(path.dirname(app.getPath("exe")), "data")
    );
}

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
    log(`Portable mode: ${isPortable}`);
    log(`User data path: ${app.getPath('userData')}`);

    // Restore previous window position from storage
    const savedState = store.get("windowState", {
        x: undefined,
        y: undefined
    });


    // Determine correct preload script path based on environment
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
        frame: false,
        transparent: true,
        backgroundColor: '#00000000',
        title: "IBUS-SAS Calculator",
        icon: path.join(__dirname, "public/Ibus-Sas-Calculator.png"),
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: preloadPath
        }
    });

    // Load appropriate content based on environment
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');        
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
    }

    // Verify preload script loaded successfully
    mainWindow.webContents.on('did-finish-load', () => {
        log('Window content loaded successfully');
        
        mainWindow.webContents.executeJavaScript('typeof window.electron !== "undefined"')
            .then(result => log(`Preload bridge active: ${result}`))
            .catch(err => log(`Preload bridge check failed: ${err}`, 'ERROR'));
    });

    // Save window position on close
    const saveWindowState = () => {
        if (!mainWindow) return;
        
        const bounds = mainWindow.getBounds();
        const stateToSave = {
            x: bounds.x,
            y: bounds.y
        };
        
        store.set("windowState", stateToSave);
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