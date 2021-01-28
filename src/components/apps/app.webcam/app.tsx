import React, { Component, LegacyRef, Ref } from 'react'
import Webcam from 'react-webcam'

interface state {
    devices: any[]
}

export default class app extends Component<{}, state> {
    video: React.RefObject<Webcam>
    canvas: React.RefObject<HTMLCanvasElement>
    canvasFps: NodeJS.Timeout;

    constructor(props) {
        super(props);

        this.video = React.createRef();
        this.canvas = React.createRef();

        this.updateWebcam = this.updateWebcam.bind(this);
    }

    componentDidMount() {
        this.canvasFps = setInterval(this.updateWebcam, 250);
    }

    componentWillUnmount() {
        clearInterval(this.canvasFps);
    }

    updateWebcam(){
        const canvas = this.canvas.current;
        const video = this.video.current.video;
        const ctx = canvas.getContext('2d');
        
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(video,0,0, 300,200);   
    }

    render() {
        return (
            <div className="app" id="webcam">
                <Webcam ref={this.video} audio={false} videoConstraints={{ deviceId: "default" }} />
                <canvas ref={this.canvas} className="webcam-canvas">

                </canvas>
                <div className="webcam-button-overlay">
                    <div className="webcam-button-overlay__button"></div>
                    <div className="webcam-button-overlay__button"></div>
                    <div className="webcam-button-overlay__button"></div>
                </div>
            </div>
        )
    }
}
