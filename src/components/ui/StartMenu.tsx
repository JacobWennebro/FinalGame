import React, { Component } from 'react'
import { App } from '../../types/ContextData'
import Image from './Image'

export default class StartMenu extends Component<{ openApp: (id: string) => void, apps: App[], hide: () => void }> {
    render() {
        return (
            <div onClick={this.props.hide} className="startmenu render-as-pixels">
                <div className="startmenu__header">
                    <div className="startmenu__header__heading v-center">
                        <Image src="images/avatars/sebastian.png"/>
                        <div>
                            <h1 className="v-center">sebastian</h1>
                        </div>
                    </div>
                </div>
                <div className="startmenu__main">
                    <div className="startmenu__main__apps">

                        {this.props.apps.map(app => {
                            if(!app.show) return;

                            return (
                                <div onClick={() => this.props.openApp(app.id)} className="startmenu__app">
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



                    </div>
                </div>
                <div className="startmenu__footer">

                        <div className="startmenu__footer__button v-center">
                            <Image src="icons/logoff-key.png"/>
                            <div>
                                <p className="v-center">Log off</p>
                            </div>
                        </div>

                        <div className="startmenu__footer__button v-center">
                            <Image src="icons/shutdown.png"/>
                            <div>
                                <p className="v-center">Turn Off Computer</p>
                            </div>
                        </div>
                        
                </div>
            </div>
        )
    }
}
