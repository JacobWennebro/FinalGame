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
        }

    }
    render() {
        return (
            <div className={`ad render-as-pixels ${this.props.banner ? "ad-banner" : ""}`} style={
                {
                    background:`url(./assets/images/${this.props.nsfw ? `${this.props.banner ? "banner-" : ""}ads-nsfw` : `${this.props.banner ? "banner-" : ""}ads`}/${"casino-1.gif"}) left center / cover`,
                }
            }>
                
            </div>
        )
    }
}
