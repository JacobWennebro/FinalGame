import React, { Component, createRef, MouseEvent, RefObject } from 'react'
import Draggable from 'react-draggable';
import GameSave from '../../scripts/SaveManager'

interface Props {
    save: GameSave
}

export default class SaveManager extends Component<Props> {

    EventsInput = createRef() as RefObject<HTMLInputElement>;
    Constants = createRef() as RefObject<HTMLDivElement>;


    constructor(props: Props) {
        super(props);

        this.addEvent = this.addEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.updateConstants = this.updateConstants.bind(this);
    }

    addEvent() {
        const value = this.EventsInput.current.value;
        if (this.props.save.hasHappened(value)) return console.error("Event has already happened.");
        this.props.save.addEvent(value);
        console.log(`Event "${value}" added to save.`);
        this.EventsInput.current.value = "";
    }

    removeEvent(e: MouseEvent<HTMLParagraphElement>) {
        const value = e.currentTarget.innerText;
        this.props.save.removeEvent(value);
        console.log(`Event "${value}" removed from save.`);
    }

    updateConstants() {
        const instances = Array.from(this.Constants.current.querySelectorAll("p.constants__editable")) as HTMLParagraphElement[];
        for (const i of instances) {
            const name = i.innerText;
            const value = i.querySelector("input").value;

            this.props.save.setConstant(name, value);
            console.log("Updated constant value for " + name + " to " + value);
        }
    }

    render() {
        return (
            <Draggable handle=".developer-save-manager .tab">
                <div className="developer-save-manager">
                    <div className="tab">
                        <p>Save manager - Developer Tool</p>
                    </div>
                    <div className="window">
                        {this.props.save ? (
                            <>
                                <div className="chunk">
                                    <h3>Events</h3>
                                    <input ref={this.EventsInput} placeholder="Add to events list.." />
                                    <button onClick={this.addEvent}>Add</button>

                                    <div className="events">
                                        {this.props.save.events.length <= 0 ? (<p>No events have been saved</p>) : ""}
                                        {this.props.save.events.map(e => (
                                            <p key={e} onClick={this.removeEvent} className="events__removable">{e}</p>
                                        ))}
                                    </div>
                                </div>

                                <div className="chunk">
                                    <h3>Constants</h3>

                                    <div className="constants" ref={this.Constants}>
                                        {Object.keys(this.props.save.constants).length <= 0 ? (<p>No events have been saved</p>) : ""}
                                        {Object.keys(this.props.save.constants).map(e => (
                                            <p key={e} className="constants__editable">{e}<input defaultValue={this.props.save.constants[e]} /></p>
                                        ))}
                                        <button onClick={this.updateConstants}>Update constants</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <h1>no save found.</h1>
                        )}
                    </div>
                </div>
            </Draggable>
        )
    }
}
