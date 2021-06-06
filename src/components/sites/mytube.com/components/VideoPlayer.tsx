import React, { Component, createRef, KeyboardEvent, MouseEvent, RefObject, SyntheticEvent } from 'react'
import Image from '../../../ui/Image';
import '../VideoPlayer.scss';

interface Props {
    src?: string
}

interface State {
    isPlaying: boolean;
    currentTime: number;
    percentage: number;
    duration: number;
}

export default class VideoPlayer extends Component<Props, State> {
    Video = createRef() as RefObject<HTMLVideoElement>;
    InsideBar = createRef() as RefObject<HTMLDivElement>;
    OutsideBar = createRef() as RefObject<HTMLDivElement>;
    Player = createRef() as RefObject<HTMLDivElement>;
    
    constructor(props: Props) {
        super(props);

        this.state = {
            isPlaying: false,
            currentTime: 0,
            duration: 0,
            percentage: 0
        }

        this.togglePlayback = this.togglePlayback.bind(this);
        this.TimeUpdateEvent = this.TimeUpdateEvent.bind(this);
        this.MetaDataEvent = this.MetaDataEvent.bind(this);
        this.ClickEvent = this.ClickEvent.bind(this);
        this.ToggleFullscreen = this.ToggleFullscreen.bind(this);
    }

    togglePlayback() {
        const v = this.Video.current;
        v.paused ? v.play() : v.pause();
        this.setState({ isPlaying: !v.paused });
    }

    TimeUpdateEvent(e: SyntheticEvent<HTMLVideoElement>) {
        const v = this.Video.current;
        this.setState({
            currentTime: Math.round(v.currentTime),
            percentage: (v.currentTime / v.duration) * 100
        });
    }

    MetaDataEvent() {
        const v = this.Video.current;
        this.setState({
            duration: Math.round(v.duration),
        });
    }

    ClickEvent(e: MouseEvent<HTMLDivElement>) {
        const skipTo = e.nativeEvent.offsetX / this.OutsideBar.current.offsetWidth;
        this.setState({ percentage: Math.floor(skipTo * 100) });
        this.Video.current.currentTime = skipTo * this.Video.current.duration;
    }

    ToggleFullscreen() {
        if(!document.fullscreenElement) this.Player.current.requestFullscreen();
        else document.exitFullscreen();
    }

    componentDidMount() {
        document.body.onfullscreenchange = () => {
            if(document.fullscreenElement) this.Player.current.classList.add("fullscreen");
            else this.Player.current.classList.remove("fullscreen");
        }
    }

    componentWillUnmount() {
        document.body.onfullscreenchange = null;
    }

    render() {
        return (
            <div id="player" ref={this.Player} className="tube-player">
                <div className="tube-player__wrapper">
                    <div className="tube-player__video">
                    <video
                        onPause={() => this.setState({ isPlaying: false })}
                        onClick={this.togglePlayback}
                        onLoadedMetadata={this.MetaDataEvent}
                        onTimeUpdate={this.TimeUpdateEvent}
                        ref={this.Video}
                        src={this.props.src}
                    />
                    </div>
                    <div className="tube-player__controls">
                        <div onClick={this.togglePlayback} className="tube-player__controls__play cursor-pointer chunk">
                            <Image className="v-center" src={`icons/${this.state.isPlaying ? "pause" : "play"}.png`} />
                        </div>
                        <div className="tube-player__controls__progress chunk">
                            <div className="tube-player__controls__progress__divider">
                                <div ref={this.OutsideBar} onClick={this.ClickEvent} className="progress-bar v-center">
                                    <div ref={this.InsideBar} data-progress={this.state.percentage} style={{ width: `${this.state.percentage}%` }} className="progress-bar__progress" />
                                </div>
                            </div>
                            <div className="tube-player__controls__progress_divider">
                                <p style={{ whiteSpace: "nowrap" }} className="v-center">{`0:0${this.state.currentTime} / 0:${this.state.duration}`}</p>
                            </div>
                        </div>
                        <div className="tube-player__controls__volume cursor-pointer chunk">
                            <Image className="v-center" src="icons/sound.png" />
                        </div>
                        <div onClick={this.ToggleFullscreen} className="tube-player__controls__fullscreen cursor-pointer chunk">
                            <Image className="v-center" src="icons/fullscreen.png" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
