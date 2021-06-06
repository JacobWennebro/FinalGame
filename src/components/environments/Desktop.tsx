import React, { Component, KeyboardEvent, MouseEvent, Suspense, useState } from 'react'
import Taskbar from '../ui/Taskbar'

import DesktopAppIcon from '../ui/DesktopAppIcon';
import DesktopWindow from '../ui/DesktopWindow';
import { App, ConfigTypes } from '../../types/ContextData';

import Notepad from '../apps/app.notepad/app'
import Webcam from '../apps/app.webcam/app'
import Browser from '../apps/app.browser/app'
import MainSettings from '../apps/app.mainsettings/app'
import ThemeSettings from '../apps/app.themesettings/app'
import Messenger from '../apps/app.messenger/app'

import HelpMonkey from '../ui/HelpMonkey';
import FormatTime from '../../scripts/FormatTime';
import devmode from '../../devmode.json';
import ContextMenu from '../ui/ContextMenu';
import GameSave from '../../scripts/SaveManager';
import SaveManager from '../ui/SaveManagerInterface';
import Ad from '../webcomponents/Ad';

interface props {
    Consumer: React.Consumer<{}>
    production: boolean
    setEnvironment: (env: any) => void
    save: GameSave
}

interface state {
    time: number
    time_speed: number
    apps: any
    adware_popups: any[]
    show_save_manager: boolean
    cxm: {
        visibility: boolean
        x: number
        y: number
    }
}

export default class Desktop extends Component<props, state> {
    timeInterval: NodeJS.Timeout

    constructor(props) {
        super(props);

        this.openApp = this.openApp.bind(this);
        this.closeApp = this.closeApp.bind(this);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.AppClickEvent = this.AppClickEvent.bind(this);
        this.DesktopClickEvent = this.DesktopClickEvent.bind(this);
        this.setNotification = this.setNotification.bind(this);

        this.state = {
            time: 850, // Ingame start time (later load from save file)
            time_speed: 2000,
            show_save_manager: false,
            adware_popups: [],
            cxm: {
                visibility: false,
                x: 0,
                y: 0
            },
            apps: {
                "app.browser": {
                    content: (<Browser Consumer={this.props.Consumer}/>),
                    active: false,
                    visible: true,
                    notifications: 0
                },
                "app.messenger": {
                    content: (<Messenger/>),
                    active: false,
                    visible: true,
                    notifications: 14
                },
                "app.notepad": {
                    content: (<Notepad />),
                    active: false,
                    visible: true,
                    notifications: 0
                },
                "app.webcam": {
                    content: (<Webcam />),
                    active: false,
                    visible: true,
                    notifications: 0
                },
                "app.pictures": {
                    content: (<h1>Pictures</h1>),
                    active: false,
                    visible: true,
                    notifications: 0
                },
                "app.mainsettings": {
                    content: (<MainSettings save={this.props.save}/>),
                    active: false,
                    visible: true,
                    notifications: 0
                },
                "app.themesettings": {
                    content: (<ThemeSettings save={this.props.save}/>),
                    active: false,
                    visible: true,
                    notifications: 0
                }
            }
        }

    }

