import React, { Component } from 'react'
import '../myface.scss';

export default class Layout extends Component<{redirect: (url: string) => void}> {
    render() {
        return (
            <div className="webpage myface">
                <header>
                    <div className="margin">
                        <h1 className="hoverable" onClick={() => this.props.redirect("myface.com")}>MyFace.com</h1>
                        <ul className="v-center">
                            <li className="hoverable" onClick={() => this.props.redirect("myface.com")}>Feed</li>
                            <li className="hoverable" onClick={() => this.props.redirect("myface.com/friendslist")}>Friends</li>
                            <li className="hoverable" onClick={() => this.props.redirect("myface.com/jojo23")}>Profile</li>
                        </ul>
                    </div>
                </header>
                <div className="view margin">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
