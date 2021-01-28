import React, { Component, MouseEvent, Suspense, useState } from 'react'
import Taskbar from '../ui/Taskbar'

import DesktopAppIcon from '../ui/DesktopAppIcon';
import DesktopWindow from '../ui/DesktopWindow';
import { App, ConfigTypes } from '../../types/ContextData';

import Notepad from '../apps/app.notepad/app'
import Draggable from 'react-draggable';
import HelpMonkey from '../ui/HelpMonkey';

function DesktopClickEvent(e: MouseEvent<HTMLDivElement>) {
    const clickSoundEffect = new Audio('./assets/audio/UI_MOUSE_CLICK.mp3');
    clickSoundEffect.volume = 0.1;
    clickSoundEffect.play();
}

interface props {
    Consumer: React.Consumer<{}>
}

interface state {

}

export default class Desktop extends Component<props, state> {
    constructor(props) {
        super(props);

        this.openApp = this.openApp.bind(this);
        this.closeApp = this.closeApp.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);

        this.state = {
            "app.browser": {
                content: (<h1>Browser</h1>),
                active: false,
                visible: true
            },
            "app.notepad": {
                content: (<Notepad/>),
                active: false,
                visible: true
            },
            "app.webcam": {
                content: (<h1>Webcam</h1>),
                active: false,
                visible: true
            },
            "app.pictures": {
                content: (<h1>Pictures</h1>),
                active: false,
                visible: true
            }
        }

    }

    openApp(id: string) {
        let state = this.state;
        state[id].active = true;
        this.setState(state);
    }

    closeApp(id: string) {
        let state = this.state;
        state[id].active = false;
        this.setState(state);
    }

    toggleVisibility(id: string) {
        let state = this.state;
        state[id].visible = !state[id].visible;
        this.setState(state);
    }

    render() {
        return (
            <this.props.Consumer>
                {(data: ConfigTypes) => (
                    <div onMouseDown={DesktopClickEvent} className="desktop">

                        <div className="desktop__board" id="wallpaper" style={{ background: data.desktop_config.wallpaper as string }}>

                            <div className="desktop__board__window__container">
                                {data.desktop_config.apps.map((app: App) => (
                                    <DesktopWindow 
                                        key={app.id} 
                                        active={this.state[app.id] ? this.state[app.id].active : false} 
                                        id={app.id} 
                                        title={app.title} 
                                        icon={app.icon} 
                                        content={this.state[app.id] ? this.state[app.id].content : ""} 
                                        visibility={this.state[app.id] ? this.state[app.id].visible : true}
                                        close={() => this.closeApp(app.id)}
                                        hide={() => this.toggleVisibility(app.id)}
                                    />
                                ))}
                            </div>

                            <HelpMonkey/>

                            <div className="desktop__board__apps">
                                {data.desktop_config.apps.map((app: App) => (
                                    <DesktopAppIcon onClick={this.openApp} title={app.title} icon={app.icon} id={app.id} key={app.id} />
                                ))}
                            </div>
                        </div>

                        <Taskbar toggleVisibility={this.toggleVisibility} apps={data.desktop_config.apps} active_apps={this.state}/>
                    </div>
                )}
            </this.props.Consumer>
        )
    }
}

