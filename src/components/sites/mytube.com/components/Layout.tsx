import React, { Component } from 'react'
import '../mytube.scss';

export default class Layout extends Component<{redirect: (url: string) => void}> {
    render() {
        return (
            <div className="webpage mytube">
                <header>
                    <div className="margin">
                        <h1 className="hoverable" data-link={"videosite.com"} onClick={() => this.props.redirect("videosite.com")}>VideoSite.com</h1>
                        <ul className="v-center">
                            <li className="hoverable" onClick={() => this.props.redirect("myface.com")}>Feed</li>
                            <li className="hoverable" data-link={"myface.com"} onClick={() => this.props.redirect("myface.com")}>MyFace</li>
                            <li className="hoverable" data-link={"myface.com/user/sebhughes88"} onClick={() => this.props.redirect("myface.com/user/default")}>Profile</li>
                        </ul>
                    </div>
                </header>
                <div className="view margin page-wrapper">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
