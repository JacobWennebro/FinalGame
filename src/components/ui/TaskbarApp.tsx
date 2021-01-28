import React from 'react'

export default function TaskbarApp(props: {icon?: string, title?: string, toggleVisibility: () => void}) {
    return (
        <div onClick={props.toggleVisibility} className="taskbar__app v-center-all">
            <img className="taskbar__app__icon" src={"../../assets/icons/" + props.icon}/>
            <p className="taskbar__app__title">{props.title}</p>
        </div>
    )
}
