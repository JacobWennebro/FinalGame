import React, { ChangeEvent, Component, createRef, LegacyRef, MouseEvent, RefObject } from 'react'
import Draggable from 'react-draggable';
import GameSave from '../../../scripts/SaveManager'
import DevApplicationTemplate from './DevApplicationTemplate';

interface Props {
    save: GameSave
    openApp: (id: string) => void;
    apps: string[]
}

export default class ForceAppInterface extends Component<Props> {

    constructor(props) {
        super(props);

        this.apply = this.apply.bind(this);
    }

    apply(e: ChangeEvent<HTMLSelectElement>) {
        this.props.openApp(e.currentTarget.value);
    }

    render() {
        return (
            <DevApplicationTemplate title="Force App">
                <p>Select app to open:</p>
                
                <select onChange={this.apply}>
                    {this.props.apps.map(app => (
                        <option value={app} key={app}>{app.split(".")[1].toUpperCase()}</option>
                    ))}
                </select>

            </DevApplicationTemplate>
        )
    }
}
