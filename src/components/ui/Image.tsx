import React, { Component } from 'react'

export default class Image extends Component<{src: string, className: string}> {
    render() {
        return (
            <img className={this.props.className} src={"./assets/"+this.props.src}/>
        )
    }
}
