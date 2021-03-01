import React, { Component } from 'react'
import fs from 'original-fs';

export default class Ad extends Component<{nsfw: boolean, banner: boolean}> {
    private ads: string[]
    ad: string

    constructor(props) {
        super(props);

        if(process.env.PRODUCTION === "true") {
            console.log("a");
        } else {
            console.log(this.props.nsfw ? `${this.props.banner ? "banner-" : ""}ads-nsfw` : `${this.props.banner ? "banner-" : ""}ads`);

            this.ads = fs.readdirSync("./src/assets/images/" + (this.props.nsfw ? `${this.props.banner ? "banner-" : ""}ads-nsfw` : `${this.props.banner ? "banner-" : ""}ads`));
            console.log(this.ads);
        }

        this.ad = this.ads[Math.floor(Math.random() * this.ads.length)];

    }
    render() {
        return (
            <div className="ad render-as-pixels" style={
                {
                    background:`url(./assets/images/${this.props.nsfw ? `${this.props.banner ? "banner-" : ""}ads-nsfw` : `${this.props.banner ? "banner-" : ""}ads`}/${this.ad}) left center / cover`,
                }
            }>
                
            </div>
        )
    }
}
