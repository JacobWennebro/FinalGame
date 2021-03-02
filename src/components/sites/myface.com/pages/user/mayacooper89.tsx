import React, { Component } from 'react'
import Layout from '../../components/Layout'
import Profile from '../../components/Profile'

export default class gayanimedude extends Component<{redirect: (url: string) => void }> {
    render() {
        return (
            <Layout redirect={this.props.redirect}>
                <Profile 
                    avatar="maya.png" 
                    username="mayacooper89" 
                    name="Maya Cooper" 
                    gender="female" 
                    age={17} 
                    town="Somewhere"
                    state="New York"
                    country="United States"
                    biography="Hey"
                    >
                    <h1>hello</h1>
                </Profile>
            </Layout>
        )
    }
}
