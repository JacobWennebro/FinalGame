import React, { Component, createRef, MouseEvent, RefObject } from 'react'
import Draggable from 'react-draggable';
import GameSave from '../../../scripts/SaveManager'

interface Props {
    title: string
}

export default class DevApplicationTemplate extends Component<Props> {
    render() {
        return (
            <Draggable handle=".developer-tool .tab">
                <div className="developer-tool">
                    <div className="tab">
                        <p>🔧 {this.props.title}</p>
                    </div>
                    <div className="window">
                        {this.props.children}
                    </div>
                </div>
            </Draggable>
        )
    }
}
