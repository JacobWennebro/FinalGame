import React, { Component } from 'react'
import Ad from '../../webcomponents/Ad';
import './notfound.scss'

export default class index extends Component<{exists: boolean, site: string, production: boolean, redirect: (url: string) => void}> {
    componentDidMount() {
        const errorSound = new Audio('./assets/audio/UI_ERROR.mp3');
        errorSound.volume = 0.1;
        errorSound.play();
    }
    render() {    
        return (
            <div className="webpage notfound">
                <div className="notfound__info">
                    <h2>This site can't be reached...</h2>
                    <p>{this.props.exists ? (<><b>{this.props.site}</b> did not respond with any data.</>) : (<><b>{this.props.site}</b>'s ip address could not be found.</>)}</p>
                    <br/>
                    <span>ERR_NAME_NOT_RESOLVED</span>
                </div>
            </div>
        )
    }
}

