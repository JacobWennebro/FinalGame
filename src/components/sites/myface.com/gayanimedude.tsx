import React, { Component } from 'react'
import Layout from './components/Layout'
import Profile from './components/Profile'

export default class gayanimedude extends Component<{redirect: (url: string) => void }> {
    render() {
        return (
            <Layout redirect={this.props.redirect}>
                <Profile avatar="debitcardz.png" username="gayanimedude" name="Tech Rodgers" gender="male" age={15} town="Somewhere" state="New York" country="United States"/>
            </Layout>
        )
    }
}
