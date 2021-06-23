import React, { Component } from 'react'
import Image from '../../../ui/Image'
import Snapshot from 'video-snapshot'
import path from 'path'
import fs from 'original-fs'
import { ReadStream } from 'fs';
import streamToBlob from 'stream-to-blob'

interface Props {
    title: string
    file: string
    author: string
    id: string
    redirect: (url: string) => void;
}

interface State {
    thumbnail: string;
}

export default class RelatedVideo extends Component<Props, State> {
    private rs = fs.createReadStream(path.join(__dirname, `../../../../../../src/assets/videos/tube/${this.props.file}`)) as ReadStream;

    constructor(props: Props) {
        super(props);

        this.state = {
            thumbnail: null
        }

    }

    async componentDidMount() {
        const blob = await streamToBlob(this.rs);
        const thumbnail = await (new Snapshot(blob)).takeSnapshot();

        this.setState({
            thumbnail
        });
    }

    render() {
        return (
            <div className="related-video hoverable" data-link={`mytube.com/video/${this.props.id}`} onClick={() => this.props.redirect ? this.props.redirect(`mytube.com/video/${this.props.id}`) : ""}>
                <div className="related-video__thumbnail">
                    <img src={this.state.thumbnail}/>
                </div>
                <div className="related-video__info">
                    <h4 className="link">{this.props.title}</h4>
                    <p>From <span style={{textDecoration:"underline"}}>{this.props.author}</span></p>
                </div>
            </div>
        )
    }
}
