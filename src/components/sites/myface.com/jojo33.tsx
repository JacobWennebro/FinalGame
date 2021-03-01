import React, { Component } from 'react'
import Layout from './components/Layout'
import Profile from './components/Profile'

export default class jordan extends Component<{redirect: (url: string) => void}> {
    render() {
        return (
            <Layout redirect={this.props.redirect}>
                <Profile avatar="female.png" username="jojo33" name="Jordan Simpson" gender="male" age={21} town="Santa Monica" state="California" country="United States"/>
            </Layout>
        )
    }
}
