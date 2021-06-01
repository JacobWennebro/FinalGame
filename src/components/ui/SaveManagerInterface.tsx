import React, { Component, createRef, MouseEvent, RefObject } from 'react'
import GameSave from '../../scripts/SaveManager'

interface Props {
    save: GameSave
}

export default class SaveManager extends Component<Props> {
    
    EventsInput = createRef() as RefObject<HTMLInputElement>;

    constructor(props: Props) {
        super(props);

        this.addEvent = this.addEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);

    }

    addEvent() {
        const value = this.EventsInput.current.value;
        if(this.props.save.hasHappened(value)) return console.error("Event has already happened.");
        this.props.save.addEvent(value);
        console.log(`Event "${value}" added to save.`);
        this.EventsInput.current.value = "";
    }

    removeEvent(e: MouseEvent<HTMLParagraphElement>) {
        const value = e.currentTarget.innerText;
        this.props.save.removeEvent(value);
        console.log(`Event "${value}" removed from save.`);
    }

    render() {
        return (
            <div className="developer-save-manager">

                {this.props.save ? (
                    <>
                        <h1>Save manager</h1>

                        <input ref={this.EventsInput} placeholder="Add to events list.."/>
                        <button onClick={this.addEvent}>Add</button>

                        <div className="events">
                            {this.props.save.events.length <= 0 ? (<p>No events have been saved</p>) : ""}
                            {this.props.save.events.map(e => (
                                <p key={e} onClick={this.removeEvent} className="events__item">{e}</p>
                            ))}
                        </div>
                    </>
                ) : (
                    <h1>no save found.</h1>
                )}

            </div>
        )
    }
}
