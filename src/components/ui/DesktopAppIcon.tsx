import React from 'react'

export default function DesktopAppIcon(props: { title?: String, icon?: String, id?: String }) {
    return (
        <div className="desktop-app" app-id={props.id}>
            <div tabIndex={0} className="desktop-app__inner render-as-pixels">
                <div className="desktop-app__icon" style={{backgroundImage:`url("./assets/icons/${props.icon}")`, backgroundSize: "cover"}}></div>
                <span className="desktop-app__title text-style-1">{props.title || "Unnamed application"}</span>
            </div>
        </div>
    )
}
