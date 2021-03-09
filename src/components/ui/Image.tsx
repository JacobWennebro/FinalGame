import React, { Component, HtmlHTMLAttributes, LegacyRef, RefObject } from 'react'

export default class Image extends Component<{src: string, className?: string, id?: string}> {
    render() {
        return (
            <img id={this.props.id} className={this.props.className} src={"./assets/"+this.props.src}/>
        )
    }
}
