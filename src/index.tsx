import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import Desktop from './components/environments/Desktop';
import os from 'os';
import './styles/main.scss'

// Update to utilize player save when implemented
import DesktopConfig from './configs/template/Desktop.json';

// Context
const Context = React.createContext({});

const ipc = window.require('electron').ipcRenderer;

const App = () => {

    const [state, setState] = useState({
        computer_username: os.userInfo().username,
        desktop_config: DesktopConfig,
        production: ipc.sendSync("retrieve-data", "isPackaged"),
    });

    const [gameState, setGameState] = useState("ingame");

    useEffect(() => {
        document.onkeyup = (e) => {
            if (e.key === "F11") {
                const isFullscreen = ipc.sendSync("window-action", "toggleFullscreen");
                if(state.production) setGameState(isFullscreen ? "ingame" : "paused");
            }
        };
    }, [gameState, setGameState]);

    return (
        <Context.Provider value={state}>

            {/* Pause screen */}
            <div className={`pause-screen ${(gameState === "paused") ? "active" : ""}`}>
                <h1>Game is paused</h1>
                <button onClick={() => ipc.sendSync("window-action", "toggleFullscreen")}>Resume game</button>
            </div>

            <Desktop Consumer={Context.Consumer} />
        </Context.Provider>
    )
};


ReactDOM.render(<App />, document.getElementById("view"));