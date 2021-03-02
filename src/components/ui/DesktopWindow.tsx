import React, { Component, Consumer, useRef } from 'react'
import Draggable from 'react-draggable'
import Image from './Image';


export default function DesktopWindow(props: {children?: any, title?: string, content?: any, active: boolean, icon?: string, close: () => void, hide: () => void, visibility: boolean, x?: number, y?: number, Consumer: Consumer<{}>}) {

    const windowRef = useRef<HTMLDivElement>();

    function toggleZIndex() {
        const allAppWindows = document.getElementsByClassName("app-window");
        for(let i=0; i < allAppWindows.length; i++) {
            const w = allAppWindows[i] as HTMLDivElement;
            w.style.zIndex = String(i);
        }

        windowRef.current.style.zIndex = String(allAppWindows.length+1);
    }

    return props.active ? (
        <Draggable
        handle=".app-window__bar"
        defaultPosition={{x: props.x || 200, y: props.y || 200}}
        scale={1}
        onStart={() => toggleZIndex()}
        bounds="parent"
        >
            <div ref={windowRef} className="app-window" window-title={props.title} style={{visibility: props.visibility ? "visible" : "hidden"}}>
                
                <div className="app-window__bar">
                    {props.icon ? (<Image className="app-window__bar__icon v-center" src={"icons/" + props.icon}/>) : (null)}
                    <span className="app-window__bar__title text-style-1 v-center">{props.title || "Title"}</span>

                    <div className="app-window__bar__actions v-center-all">
                        <div onClick={props.hide} className="app-window__bar__button hide c-item"></div>
                        <div onClick={() => windowRef.current.classList.add("fullscreen")} className="app-window__bar__button minimize c-item"></div>
                        <div onClick={props.close} className="app-window__bar__button close c-item"></div>
                    </div>
                </div>

                <div className="app-window__view">
                    {props.content}
                </div>

            </div>
        </Draggable>
    ) : <React.Fragment/>;
}
