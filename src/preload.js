const { contextBridge, ipcRenderer } = require("electron");

console.log('Preload script is running!');

contextBridge.exposeInMainWorld("electron", {
    minimize: () => {
        console.log('minimize() called from renderer');
        ipcRenderer.send("window:minimize");
    },
    close: () => {
        console.log('close() called from renderer');
        ipcRenderer.send("window:close");
    }
});

console.log('window.electron exposed successfully');