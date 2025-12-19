const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const Store = require("electron-store").default;

// Change userData path to a 'data' folder next to the executable
app.setPath(
  "userData",
  path.join(path.dirname(app.getPath("exe")), "data")
);

const store = new Store({
  name: "window-state"
});

// Check if we're in development based on the environment variable or if we're running from source
const isDev = !app.isPackaged;
const fixedWidth = 620;
const fixedHeight = 862;

function createWindow() {

    const state = store.get("windowState", {
        x: undefined,
        y: undefined
    });

    // More robust preload path resolution
    let preloadPath;
    if (isDev) {
        preloadPath = path.join(__dirname, "src", "preload.js");
    } else {
        // In production, try multiple possible locations
        preloadPath = path.join(__dirname, "preload.js");
        
        // Fallback paths
        const alternativePaths = [
            path.join(process.resourcesPath, "app", "preload.js"),
            path.join(process.resourcesPath, "preload.js"),
            path.join(__dirname, "..", "preload.js"),
        ];
        
        const fs = require('fs');
        if (!fs.existsSync(preloadPath)) {
            for (const altPath of alternativePaths) {
                if (fs.existsSync(altPath)) {
                    preloadPath = altPath;
                    break;
                }
            }
        }
    }

    console.log('Preload path:', preloadPath);
    console.log('__dirname:', __dirname);
    console.log('isDev:', isDev);

    const mainWindow = new BrowserWindow({
        width: fixedWidth,
        height: fixedHeight,
        x: state.x,
        y: state.y,
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

    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');        
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
        // TEMPORARY: Open DevTools in production for debugging
        //mainWindow.webContents.openDevTools();
    }

    // Log when preload script loads
    mainWindow.webContents.on('did-finish-load', () => {
        console.log('Page loaded');
        // Test if window.electron is available
        mainWindow.webContents.executeJavaScript('typeof window.electron !== "undefined"')
            .then(result => console.log('window.electron exists:', result))
            .catch(err => console.error('Error checking window.electron:', err));
    });

    const saveState = () => {
        if (!mainWindow) return;

        const bounds = mainWindow.getBounds();

        store.set("windowState", {
            x: bounds.x,
            y: bounds.y
        });
    };

    mainWindow.on("close", saveState);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on("window:minimize", (event) => {
    console.log('Minimize event received');
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) {
        win.minimize();
        console.log('Window minimized');
    } else {
        console.log('Window not found');
    }
});

ipcMain.on("window:close", (event) => {
    console.log('Close event received');
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) {
        win.close();
        console.log('Window closed');
    } else {
        console.log('Window not found');
    }
});