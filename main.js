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
const isDev = process.env.NODE_ENV === 'development' && !app.isPackaged;

// Fix preload path for both dev and production
const preloadPath = isDev
    ? path.join(__dirname, "src/preload.js")
    : path.join(__dirname, "preload.js");

const fixedWidth = 620;
const fixedHeight = 862;



function createWindow() {

    const state = store.get("windowState", {
        x: undefined,
        y: undefined
    });

    const mainWindow = new BrowserWindow({
        width: fixedWidth,
        height: fixedHeight,
        x: state.x,
        y: state.y,
        resizable: false,  // Disable resizing
        frame: false,
        transparent: true,  // Make window background transparent
        backgroundColor: '#00000000',  // Fully transparent background
        title: "IBUS-SAS Calculator",
        icon: path.join(__dirname, "public/Ibus-Sas-Calculator.png"),
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: preloadPath
        }
    });

    if (isDev) {
        // Load the React dev server URL
        mainWindow.loadURL('http://localhost:3000');        
        // Open DevTools in development
        mainWindow.webContents.openDevTools();
    } else {
        // Load the built static files for production
        mainWindow.loadFile('build/index.html');
    }



    const saveState = () => {
        if (!mainWindow) return;

        const bounds = mainWindow.getBounds();

        // Only save position, not size (since it's fixed)
        store.set("windowState", {
            x: bounds.x,
            y: bounds.y
        });
    };

    // Save on close
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
    //mainWindow?.getFocusedWindow()?.minimize();
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.minimize();
});

ipcMain.on("window:close", (event) => {
    //mainWindow?.getFocusedWindow()?.close();
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.close();
});