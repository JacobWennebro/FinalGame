import React, { Component } from 'react'
import AdsData from '../../data/Ads.json'

export default class Ad extends Component<{nsfw: boolean, banner: boolean, redirect: (url: string) => void}> {
    private ads: string[]
    ad: string

    shouldComponentUpdate() {return false}

    constructor(props) {
        super(props);

        if(process.env.PRODUCTION === "true") {
            console.log("a");
        } else {
            console.log(this.props.nsfw ? `${this.props.banner ? "banner-" : ""}ads-nsfw` : `${this.props.banner ? "banner-" : ""}ads`);
        }

    }

    random(list: any[]) {
        return list[Math.floor(Math.random() * list.length)];
    }

    render() {

        const ad = this.random(AdsData.banner);

        return (
            <div onClick={() => this.props.redirect(ad.url)} data-link={ad.url} className={`ad render-as-pixels ${this.props.banner ? "ad-banner" : ""}`} style={
                {
                    background:`url(./assets/images/${this.props.banner ? `banner-ads/${ad.src}` : "ads"}) left center / cover`,
                }
            }>
                
            </div>
        )
    }
}
