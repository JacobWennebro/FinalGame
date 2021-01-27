const electron = require('electron');
const path = require('path');

const {app, BrowserWindow, globalShortcut} = electron;

let w;

app.on('ready', () => {

    // Initialize the game window
    w = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    w.setMenu(null);

    if(app.isPackaged) {
        w.loadURL(path.join(__dirname, "./dist/index.html"));
    } else {
        w.loadURL("http://localhost:8080");
    
        globalShortcut.register("Ctrl+R", () => {
            w.loadURL("http://localhost:8080");
        });
    }

    globalShortcut.register("Ctrl+F12", () => {
        w.isFocused() && w.webContents.toggleDevTools();
    });

    globalShortcut.register("F11", () => {
        if(w.isFullScreen()) w.setFullScreen(false);
        else w.setFullScreen(true);
    });

});