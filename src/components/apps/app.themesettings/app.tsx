import React, { Component, MouseEvent } from 'react'
import GameSave from '../../../scripts/SaveManager';

export default class app extends Component<{save: GameSave}> {
    
    constructor(props) {
        super(props);

        this.applyTheme = this.applyTheme.bind(this);
    }

    applyTheme(e: MouseEvent<HTMLDivElement>) {
        const theme = e.currentTarget.getAttribute("data-theme");
        if(this.props.save) this.props.save.setConstant("theme", theme);
        if(theme) document.body.setAttribute("theme", theme);
    }

    render() {
        return (
            <div className="app" id="settings">
                
                <div className="themes">
                    <h2>Theme</h2>
                    <div className="themes__grid">
                        <div onClick={this.applyTheme} className="theme" data-theme="blue"></div>
                        <div onClick={this.applyTheme} className="theme" data-theme="black"></div>
                        <div onClick={this.applyTheme} className="theme" data-theme="red"></div>
                        <div onClick={this.applyTheme} className="theme" data-theme="green"></div>
                        <div onClick={this.applyTheme} className="theme" data-theme="pink"></div>
                    </div>
                </div>

            </div>
        )
    }
}
