import React, { Component } from 'react'
import Layout from './components/Layout'

export default class index extends Component<{redirect: (url: string) => void}> {
    render() {
        return (
            <Layout redirect={this.props.redirect}>
                <h1>insert profile</h1>
            </Layout>
        )
    }
}
