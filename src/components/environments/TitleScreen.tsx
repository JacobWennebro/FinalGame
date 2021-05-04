import React, { Component, MouseEvent } from 'react'
import Typed from 'react-typed'

import '../../styles/environments/TitleScreen.scss';
import { ConfigTypes } from '../../types/ContextData';
import Desktop from './Desktop';
import GameSave from '../../scripts/SaveManager'

export default class TitleScreen extends Component<{Consumer: React.Consumer<{}>, production: boolean, setEnvironment: (env: any, save?: GameSave) => void}> {
    WallpaperElement = React.createRef<HTMLDivElement>();
    SoundObject = new Audio('./assets/audio/INTRO_MUSIC.mp3');
    IPC = window.require('electron').ipcRenderer;

    constructor(props) {
        super(props);

        this.animateWallpaper = this.animateWallpaper.bind(this);
        this.handleAction = this.handleAction.bind(this);

        this.SoundObject.volume = 0.1;
        this.SoundObject.play();
    }

    componentDidMount() {
        this.IPC.sendSync("window-action", "toggleFullscreen")
    }

    componentWillUnmount() {
        this.SoundObject.pause();
        this.SoundObject = null;
    }

    animateWallpaper(e: MouseEvent<HTMLDivElement>) {
        const clickSoundEffect = new Audio('./assets/audio/UI_MOUSE_CLICK.mp3');
        clickSoundEffect.volume = 0.1;
        clickSoundEffect.play();

        const t = this.WallpaperElement.current;
        t.classList.add("clicked");

        setTimeout(() => {
            t.classList.remove("clicked");
        }, 1000);
    }
    
    handleAction(e: MouseEvent<HTMLUListElement>) {
        const t = (e.target as HTMLElement);
        let save;
        if(t.nodeName === "LI") {
            switch(t.getAttribute("data-action")) {
                case "devmode": 
                    this.props.setEnvironment(Desktop);
                break;
                case "newgame":
                    save = new GameSave();
                    this.props.setEnvironment(Desktop, save);
                break;
                case "loadgame":
                    save = new GameSave(0);
                    this.props.setEnvironment(Desktop, save);
                break;
            }
        }
    }

    buttonHoverEffect(e: MouseEvent<HTMLUListElement>) {
        const t = (e.target as HTMLElement);
        if(t.nodeName === "LI" && !t.classList.contains("seperator")) {
            const soundEffect = new Audio('./assets/audio/TITLE_BUTTON_HOVER.mp3');
            soundEffect.volume = 0.1;
            soundEffect.play();
        }
    }

    render() {
        return (
            <div onClick={this.animateWallpaper} className="title-screen">

                <div className="page-centerer v-center">
                    <div className="centerer v-center">
                        <h1>
                            <Typed
                                strings={['FINALGAME']}
                                typeSpeed={150}
                                showCursor={false}
                            />
                        </h1>
                        <div ref={this.WallpaperElement} className="wallpaper render-as-pixels"></div>
                        <ul onMouseOver={this.buttonHoverEffect} onClick={this.handleAction}>
                            <this.props.Consumer>
                                {(data: ConfigTypes) => !data.production ? (
                                    <>
                                        <li data-action="devmode" style={{color: "red"}}>developer mode</li>
                                        <li className="seperator"></li>
                                    </>
                                ) : ""}
                            </this.props.Consumer>
                            <li data-action="newgame">new game</li>
                            <li className="seperator"></li>
                            <li data-action="loadgame">load game</li>
                            <li className="seperator"></li>
                            <li data-action="credits">credits</li>
                        </ul>
                        <p id="copyright">&copy; 2021 Jacob Wennebro. ALL RIGHTS RESERVED.</p>
                    </div>

                </div>

            </div>
        )
    }
}
