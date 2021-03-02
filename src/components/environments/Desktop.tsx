import React, { Component, KeyboardEvent, MouseEvent, Suspense, useState } from 'react'
import Taskbar from '../ui/Taskbar'

import DesktopAppIcon from '../ui/DesktopAppIcon';
import DesktopWindow from '../ui/DesktopWindow';
import { App, ConfigTypes } from '../../types/ContextData';

import Notepad from '../apps/app.notepad/app'
import Webcam from '../apps/app.webcam/app'
import Browser from '../apps/app.browser/app'

import HelpMonkey from '../ui/HelpMonkey';
import FormatTime from '../../scripts/FormatTime';
import devmode from '../../devmode.json';

interface props {
    Consumer: React.Consumer<{}>
    production: boolean
}

interface state {
    time: number
    time_speed: number
    apps: any
    adware_popups: any[]
}

export default class Desktop extends Component<props, state> {
    timeInterval: NodeJS.Timeout

    constructor(props) {
        super(props);

        this.openApp = this.openApp.bind(this);
        this.closeApp = this.closeApp.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.AppClickEvent = this.AppClickEvent.bind(this);

        this.state = {
            time: 850, // Ingame start time (later load from save file)
            time_speed: 2000,
            adware_popups: [],
            apps: {
                "app.browser": {
                    content: (<Browser Consumer={this.props.Consumer}/>),
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

    setTimeSpeed(speed: number) {
        if(this.timeInterval) clearInterval(this.timeInterval);

        this.timeInterval = setInterval(() => {
            const hours = Math.floor(this.state.time/60);
            const minutes = Math.floor(this.state.time - (hours*60));

            if(hours+1 >= 24 && minutes >= 59) this.setState({time: 0});
            else this.setState({ time: (hours+1 > 24) ? 0 : this.state.time + 1  });
        }, speed);
    }

    componentDidUpdate() {
        this.setTimeSpeed(this.state.time_speed);
    }

    componentWillUnmount() {
        document.body.onkeydown = null;
        document.body.onkeyup = null;
    }

    componentDidMount() {

        /* Game System time speed */
        this.setState({ time_speed: 2000 });

        /* Developer features */
        if(!this.props.production) {

            const developerHotKeys = (e: KeyboardEventInit) => {
                    // @ts-ignore
                    if(e.type === "keydown" && e.key === "t" && e.ctrlKey) {
                        this.setState({ time_speed: 1 });
                    } else {
                        this.setState({ time_speed: 2000 });
                    }
            }

            document.body.onkeydown = developerHotKeys;
            document.body.onkeyup = developerHotKeys;

            if(devmode.appDebugger.enabled) this.openApp(devmode.appDebugger.app);
        }


        /*
        let virus = setInterval(() => {
            if(this.state.adware_popups.length <= 30) this.setState({ adware_popups: [...this.state.adware_popups, (<Ad nsfw={true} banner={false}/>)]})
            
            const errorSound = new Audio('./assets/audio/UI_ERROR.mp3');
            errorSound.volume = 0.1;
            errorSound.play();
        }, 50);
        */
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
                                        title={app.title}
                                        icon={app.icon}
                                        content={this.state.apps[app.id] ? this.state.apps[app.id].content : ""}
                                        visibility={this.state.apps[app.id] ? this.state.apps[app.id].visible : true}
                                        close={() => this.closeApp(app.id)}
                                        hide={() => this.toggleVisibility(app.id)}
                                        Consumer={this.props.Consumer}
                                    />
                                ))}

                                {/* Virus */}
                                {this.state.adware_popups.map(ad => {
                                    
                                    const index = this.state.adware_popups.findIndex(e => e == ad );

                                    return (<DesktopWindow
                                        key={"a"}
                                        active={true}
                                        title={"Application Error"}
                                        content={ad}
                                        visibility={true}
                                        close={() => console.log("a")}
                                        hide={() => console.log("b")}
                                        x={25*(Math.floor(index/10)*8+1) + (25*index)}
                                        y={50*(Math.floor((index % 10)/10)+1) + (25*(index % 10))}
                                        Consumer={this.props.Consumer}
                                    />)
                                })}
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

