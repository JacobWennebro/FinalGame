import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import os from 'os';
import osinfo from 'systeminformation'
import DeveloperScreen from './components/environments/DeveloperScreen';

// Devmode properties
import Devmode from './devmode.json';

import './styles/main.scss'

// Update to utilize player save when implemented
import DesktopConfig from './data/template/Desktop.json';
import TitleScreen from './components/environments/TitleScreen';
import Desktop from './components/environments/Desktop';
import GameSave from './scripts/SaveManager';

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
        save: null,
        computer_username: os.userInfo().username,
        desktop_config: DesktopConfig,
        production: process.env.PRODUCTION === "true",
        networks: null,
        battery: null,
        environment: process.env.PRODUCTION === "true" || Devmode.titleScreen ? introSequence[0].component : Desktop
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

        if(process.env.PRODUCTION === "true" || Devmode.titleScreen) {
            for(let i=0; i < introSequence.length; i++) {
                const s = introSequence[i];
                if(!s.time) continue;
    
                setTimeout(() => {
    
                    setState({...state, environment: introSequence[i+1].component})
    
                }, s.time*1000);
            }
        }
        
    }, [gameState, setGameState]);

    function setEnvironment(env: any, save?: GameSave) {
        setState({ ...state, environment: env, save });
    }
    
    try {
        return (
            <Context.Provider value={state}>
    
                {/* Pause screen */}
                <div className={`pause-screen ${(gameState === "paused") ? "active" : ""}`}>
                    <h1>Game is paused</h1>
                    <button onClick={() => ipc.sendSync("window-action", "toggleFullscreen")}>Resume game</button>
                </div>
    
                <state.environment setEnvironment={setEnvironment} production={state.production} Consumer={Context.Consumer} save={state.save} />
    
            </Context.Provider>
        )
    } catch(e) {
        console.log("bologna");
    }
};


ReactDOM.render(<App />, document.getElementById("view"));