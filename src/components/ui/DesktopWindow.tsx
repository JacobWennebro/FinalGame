import React, { Component, Consumer, useRef } from 'react'
import Draggable from 'react-draggable'
import Image from './Image';

export default function DesktopWindow(props: {
        children?: any,
        title?: string,
        content?: any,
        active: boolean,
        icon?: string,
        close: () => void,
        hide: () => void,
        visibility: boolean, 
        x?: number, 
        y?: number, 
        maxWidth?: string,
        minWidth?: string,
        maxHeight?: string,
        minHeight?: string,
        buttons: boolean,
        Consumer: Consumer<{}>
        time: number
    }) {

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
            <div ref={windowRef} className="app-window" window-title={props.title} style={{
                visibility: props.visibility ? "visible" : "hidden",
                maxWidth: props.maxWidth || "100%",
                maxHeight: props.maxHeight || "100%",
                minWidth: props.minWidth || "50vw",
                minHeight: props.maxHeight || "50vh"
            }}>
                
                <div className="app-window__bar">
                    {props.icon ? (<Image className="app-window__bar__icon v-center" src={"icons/" + props.icon}/>) : (null)}
                    <span className="app-window__bar__title text-style-1 v-center">{props.title || "Title"}</span>

                    <div className="app-window__bar__actions v-center-all">
                        {props.buttons ? (
                            <>
                                <div onClick={props.hide} className="app-window__bar__button hide c-item"><span>&#8722;</span></div>
                                <div onClick={() => windowRef.current.classList.add("fullscreen")} className="app-window__bar__button minimize c-item"><span>&#9723;</span></div>
                            </>
                        ) : ""}
                    
                        <div onClick={props.close} className="app-window__bar__button close c-item"><span>&#10799;</span></div>
                    </div>
                </div>

                <div className="app-window__view">
                    {props.content}
                </div>

            </div>
        </Draggable>
    ) : <React.Fragment/>;
}
