import React, { Component } from 'react'
import Ad from '../../../webcomponents/Ad'

export default class Profile extends Component<{username: string, name: string, gender: string, age: number, town: string, state: string, country: string, avatar: string, biography: string}> {
    render() {
        return (
            <div className="myface-profile">
                
                <Ad banner={true} nsfw={false}/>

                <div className="myface-profile__seperator">
                    <div className="myface-profile__about">
                        <h2 className="myface-profile__heading">@{this.props.username}</h2>

                        <div className="myface-profile__about__details">
                            <div className="myface-profile__about__details__picture render-as-pixels" style={{background:`url(./assets/images/avatars/${this.props.avatar}) left center / cover`}}></div>
                            <div className="myface-profile__about__details__info">
                                <p className="v-center">
                                    {this.props.name}
                                    <br/>
                                    {this.props.gender}, {this.props.age}<br/>
                                    <br/>
                                    Last Login: 2/15/2006
                                </p>
                            </div>
                        </div>

                        <div className="myface-profile__about__biography">
                            <h3>Biography</h3>
                            <div className="myface-profile__about__biography__content">
                                <p>{this.props.biography}</p>
                            </div>
                        </div>

                        <div className="myface-profile__about__url">
                            <p>MyFace URL:</p>
                            <input readOnly={true} value={"https://myface.com/"+this.props.username.toLowerCase()}/>
                        </div>

                    </div>

                    <div className="myface-profile__feed">
                        <h2 className="myface-profile__heading">{this.props.username}'s feed</h2>
                        <div className="myface-profile__feed__contents">
                            {this.props.children}
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}
