import React, { Component, createRef, RefObject } from 'react'
import { App } from '../../types/ContextData'
import Image from './Image'

interface Props { openApp: (id: string) => void, apps: App[] }

export default class StartMenu extends Component<Props> {
    Startmenu = createRef() as RefObject<HTMLDivElement>;

    toggleVisibility() {
        this.Startmenu.current.style.display = this.Startmenu.current.style.display === "grid" ? "none" : "grid";
    }

    openApp(id: string) {
        document.body.classList.add("progress-state");
        this.toggleVisibility();

        setTimeout(() => {
            this.props.openApp(id);
            document.body.classList.remove("progress-state");
        }, Math.floor(Math.random() * 2000));
    }

    render() {
        ;
        return (
            <div ref={this.Startmenu} style={{ display: "none" }} className="startmenu render-as-pixels" id="startmenu">
                <div className="startmenu__header">
                    <div className="startmenu__header__heading v-center">
                        <Image src="images/avatars/sebastian.png" />
                        <div>
                            <h1 className="v-center">sebastian</h1>
                        </div>
                    </div>
                </div>
                <div className="startmenu__main">
                    <div className="startmenu__main__apps">

                        {this.props.apps.map(app => {
                            if (!app.show) return;

                            return (
                                <div onClick={() => this.openApp(app.id)} className="startmenu__app">
                                    <Image src={`icons/${app.icon}`} />
                                    <div className="startmenu__app__title-container">
                                        <p>{app.title}</p>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className="startmenu__main__native">
                        <div className="startmenu__main__native__wall" />
                        <div className="startmenu__main__native__apps">
                            <div className="startmenu__app">
                                <Image src={`icons/computer.png`} />
                                <div className="startmenu__app__title-container">
                                    <p>My Computer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="startmenu__footer">

                    <div className="startmenu__footer__button v-center">
                        <Image src="icons/logoff-key.png" />
                        <div>
                            <p className="v-center">Log off</p>
                        </div>
                    </div>

                    <div className="startmenu__footer__button v-center">
                        <Image src="icons/shutdown.png" />
                        <div>
                            <p className="v-center">Turn Off Computer</p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
