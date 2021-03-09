import React, { Component } from 'react'
import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'
import Layout from '../../videosite.com/components/Layout'

export default class video extends Component<{ redirect: (url: string) => void }> {
    shouldComponentUpdate() {return false}

    render() {
        return (
            <Layout redirect={this.props.redirect}>
                <div className="video">
                    <h1 className="video__title">Video Title</h1>
                    <div className="video__seperator">
                        <div className="main">
                            <Plyr options={{
                                controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume'],
                                fullscreen: { enabled: false },
                                autoplay: true
                            }} source={{
                                type: 'video',
                                title: '',
                                sources: [
                                    {
                                        src: "./assets/videos/tube/example.mp4",
                                        type: 'video/mp4',
                                    }]
                            }}
                            ></Plyr>
                        </div>
                        <div className="related">
                            <div className="video__about">
                                <h3>About This Video</h3>
                                <div className="video__about__content">
                                    <p>about text blablabla</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}
