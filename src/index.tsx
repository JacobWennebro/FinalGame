import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import Desktop from './components/environments/Desktop';
import os from 'os';
import osinfo from 'systeminformation'
import DeveloperScreen from './components/environments/DeveloperScreen';
import './styles/main.scss'

// Update to utilize player save when implemented
import DesktopConfig from './configs/template/Desktop.json';
import TitleScreen from './components/environments/TitleScreen';

// Context
const Context = React.createContext({});

const ipc = window.require('electron').ipcRenderer;

const introSequence = [
    {
        time: 2,
        component: DeveloperScreen
    },
    {
        time: null,
        component: TitleScreen
    },
]

const App = () => {

    process.env.PRODUCTION = ipc.sendSync("retrieve-data", "isPackaged");

    const [state, setState] = useState({
        computer_username: os.userInfo().username,
        desktop_config: DesktopConfig,
        production: process.env.PRODUCTION === "true",
        networks: null,
        battery: null,
        environment: introSequence[0].component
    });

    const [gameState, setGameState] = useState("ingame");

    useEffect(() => {
        document.onkeyup = (e) => {
            if (e.key === "F11") {
                const isFullscreen = ipc.sendSync("window-action", "toggleFullscreen");
                if(state.production) setGameState(isFullscreen ? "ingame" : "paused");
            }
        };

        /* Fetch system info */
        (async () => {
            const networks = await osinfo.wifiNetworks();
            const battery = await osinfo.battery();
        
            console.log(networks);

            setState({
                ...state,
                networks,
                battery: battery.hasBattery ? battery : null
            });            
        })();

        for(let i=0; i < introSequence.length; i++) {
            const s = introSequence[i];
            if(!s.time) continue;

            setTimeout(() => {

                setState({...state, environment: introSequence[i+1].component})

            }, s.time*1000);
        }

        
    }, [gameState, setGameState]);

    function setEnvironment(env: any) {
        setState({ ...state, environment: env});
    }

    return (
        <Context.Provider value={state}>

            {/* Pause screen */}
            <div className={`pause-screen ${(gameState === "paused") ? "active" : ""}`}>
                <h1>Game is paused</h1>
                <button onClick={() => ipc.sendSync("window-action", "toggleFullscreen")}>Resume game</button>
            </div>

            <state.environment setEnvironment={setEnvironment} production={state.production} Consumer={Context.Consumer} />

        </Context.Provider>
    )
};


ReactDOM.render(<App />, document.getElementById("view"));