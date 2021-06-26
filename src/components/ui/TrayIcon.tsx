import React, { Component } from 'react'
import Image from './Image'

export default class TrayIcon extends Component<{icon: String}> {
    render() {
        return (
            <div className="icon">
                <Image className="v-center render-as-pixels" src={"icons/"+this.props.icon}/>
            </div>
        )
    }
}
