const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, globalShortcut, ipcMain, session } = electron;

let w;

app.on('ready', () => {

    // Initialize the game window
    w = new BrowserWindow({
        //icon: "./icon.png",
        webPreferences: {
            nodeIntegration: true
        }
    });

    w.setMenu(null);

    ipcMain.on("retrieve-data", (event, arg) => {
        let val = "";

        switch (arg) {
            case "isPackaged":
                val = app.isPackaged;
                break;
            case "isFullscreen":
                val = w.isFullScreen();
                break;
        }

        return event.returnValue = val;
    });


    ipcMain.on("window-action", (event, arg) => {
        let val = "";

        switch (arg) {
            case "toggleFullscreen":
                const a = !w.isFullScreen();
                w.setFullScreen(a);
                val = a;
                break;
        }

        return event.returnValue = val;
    });

    if (app.isPackaged) {

        w.loadFile(path.join(__dirname, "./compiled/index.html"));

        globalShortcut.register("Ctrl+R", () => {
            w.loadURL(path.join(__dirname, "./compiled/index.html"));
        });

        w.setFullScreen(true);
        
    } else {
        w.loadURL("http://localhost:8080");

        globalShortcut.register("Ctrl+R", () => {
            w.loadURL("http://localhost:8080");
        });
    }

    globalShortcut.register("Ctrl+F12", () => {
        w.isFocused() && w.webContents.toggleDevTools();
    });

});