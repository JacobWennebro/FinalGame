import React, { Component, LegacyRef, MouseEvent } from 'react'
import Draggable from 'react-draggable'

import Dialouge from '../../data/MonkeyDialouge.json'

interface state {
    asset: string
    nativeHeight: number
    nativeWidth: number
    dialouge: string
}

export default class HelpMonkey extends Component<{}, state> {
    Monkey: LegacyRef<HTMLDivElement>

    constructor(props) {
        super(props);

        this.Monkey = React.createRef();
        this.TriggerDialouge = this.TriggerDialouge.bind(this);

        this.state = {
            asset: "monkey\\ peak.png",
            nativeWidth: 32,
            nativeHeight: 32,
            dialouge: null
        }

    }

    TriggerDialouge() {
        const randomLine = Dialouge[Math.floor(Math.random() * Dialouge.length)];
        this.setState({dialouge: randomLine});

        setTimeout(() => {
            this.setState({dialouge: null});
        }, 3000)

    }

    render() {
        return (
            <Draggable
                handle=".help-monkey"
                defaultPosition={{ x: 0, y: 0 }}
                scale={1}
                onDrag={() => this.setState({ asset: "monkey\\ hover.png", nativeWidth: 32, nativeHeight: 64 })}
                onStop={() => this.setState({ asset: "monkey.png", nativeWidth: 32, nativeHeight: 64 })}
            >
            <div onClick={this.TriggerDialouge} ref={this.Monkey} className="help-monkey render-as-pixels"
                style={{
                    background: `url(./assets/images/${this.state.asset}) left center / cover`,
                    width: this.state.nativeWidth * 3,
                    height: this.state.nativeHeight * 3,
                }}>
                    <span className="help-monkey__bubble">
                        {this.state.dialouge}
                    </span>
            </div>

        </Draggable>
        )
    }
}
