import React, { Component } from 'react'
import Users from '../../../../data/Profiles.json'
import Layout from '../components/Layout';
import Profile from '../components/Profile';
import NotFound from '../../notfound/pages';

export default class user extends Component<{path: string, redirect: (url: string) => void, exists: boolean, site: string, production: boolean, time: number}, {username: string}> {
    render() {
        const user = Users.find(u => u.myface.username === this.props.path.split("/")[1]);
        if(user) {
            return (
                <Layout redirect={this.props.redirect}>
                    <Profile
                        avatar={user.myface.avatar}
                        username={user.myface.username}
                        name={user.name}
                        gender={user.gender}
                        age={user.age}
                        town={user.myface.town}
                        state={user.myface.state}
                        country={user.myface.country}
                        biography={user.myface.biography}
                        online={user.myface.online}
                        redirect={this.props.redirect}
                        >
                            <p>oi</p>
                        </Profile>
                </Layout>
            )
        } else return (<NotFound production={this.props.production} exists={this.props.exists} site={this.props.site} redirect={this.props.redirect}/>)
    }
}
