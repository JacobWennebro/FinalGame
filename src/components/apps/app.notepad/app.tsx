import React, { ChangeEvent, Component, RefObject } from 'react'

/* Store notepad data temporarily in memory */
let notepadData = "";

export default class app extends Component {
    TextArea = React.createRef() as RefObject<HTMLTextAreaElement>;

    constructor(props) {
        super(props);

        this.handleNotepad = this.handleNotepad.bind(this);
    }

    handleNotepad(e: ChangeEvent) {
        notepadData = this.TextArea.current.value;
    }

    render() {
        return (
            <div className="app" id="notepad">
                <textarea defaultValue={notepadData} ref={this.TextArea} onChange={this.handleNotepad}>
    
                </textarea>
            </div>
        )
    }
}
