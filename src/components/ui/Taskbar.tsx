import React from 'react'
import FormatTime from '../../scripts/FormatTime';
import { App } from '../../types/ContextData';
import TaskbarApp from './TaskbarApp'

export default function Taskbar(props: { active_apps: any, apps: App[], toggleVisibility: (id: string) => void, time: number }) {
    return (
        <div className="taskbar">
            <button className="taskbar__start__button text-style-1">Start</button>
            
            <div className="taskbar__activity">
                {Object.keys(props.active_apps).map(id => {
                    const app = props.active_apps[id];
                    const appmeta = props.apps.filter(app => app.id === id)[0];

                    return app.active ? <TaskbarApp key={id} toggleVisibility={() => props.toggleVisibility(id)} title={appmeta.title} icon={appmeta.icon}/> : <React.Fragment/>;
                })}
            </div>

            <div className="taskbar__time">
                <span className="v-center">{FormatTime(props.time)}</span>
            </div>
        </div>
    )
}
