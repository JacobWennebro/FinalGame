import React, { Component } from 'react'

export default class ContextMenu extends Component<{ openApp: (id: string) => void, visibility: boolean, x: number, y: number }> {
    render() {
        return (
            <div className="cxm" style={{
                display: this.props.visibility ? "block" : "none",
                top: this.props.y+"px",
                left: this.props.x+"px"
            }}>
                <ul>
                    <li id="cxmPictures">Picture Gallery</li>
                    <li>My Computer</li>
                    <li className="cxm__spacer"><hr/></li>
                    <li id="cxmSettings">Settings</li>
                </ul>
            </div>
        )
    }
}
