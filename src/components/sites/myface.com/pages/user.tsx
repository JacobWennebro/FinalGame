import React, { Component } from 'react'
import Users from '../../../../configs/MyFaceUsers.json'
import Layout from '../components/Layout';
import Profile from '../components/Profile';
import NotFound from '../../notfound/pages';

export default class user extends Component<{path: string, redirect: (url: string) => void, exists: boolean, site: string, production: boolean, time: number}, {username: string}> {
    render() {
        const search = Users.filter(u => u.username === this.props.path.split("/")[1]);
        if(search.length > 0) {
            const user = search[0];
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
                        >
                            <p>oi</p>
                        </Profile>
                </Layout>
            )
        } else return (<NotFound production={this.props.production} exists={this.props.exists} site={this.props.site} redirect={this.props.redirect}/>)
    }
}
