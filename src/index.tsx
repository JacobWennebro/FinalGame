import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import Desktop from './components/environments/Desktop';
import os from 'os';
import './styles/main.scss'

import { updateWallpaper } from './scripts/DesktopManager';

// Update to utilize player save when implemented
import DesktopConfig from './configs/template/Desktop.json';

// Context
const Context = React.createContext({});

const App = () => {

    const [state, setState] = useState({
        computer_username: os.userInfo().username,
        desktop_config: DesktopConfig
    });

    return(
        <Context.Provider value={state}>
            <Desktop Consumer={Context.Consumer}/>
        </Context.Provider>
    )
};


ReactDOM.render(<App/>, document.getElementById("view"));