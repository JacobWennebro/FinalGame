import React, { Component } from 'react'
import Users from '../../../../data/MyFaceUsers.json'
import Layout from '../components/Layout';
import Profile from '../components/Profile';
import NotFound from '../../notfound/pages';

export default class user extends Component<{path: string, redirect: (url: string) => void, exists: boolean, site: string, production: boolean, time: number}, {username: string}> {
    render() {
        const user = Users.find(u => u.username === this.props.path.split("/")[1]);
        if(user) {
            return (
                <Layout redirect={this.props.redirect}>
                    <Profile
                        avatar={user.avatar}
                        username={user.username}
                        name={user.name}
                        gender={user.gender}
                        age={user.age}
                        town={user.town}
                        state={user.state}
                        country={user.country}
                        biography={user.biography}
                        online={this.props.time > 500}
                        redirect={this.props.redirect}
                        >
                            <p>oi</p>
                        </Profile>
                </Layout>
            )
        } else return (<NotFound production={this.props.production} exists={this.props.exists} site={this.props.site} redirect={this.props.redirect}/>)
    }
}
