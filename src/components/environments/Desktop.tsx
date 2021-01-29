import React, { Component, MouseEvent, Suspense, useState } from 'react'
import Taskbar from '../ui/Taskbar'

import DesktopAppIcon from '../ui/DesktopAppIcon';
import DesktopWindow from '../ui/DesktopWindow';
import { App, ConfigTypes } from '../../types/ContextData';

import Notepad from '../apps/app.notepad/app'
import Webcam from '../apps/app.webcam/app'
import Browser from '../apps/app.browser/app'

import HelpMonkey from '../ui/HelpMonkey';
import FormatTime from '../../scripts/FormatTime';

interface props {
    Consumer: React.Consumer<{}>
}

interface state {
    time: number
    apps: any
}

export default class Desktop extends Component<props, state> {
    constructor(props) {
        super(props);

        this.openApp = this.openApp.bind(this);
        this.closeApp = this.closeApp.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.AppClickEvent = this.AppClickEvent.bind(this);

        this.state = {
            time: 850, // Ingame start time (later load from save file)
            apps: {
                "app.browser": {
                    content: (<Browser/>),
                    active: false,
                    visible: true,
                },
                "app.notepad": {
                    content: (<Notepad />),
                    active: false,
                    visible: true
                },
                "app.webcam": {
                    content: (<Webcam />),
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
    }

    DesktopClickEvent(e: MouseEvent<HTMLDivElement>) {
        // Cancel actions if scroll button is pressed
        if (e.button == 1) return;

        const clickSoundEffect = new Audio('./assets/audio/UI_MOUSE_CLICK.mp3');
        clickSoundEffect.volume = 0.1;
        clickSoundEffect.play();

        /* Left click */
        if (e.button == 0) {
            console.log("left click");
        }
        /* Right click */
        else if (e.button == 2) {
            console.log("right click")
        }

    }

    AppClickEvent(id: string) {
        const app = this.state.apps[id];

        let state = this.state;
        const clicks = state.apps[id].clicks;

        if(clicks+1 >= 2) {
            
            // App is open but hidden
            if(app.active && !app.visible) this.toggleVisibility(id);

            // App is closed
            else if(!app.active) {
                document.body.classList.add("progress-state");
                
                setTimeout(() => {
                    this.openApp(id);
                    document.body.classList.remove("progress-state");
                }, Math.floor(Math.random()*2000));

            }
        }
        else {
            state.apps[id].clicks = clicks != undefined ? clicks + 1 : 1;
            this.setState(state);
    
            setTimeout(() => {
                state.apps[id].clicks = 0;
                this.setState(state);
            }, 250)
    
            //console.log(this.state.apps[id].clicks);
        }

    }

    openApp(id: string) {
        let state = this.state;
        state.apps[id].active = true;
        this.setState(state);
    }

    closeApp(id: string) {
        let state = this.state;
        state.apps[id].active = false;
        this.setState(state);
    }

    toggleVisibility(id: string) {
        let state = this.state;
        state.apps[id].visible = !state.apps[id].visible;
        this.setState(state);
    }

    componentDidMount() {

        /* Game System time */
        setInterval(() => {
            const hours = Math.floor(this.state.time/60);
            this.setState({ time: (hours >= 24) ? 0 : this.state.time + 1  });
        }, 2000)

    }

    render() {
        return (
            <this.props.Consumer>
                {(data: ConfigTypes) => (
                    <div onMouseDown={this.DesktopClickEvent} className="desktop">

                        {/* Desktop window container */}
                        <div className="desktop__board" id="wallpaper" style={{ background: data.desktop_config.wallpaper as string }}>
                            {!data.production ? (<span id="debugInfo">Developer mode | Game clock: {this.state.time} | Formatted clock {FormatTime(this.state.time)}</span>) : (<React.Fragment/>)}
                            <div className="desktop__board__window__container">
                                {data.desktop_config.apps.map((app: App) => (
                                    <DesktopWindow
                                        key={app.id}
                                        active={this.state.apps[app.id] ? this.state.apps[app.id].active : false}
                                        id={app.id}
                                        title={app.title}
                                        icon={app.icon}
                                        content={this.state.apps[app.id] ? this.state.apps[app.id].content : ""}
                                        visibility={this.state.apps[app.id] ? this.state.apps[app.id].visible : true}
                                        close={() => this.closeApp(app.id)}
                                        hide={() => this.toggleVisibility(app.id)}
                                    />
                                ))}
                            </div>
                            
                            {/* Bonzo buddy ? */}
                            <HelpMonkey />
                            
                            {/* Desktop app icon container */}
                            <div className="desktop__board__apps">
                                {data.desktop_config.apps.map((app: App) => (
                                    <DesktopAppIcon onClick={this.AppClickEvent} title={app.title} icon={app.icon} id={app.id} key={app.id} />
                                ))}
                            </div>
                        </div>

                        <Taskbar time={this.state.time} toggleVisibility={this.toggleVisibility} apps={data.desktop_config.apps} active_apps={this.state.apps} />
                    </div>
                )}
            </this.props.Consumer>
        )
    }
}

