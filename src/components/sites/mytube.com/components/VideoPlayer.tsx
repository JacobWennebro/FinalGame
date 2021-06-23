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
    bufferWidth: number;
    muted: boolean;
}

export default class VideoPlayer extends Component<Props, State> {
    Video = createRef() as RefObject<HTMLVideoElement>;
    InsideBar = createRef() as RefObject<HTMLDivElement>;
    OutsideBar = createRef() as RefObject<HTMLDivElement>;
    Buffer = createRef() as RefObject<HTMLDivElement>;
    Player = createRef() as RefObject<HTMLDivElement>;
    BufferInterval = null;
    
    constructor(props: Props) {
        super(props);

        this.state = {
            isPlaying: false,
            currentTime: 0,
            duration: 0,
            percentage: 0,
            bufferWidth: 0,
            muted: false
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
            percentage: (v.currentTime / v.duration) * 100,
        });
    }

    MetaDataEvent() {
        const v = this.Video.current;

        if(v.currentTime == 0 && this.InsideBar.current.style.width) {
            this.setState({
                percentage: 0,
                bufferWidth: 0,
                duration: Math.round(v.duration),
                isPlaying: false,
                currentTime: 0
            });

            this.Buffer.current.style.width = "0%";
        }

        else this.setState({
            duration: Math.round(v.duration),
        });
    }

    ClickEvent(e: MouseEvent<HTMLDivElement>) {
        const skipTo = e.nativeEvent.offsetX / this.OutsideBar.current.offsetWidth;

        if((skipTo*100) > this.state.bufferWidth) {
            this.setState({
                bufferWidth: (skipTo+0.05) * 100
            });
        }

        this.setState({ percentage: Math.floor(skipTo * 100) });
        this.Video.current.currentTime = skipTo * this.Video.current.duration;
    }

    ToggleFullscreen() {
        if(!document.fullscreenElement) this.Player.current.requestFullscreen();
        else document.exitFullscreen();
    }

    componentDidMount() {
        const b = this.Buffer.current

        this.BufferInterval = setInterval(() => {
            if(!this.Video.current.paused) {
                this.setState({ bufferWidth: Math.round(Math.random()*10) + this.state.bufferWidth });

                if(this.state.bufferWidth >= 100) {
                    b.style.width = "100%";
                    clearInterval(this.BufferInterval);
                    return;
                }

                b.style.width = this.state.bufferWidth+"%";
            }
        }, 500);

        document.body.onfullscreenchange = () => {
            if(document.fullscreenElement) this.Player.current.classList.add("fullscreen");
            else this.Player.current.classList.remove("fullscreen");
        }
    }

    componentWillUnmount() {
        if(this.BufferInterval) clearInterval(this.BufferInterval);
        document.body.onfullscreenchange = null;
    }

    fancyTimeFormat(duration) {   
        // Hours, minutes and seconds
        const hrs = ~~(duration / 3600);
        const mins = ~~((duration % 3600) / 60);
        const secs = ~~duration % 60;
    
        // Output like "1:01" or "4:03:59" or "123:03:59"
        let ret = "";
    
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
    
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
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
                        src={`assets/videos/tube/${this.props.src}`}
                        muted={this.state.muted}
                    />
                    </div>
                    <div className="tube-player__controls">
                        <div onClick={this.togglePlayback} className="tube-player__controls__play cursor-pointer chunk">
                            <Image className="v-center" src={`icons/${this.state.isPlaying ? "pause" : "play"}.png`} />
                        </div>
                        <div className="tube-player__controls__progress chunk">
                            <div className="tube-player__controls__progress__divider">
                                <div ref={this.OutsideBar} onClick={this.ClickEvent} className="progress-bar v-center">
                                    <div ref={this.Buffer} className="progress-bar__buffer"/>
                                    <div ref={this.InsideBar} style={{ width: `${this.state.percentage}%` }} className="progress-bar__progress"/>
                                </div>
                            </div>
                            <div className="tube-player__controls__progress_divider">
                                <p style={{ whiteSpace: "nowrap" }} className="v-center">{`${this.fancyTimeFormat(this.state.currentTime)} / ${this.fancyTimeFormat(this.state.duration)}`}</p>
                            </div>
                        </div>
                        <div onClick={() => this.setState({ muted: !this.state.muted })} className="tube-player__controls__volume cursor-pointer chunk">
                            <Image className="v-center" src={`icons/${this.state.muted ? "no-sound" : "sound"}.png`} />
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
