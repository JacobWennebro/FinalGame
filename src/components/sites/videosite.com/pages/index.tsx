import React, { Component } from 'react'
import Layout from '../components/Layout'
import Video from '../components/Video'

export default class index extends Component<{redirect: (url: string) => void}> {
    render() {
        return (
            <Layout redirect={this.props.redirect}>
                <Video/>
            </Layout>
        )
    }
}
