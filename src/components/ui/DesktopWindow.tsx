import React, { Component } from 'react'
import Draggable from 'react-draggable'

export default function DesktopWindow(props: {children?: any, title?: string}) {
    return (
        <Draggable
        handle=".app-window__bar"
        defaultPosition={{x: 0, y: 0}}
        scale={1}>
            <div className="app-window">
                
                <div className="app-window__bar">
                    <span className="app-window__bar__title text-style-1 v-center">{props.title || "Title"}</span>

                    <div className="app-window__bar__actions v-center-all">
                        <div className="app-window__bar__button hide"></div>
                        <div className="app-window__bar__button minimize"></div>
                        <div className="app-window__bar__button close"></div>
                    </div>
                </div>

                <div className="app-window__view">
                    {props.children}
                </div>


            </div>
        </Draggable>
    )
}
