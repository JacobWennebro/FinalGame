import React, { Component } from 'react'
import FormatTime from '../../scripts/FormatTime';
import { App } from '../../types/ContextData';
import StartMenu from './StartMenu';
import TaskbarApp from './TaskbarApp'

interface Props { 
    active_apps: any, 
    apps: App[], 
    toggleVisibility: (id: string) => void, 
    time: number
    openApp: (id: string) => void;
    setEnvironment: (component: any) => void;
}

interface State {
    show_start_menu: boolean
}

export default class Taskbar extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props);

        this.ToggleStartMenuDisplayState = this.ToggleStartMenuDisplayState.bind(this);
    }

    ToggleStartMenuDisplayState() {
        const startmenu = document.getElementById("startmenu");
        if(startmenu) startmenu.style.display = startmenu.style.display === "grid" ? "none" : "grid";
    }

    render() {
        return (
            <div className="taskbar">
                
                <StartMenu setEnvironment={this.props.setEnvironment} apps={this.props.apps} openApp={this.props.openApp}/>

                <button onClick={this.ToggleStartMenuDisplayState} className="taskbar__start__button text-style-1">Start</button>
                
                <div className="taskbar__activity">
                    {Object.keys(this.props.active_apps).map(id => {
                        const app = this.props.active_apps[id];
                        const appmeta = this.props.apps.find(app => app.id === id);
    
                        return app.active ? <TaskbarApp key={id} toggleVisibility={() => this.props.toggleVisibility(id)} title={appmeta.title} icon={appmeta.icon}/> : <React.Fragment/>;
                    })}
                </div>
    
                <div className="taskbar__time">
                    <span className="v-center">{FormatTime(this.props.time)}</span>
                </div>
            </div>
        )
    }
}

