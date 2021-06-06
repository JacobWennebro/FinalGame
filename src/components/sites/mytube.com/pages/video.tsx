import React, { Component } from 'react'
import Plyr from 'plyr-react'
import 'plyr-react/dist/plyr.css'
import Layout from '../../mytube.com/components/Layout'
import VideoPlayer from '../components/VideoPlayer'

export default class video extends Component<{ redirect: (url: string) => void }> {
    shouldComponentUpdate() {return false}

    render() {
        return (
            <Layout redirect={this.props.redirect}>
                <div className="video">
                    <h1 className="video__title">Video Title</h1>
                    <div className="video__seperator">
                        <div className="main">
                            <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4"/>
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
