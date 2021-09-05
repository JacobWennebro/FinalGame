import React, { ChangeEvent, Component, createRef, KeyboardEvent, RefObject } from 'react'
import DevApplicationTemplate from './DevApplicationTemplate'
import fs from 'original-fs'

export default class MusicDebugInterface extends Component<{}, {active: boolean, track: string}> {

    Audio: RefObject<HTMLAudioElement> = createRef();

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            track: null
        }

        this.handleAudio = this.handleAudio.bind(this);
        this.keydown = this.keydown.bind(this);
    }

    handleAudio(e: ChangeEvent<HTMLInputElement>) {
        // @ts-ignore
        const track_path = e.currentTarget.files[0].path;
        const buffer  = fs.readFileSync(track_path);
        const arrayBuffer = new Uint8Array(buffer);

        const blob = new Blob([arrayBuffer]);
        const objectURL = URL.createObjectURL(blob);

        this.setState({active: true, track: objectURL });
    }

    keydown(e: KeyboardEvent<HTMLBodyElement>) {
        if(e.ctrlKey) {
            switch(e.key.toLowerCase()) {
                case "1":
                    this.Audio.current.play();
                break;
                case "2":
                    this.Audio.current.pause();
                break;
                case "3":
                    this.Audio.current.currentTime = 0;
                break;
            }
        }
    }

    // @ts-ignore
    componentDidMount() { document.body.addEventListener("keydown", this.keydown); }
    // @ts-ignore
    componentWillUnmount() { document.body.removeEventListener("keydown", this.keydown); };

    render() {
        return (
            <DevApplicationTemplate title="Music Debugger">
                { /* @ts-ignore */ }
                <input onChange={this.handleAudio} type="file" accept="audio/*"/>
                <audio ref={this.Audio} controls={true} src={this.state.track}/>
                {this.state.active ? (
                    <code>
                        Play (Ctrl+1)<br/>
                        Pause (Ctrl+2)<br/>
                        Reset (Ctrl+3)
                    </code>
                ) : ""}
            </DevApplicationTemplate>
        )
    }
}
