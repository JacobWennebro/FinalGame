import React, { MouseEvent } from 'react'
import Taskbar from '../ui/Taskbar'

import DesktopAppIcon from '../ui/DesktopAppIcon';
import DesktopWindow from '../ui/DesktopWindow';
import ContextData from '../../types/ContextData';

function DesktopClickEvent(e: MouseEvent<HTMLDivElement>) {
    const clickSoundEffect = new Audio('./assets/audio/UI_MOUSE_CLICK.mp3');
    clickSoundEffect.volume = 0.1;
    clickSoundEffect.play();
}

export default function Desktop(props: { Consumer: React.Consumer<{}> }) {
    return (
        <props.Consumer>
            {(data: ContextData) => (
                <div onMouseDown={DesktopClickEvent} className="desktop">

                    <div className="desktop__board" id="wallpaper" style={{ background: data.desktop_config.wallpaper as string }}>

                        <div className="desktop__board__window__container">
                            <DesktopWindow title="Reset complete">Hi</DesktopWindow>
                        </div>

                        <div className="desktop__board__apps">
                            {data.desktop_config.apps.map((app:any) => (
                                <DesktopAppIcon title={app.title} icon={app.icon} id={app.id} key={app.id} />
                            ))}
                        </div>
                    </div>

                    <Taskbar />
                </div>
            )}
        </props.Consumer>
    )
}