    DesktopClickEvent(e: MouseEvent<HTMLDivElement>) {
        // Cancel actions if scroll button is pressed
        if (e.button == 1) return;

        const clickSoundEffect = new Audio('./assets/audio/UI_MOUSE_CLICK.mp3');
        clickSoundEffect.volume = 0.1;
        let clickSoundSetting = this.props.save.getSetting("clickSound");
        // If setting is undefined - default is true - or the setting is set to true play click sound
        if(typeof clickSoundSetting === undefined || clickSoundSetting == "true")
            clickSoundEffect.play();

        const startmenu = document.getElementById("startmenu");
        // When the user clicks close the start menu
        // Unless the user is clicking inside the start menu or the start menu button
        if(startmenu.style.display === "grid" 
            && !Array.from((e.target as HTMLElement).classList).find(c => c.startsWith("startmenu"))
            && !Array.from((e.target as HTMLElement).classList).find(c => c.startsWith("taskbar__start__button"))) {
            startmenu.style.display = "none";
        }

        /* Left click */
        if (e.button == 0) {
            console.log("left click");
            switch((e.target as HTMLDivElement).id.substr(3).toLowerCase()) {
                case "personalize":
                    this.slowOpenApp("app.themesettings", 2000);
                    break;
                case "settings":
                    this.slowOpenApp("app.mainsettings", 2000);
                    break;
            }

            this.setState({ cxm: {
                visibility: false,
                x: 0,
                y: 0
            } });

        }
        /* Right click */
        else if (e.button == 2) {
            console.log("right click");

            const target = e.target as HTMLElement;

            if(!target.classList.contains("desktop__board") && !target.classList.contains("desktop__board__apps")) return             this.setState({ cxm: {
                visibility: false,
                x: 0,
                y: 0
            } });;

            this.setState({ cxm: {
                visibility: true,
                x: e.clientX,
                y: e.clientY
            } });

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
                this.slowOpenApp(id, 2000);
            }
        }
        else {
            state.apps[id].clicks = clicks != undefined ? clicks + 1 : 1;
            this.setState(state);
    
            // Forget the number of clicks within 250 milliseconds
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

    // Opens app by id taking maxTime amount of milliseconds to load, showing the user a loading cursor
    slowOpenApp(id: string, maxTime: number) {
        document.body.classList.add("progress-state");
        setTimeout(() => {
            this.openApp(id);
            document.body.classList.remove("progress-state");
        }, Math.floor(Math.random()*maxTime));
    }

    setNotification(id: string, amount: number) {
        let state = this.state;
        state.apps[id].notifications = amount;
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

            document.body.setAttribute("data-game-time", this.state.time.toString());
        }, speed);
    }

    componentDidUpdate() {
        this.setTimeSpeed(this.state.time_speed);
    }

    componentWillUnmount() {
        document.body.onkeydown = null;
        document.body.onkeyup = null;

        document.body.removeAttribute("data-game-time");
    }

    componentDidMount() {

        /* Apply OS settings from save */
        if(this.props.save) {
            document.body.setAttribute("theme", this.props.save.getConstant("theme"));

        }

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


        
        // let virus = setInterval(() => {
        //     if(this.state.adware_popups.length <= 30) this.setState({ adware_popups: [...this.state.adware_popups, (<Ad redirect={null} nsfw={true} banner={false}/>)]})
            
        //     const errorSound = new Audio('./assets/audio/UI_ERROR.mp3');
        //     errorSound.volume = 0.1;
        //     errorSound.play();
        // }, 50);
        
    }

    render() {
        return (
            <this.props.Consumer>
                {(data: ConfigTypes) => (
                    <div onMouseDown={this.DesktopClickEvent} className="desktop">

                        
                        {   /* Save Manager is only accessible when dev/debug mode is enabled. */
                            this.state.show_save_manager ? (<SaveManager save={this.props.save}/>) : ""
                        }

                        {/* Desktop window container */}
                        <div className="desktop__board" id="wallpaper">
                            {!data.production ? (<span id="debugInfo"><b>Developer mode</b> | Game clock: {this.state.time} | Formatted clock {FormatTime(this.state.time)} | Save #{this.props.save.id} | <button onClick={() => this.setState({show_save_manager: !this.state.show_save_manager})}>Save manager</button></span>) : (<React.Fragment/>)}
                            
                            <ContextMenu openApp={this.openApp} visibility={this.state.cxm.visibility} x={this.state.cxm.x} y={this.state.cxm.y}/>
                            
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
                                        maxWidth={app.maxWidth}
                                        maxHeight={app.maxHeight}
                                        minWidth={app.minWidth}
                                        minHeight={app.minHeight}
                                        fullscreen={app.fullscreen}
                                        time={this.state.time}
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
                                        fullscreen={false}
                                        time={this.state.time}
                                    />)
                                })}
                            </div>
                            
                            {/* Bonzo buddy ? */}
                            <HelpMonkey />
                            
                            {/* Desktop app icon container */}
                            <div className="desktop__board__apps">
                                {data.desktop_config.apps.map((app: App) => (
                                    app.show ? <DesktopAppIcon onClick={this.AppClickEvent} setNotifications={this.setNotification} title={app.title} icon={app.icon} id={app.id} key={app.id} notifications={this.state.apps[app.id].notifications} /> : ""
                                ))}
                            </div>
                        </div>

                        <Taskbar setEnvironment={this.props.setEnvironment} openApp={this.openApp} time={this.state.time} toggleVisibility={this.toggleVisibility} apps={data.desktop_config.apps} active_apps={this.state.apps} />
                    </div>
                )}
            </this.props.Consumer>
        )
    }
}

