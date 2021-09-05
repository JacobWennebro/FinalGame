import React, { Component, createRef, LegacyRef, MouseEvent, RefObject } from 'react'
import Draggable from 'react-draggable';
import GameSave from '../../../scripts/SaveManager'
import DevApplicationTemplate from './DevApplicationTemplate';

interface Props {
    save: GameSave
    openApp: (id: string) => void;
}

export default class ForceAppInterface extends Component<Props> {

    Input: RefObject<HTMLInputElement> = createRef()

    render() {
        return (
            <DevApplicationTemplate title="Force App">
                <p>Enter app id:</p>
                <input ref={this.Input} placeholder="app.browser"/>
                <button onClick={() => this.props.openApp(this.Input.current.value)}>open</button>
            </DevApplicationTemplate>
        )
    }
}
