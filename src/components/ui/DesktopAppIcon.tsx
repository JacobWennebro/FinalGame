import React, { Component } from 'react'

export default class DesktopAppIcon extends Component<{ title?: String, icon?: String, id?: String, onClick: (id: String) => void, notifications: number, setNotifications: (id: string, amount: number) => void }> {
    render() {
        return (
            <div className="desktop-app" app-id={this.props.id}>
                <div onClick={() => this.props.onClick(this.props.id)} tabIndex={0} className="desktop-app__inner render-as-pixels">
                    <div className="desktop-app__icon" style={{ backgroundImage: `url("./assets/icons/${this.props.icon}")`, backgroundSize: "cover" }}>
                        {this.props.notifications > 0 ? (
                            <div className="desktop-app__icon__notifications">
                                <span>{this.props.notifications}</span>
                            </div>
                        ) : ""}
                    </div>
                    <span className="desktop-app__title text-style-1">{this.props.title || "Unnamed application"}</span>
                </div>
            </div>
        )
    }
}
