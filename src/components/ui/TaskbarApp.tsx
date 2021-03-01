import React from 'react'
import Image from './Image'

export default function TaskbarApp(props: {icon?: string, title?: string, toggleVisibility: () => void}) {
    return (
        <div onClick={props.toggleVisibility} className="taskbar__app v-center-all">
            <Image className="taskbar__app__icon" src={"icons/" + props.icon}/>
            <p className="taskbar__app__title">{props.title}</p>
        </div>
    )
}
