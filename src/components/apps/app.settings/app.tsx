import React, { Component, MouseEvent } from 'react'

export default class app extends Component {
    
    applyTheme(e: MouseEvent<HTMLDivElement>) {
        const theme = e.currentTarget.getAttribute("data-theme");
        console.log(theme);
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
                    </div>
                </div>

            </div>
        )
    }
}
