const electron = require('electron');
const path = require('path');
const DiscordRPC = require('discord-rpc');

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
            case "getAppPath":
                val = app.getAppPath();
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

    // Set this to your Client ID.
    const clientId = '817335112856764436';

    // Only needed if you want to use spectate, join, or ask to join
    DiscordRPC.register(clientId);

    const rpc = new DiscordRPC.Client({ transport: 'ipc' });
    const startTimestamp = new Date();

    async function setActivity() {
        if (!rpc || !w) {
            return;
        }

        // You'll need to have snek_large and snek_small assets uploaded to
        // https://discord.com/developers/applications/<application_id>/rich-presence/assets
        rpc.setActivity({
            startTimestamp,
            largeImageKey: 'monkey',
            smallImageKey: 'notepad',
            smallImageText: 'Using notepad',
            instance: false,
        });
    }

    rpc.on('ready', () => {
        setActivity();

        // activity can only be set every 15 seconds
        setInterval(() => {
            setActivity();
        }, 15e3);
    });

    rpc.login({ clientId }).catch(console.error);
});