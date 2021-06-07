import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import VideoPlayer from './components/sites/mytube.com/components/VideoPlayer';
import './styles/main.scss';

export default class Sandbox extends Component {
    render() {
        return (
            <div style={{padding:"1rem"}}>

                <VideoPlayer src="happy-birthday.mp4"/>

            </div>
        )
    }
}

ReactDOM.render((
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "#fff" }}>
        <h1 style={{ color: "blue" }}>Sandbox</h1>
        <hr />
        <Sandbox/>
    </div>
), document.getElementById("view"))