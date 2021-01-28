import React, { Component } from 'react'
import Draggable from 'react-draggable'

export default function DesktopWindow(props: {children?: any, title?: string, content?: any, id: string, active: boolean, icon?: string, close: () => void, hide: () => void, visibility: boolean}) {
    return props.active ? (
        <Draggable
        handle=".app-window__bar"
        defaultPosition={{x: 0, y: 0}}
        scale={1}>
            <div className="app-window" style={{visibility: props.visibility ? "visible" : "hidden"}}>
                
                <div className="app-window__bar">
                    <img className="app-window__bar__icon v-center" src={"../../assets/icons/" + props.icon}/>
                    <span className="app-window__bar__title text-style-1 v-center">{props.title || "Title"}</span>

                    <div className="app-window__bar__actions v-center-all">
                        <div onClick={props.hide} className="app-window__bar__button hide"></div>
                        <div className="app-window__bar__button minimize"></div>
                        <div onClick={props.close} className="app-window__bar__button close"></div>
                    </div>
                </div>

                <div className="app-window__view">
                    {props.content}
                </div>

            </div>
        </Draggable>
    ) : <React.Fragment/>;
}
