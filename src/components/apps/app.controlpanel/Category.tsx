import React, { Component } from 'react'
import Image from '../../../components/ui/Image'

export default class Category extends Component<{icon: string, title: string, onClick?: () => void}> {
    render() {
        return (
            <div onClick={this.props.onClick} className="category">
                <Image src={"icons/"+this.props.icon}/>
                <div className="category__title">
                    <p className="v-center text-style-1">{this.props.title}</p>
                </div>
            </div>
        )
    }
}
