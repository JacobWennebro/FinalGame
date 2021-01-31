import React, { Component } from 'react'
import fs from 'original-fs';
import path from 'path';

export default class Ad extends Component<{nsfw: boolean, production: boolean}> {
    private ads: string[]
    ad: string

    constructor(props) {
        super(props);

        if(this.props.production) {

        } else {
            this.ads = fs.readdirSync("./src/assets/images/" + (this.props.nsfw ? "ads-nsfw" : "ads"));
            console.log(this.ads);
        }

        this.ad = this.ads[Math.floor(Math.random() * this.ads.length)];

    }
    render() {
        return (
            <div className="ad render-as-pixels" style={
                {
                    background:`url(./assets/images/${this.props.nsfw ? "ads-nsfw" : "ads"}/${this.ad}) left center / cover`,
                }
            }>
                
            </div>
        )
    }
}
