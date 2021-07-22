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
        height?: string,
        width?: string,
        fullscreen: boolean,
        Consumer: Consumer<{}>
        time: number
    }) {

    const windowRef = useRef<HTMLDivElement>();
    const IPC = window.require('electron').ipcRenderer;

    function toggleZIndex(title: string) {

        // Send Discord RPC update
        IPC.sendSync("drpc", {
            largeImageKey: 'monkey',
            smallImageKey: title.toLowerCase(),
            smallImageText: `Using ${title}`,
        });

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
        onStart={() => toggleZIndex(props.title)}
        bounds="parent"
        >
            <div ref={windowRef} className="app-window" window-title={props.title} style={{
                visibility: props.visibility ? "visible" : "hidden",
                zIndex: props.visibility ? 4 : 0,
                maxWidth: props.maxWidth || "auto",
                maxHeight: props.maxHeight || "auto",
                minWidth: props.minWidth || "auto",
                minHeight: props.minHeight || "auto",
                width: props.width || "auto",
                height: props.height || "auto"
            }}>
                
                <div className="app-window__bar">
                    <div className="app-window__bar-inner v-center">
                        {props.icon ? (<Image className="app-window__bar__icon v-center" src={"icons/" + props.icon}/>) : (null)}
                        
                        <div className="app-window__bar__title">
                            <span className="text-style-1 v-center">{props.title || "Title"}</span>
                        </div>

                        <div className="app-window__bar__actions v-center-all">
                            <div onClick={props.hide} className="app-window__bar__button hide c-item"><span>&#8722;</span></div>
                            {props.fullscreen ? (
                                <>
                                    <div onClick={() => windowRef.current.classList.add("fullscreen")} className="app-window__bar__button minimize c-item"><span>&#9723;</span></div>
                                </>
                            ) : ""}
                            <div onClick={props.close} className="app-window__bar__button close c-item"><span>&#10799;</span></div>
                        </div>
                    </div>
                </div>

                <div className="app-window__view">
                    {props.content}
                </div>

            </div>
        </Draggable>
    ) : <React.Fragment/>;
}
