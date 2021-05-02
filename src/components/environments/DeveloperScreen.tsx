import React, { Component, LegacyRef, RefObject } from 'react'
import Image from '../ui/Image'

export default class DeveloperScreen extends Component<{setEnvironment: (env: any) => void, production: boolean, Consumer: React.Consumer<{}>}> {
    SoundObject = new Audio('./assets/audio/INTRO_SOUND.wav');

    constructor(props) {
        super(props);

        this.SoundObject.volume = 0.1;
        this.SoundObject.play();
    }

    componentWillUnmount() {
        this.SoundObject.pause();
        this.SoundObject = null;
    }

    componentDidMount() {
        setTimeout(() => {
            document.getElementById("developerScreenLogo").classList.add("fadeOut");
        }, 1000);
    }

    render() {
        return (
            <div className="developer-screen">
                <Image id="developerScreenLogo" className="logo v-center render-as-pixels" src="images/screen-logo.png"/>
            </div>
        )
    }
}
