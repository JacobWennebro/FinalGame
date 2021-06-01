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
}

interface State {
    show_start_menu: boolean
}

export default class Taskbar extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props);

        this.state = {
            show_start_menu: false
        }

        this.hideStartMenu = this.hideStartMenu.bind(this);

    }

    hideStartMenu() {
        this.setState({ show_start_menu: false });
    }

    render() {
        return (
            <div className="taskbar">
                {this.state.show_start_menu ? (<StartMenu hide={this.hideStartMenu} apps={this.props.apps} openApp={this.props.openApp}/>) : ""}

                <button onClick={() => this.setState({ show_start_menu: !this.state.show_start_menu })} className="taskbar__start__button text-style-1">Start</button>
                
                <div className="taskbar__activity">
                    {Object.keys(this.props.active_apps).map(id => {
                        const app = this.props.active_apps[id];
                        const appmeta = this.props.apps.filter(app => app.id === id)[0];
    
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

