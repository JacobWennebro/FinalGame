import React, { Component } from 'react'
import AdsData from '../../data/Ads.json'

export default class Ad extends Component<{ nsfw: boolean, banner: boolean, redirect: (url: string) => void }, { ad: any }> {

    constructor(props) {
        super(props);

        this.state = {
            ad: null
        }

    }

    random(list: any[]) {
        return list[Math.floor(Math.random() * list.length)];
    }

    componentDidMount() {
        this.setState({
            ad: this.random(AdsData.banner)
        });
    }

    render() {
        return this.state.ad ? (
            <div onClick={() => this.props.redirect(this.state.ad.url)} data-link={this.state.ad.url} className={`ad render-as-pixels ${this.props.banner ? "ad-banner" : ""}`} style={
                {
                    background: `url(./assets/images/${this.props.banner ? `banner-ads/${this.state.ad.src}` : "ads"}) left center / cover`,
                }
            }>

            </div>
        ) : ""
    }
}
