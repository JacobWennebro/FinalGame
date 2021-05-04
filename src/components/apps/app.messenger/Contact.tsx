import React, { Component } from 'react'

export default class contact extends Component<{name: string, onClick?: () => void}> {
    render() {
        return (
            <div className="contact" onClick={this.props.onClick}>
                <p>{this.props.name}</p>
            </div>
        )
    }
}
