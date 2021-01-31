import React, { Component } from 'react'
import Layout from './components/Layout'
import Profile from './components/Profile'

export default class jordan extends Component<{redirect: (url: string) => void}> {
    render() {
        return (
            <Layout redirect={this.props.redirect}>
                <Profile gender="male" age={12} town="Santa Monica" state="California" country="United States"/>
            </Layout>
        )
    }
}
