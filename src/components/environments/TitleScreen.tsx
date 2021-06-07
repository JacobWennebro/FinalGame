import React, { Component, createRef, MouseEvent, RefObject } from 'react'
import Typed from 'react-typed'

import '../../styles/environments/TitleScreen.scss';
import { ConfigTypes } from '../../types/ContextData';
import Desktop from './Desktop';
import GameSave from '../../scripts/SaveManager'
import ListSave from '../ui/Save'

interface Props { 
    Consumer: React.Consumer<{}>, 
    production: boolean, 
    setEnvironment: (env: any, save?: GameSave) => void
}

interface State {
    showSaves: boolean
}

export default class TitleScreen extends Component<Props, State> {
    WallpaperElement = React.createRef<HTMLDivElement>();
    SoundObject = new Audio('./assets/audio/INTRO_MUSIC.mp3');
    IPC = window.require('electron').ipcRenderer;

    constructor(props) {
        super(props);

        this.animateWallpaper = this.animateWallpaper.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.handleSaveDelete = this.handleSaveDelete.bind(this);

        this.SoundObject.volume = 0.1;
        this.SoundObject.play();

        this.state = {
            showSaves: false
        }
    }

    componentDidMount() {
        const isFullscreen = this.IPC.sendSync("retrieve-data", "isFullscreen");
        if(!isFullscreen) this.IPC.sendSync("window-action", "toggleFullscreen");
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
        const errorSound = new Audio('./assets/audio/UI_ERROR.mp3');
        const t = (e.target as HTMLElement);
        let save;
        if (t.nodeName === "LI") {
            switch (t.getAttribute("data-action")) {
                case "devmode":
                    this.props.setEnvironment(Desktop);
                    break;
                case "newgame":
                    this.handleSaveLoad()
                    break;
                case "loadgame":
                    if (!GameSave.saveExists()) {
                        errorSound.play();
                        break;
                    }

                    this.setState({ showSaves: !this.state.showSaves });
                    break;
                break;
            }
        }
    }

    buttonHoverEffect(e: MouseEvent<HTMLUListElement>) {
        const t = (e.target as HTMLElement);
        if (t.nodeName === "LI" && !t.classList.contains("seperator")) {
            const soundEffect = new Audio('./assets/audio/TITLE_BUTTON_HOVER.mp3');
            soundEffect.volume = 0.1;
            soundEffect.play();
        }
    }

    // Handles save loading, loading a save, or creating a new one and loading into the game
    handleSaveLoad(id?) {
        const save = new GameSave(id);
        this.props.setEnvironment(Desktop, save);
    }

    // TODO: <ListSave>'s span id does not update when a save is deleted despite SaveObject ids being updated by save.delete
    // This means that when a single save is deleted no other saves can be deleted until a reload
    handleSaveDelete(id) {
        console.log(id)
        // If the save doesn't exist, it can't be deleted
        if (!GameSave.saveExists(id)) return;
        let save = new GameSave(id);
        save.delete();
        // Handle deleting the save element
        let saveElement = document.getElementById(`save_${id}`);
        saveElement.remove();
        // Check if there are any saves left, if not, close the save load menu
        if (!GameSave.saveExists()) this.setState({ showSaves: false });
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
                        <div style={{ height: this.state.showSaves ? "50%" : "0%", pointerEvents: this.state.showSaves ? "all" : "none"}} className="gamesaves" >
                            <ul className="savelist v-center">
                                {
                                    // There should never be two saves which are not consequtive
                                    GameSave.fetchAll().map((save: GameSave) => {
                                        // I'd prefer for id to be private, but any fetchId function I attempt to make just causes an error as though it doesn't exist upon 
                                        return (<ListSave saveClick={() => this.handleSaveLoad(save.id)} deleteClick={() => this.handleSaveDelete(save.id)} save={save}></ListSave>)
                                    })
                                }
                            </ul>
                            <button onClick={() => this.setState({ showSaves: false })} className="cancel cursor-pointer">Cancel</button>
                        </div>
                        <ul className="start-options" onMouseOver={this.buttonHoverEffect} onClick={this.handleAction}>
                            <this.props.Consumer>
                                {(data: ConfigTypes) => !data.production ? (
                                    <>
                                        <li className="cursor-pointer" data-action="devmode" style={{ color: "red" }}>developer mode</li>
                                        <li className="seperator"></li>
                                    </>
                                ) : ""}
                            </this.props.Consumer>
                            <li className="cursor-pointer" data-action="newgame">new game</li>
                            <li className="seperator"></li>
                            <li className="cursor-pointer" data-action="loadgame">load game</li>
                            <li className="seperator"></li>
                            <li className="cursor-pointer" data-action="credits">credits</li>
                        </ul>
                        <p id="copyright">&copy; 2021 Jacob Wennebro. ALL RIGHTS RESERVED.</p>
                    </div>

                </div>

            </div>
        )
    }
}
