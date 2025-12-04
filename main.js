const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 700,
        resizable: false,
        title: "IBUS-SAS Calculator",
        icon: path.join(__dirname, "public/Ibus-Sas-Calculator.png"),
        webPreferences: {
            contextIsolation: true
        }
    });

    win.loadFile(path.join(__dirname, "build/index.html"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});