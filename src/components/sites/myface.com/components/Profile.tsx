import React, { Component } from 'react'

export default class Profile extends Component<{gender: string, age: number, town: string, state: string, country: string}> {
    render() {
        return (
            <div className="myface-profile">
                
                <div className="myface-profile__details">
                    <div className="myface-profile__details__picture render-as-pixels" style={{background:`url(../assets/icons/avatar-unisex.png) left center / cover`}}></div>
                    <div className="myface-profile__details__info">
                        <p className="v-center">
                            {this.props.gender}<br/>
                            {this.props.age} years old<br/>
                            {this.props.town}<br/>
                            {this.props.country.toUpperCase()}<br/>
                        </p>
                    </div>
                </div>

                <hr/>

            </div>
        )
    }
}
