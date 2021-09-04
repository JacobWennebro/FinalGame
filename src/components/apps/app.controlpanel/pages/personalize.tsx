import React, { Component, MouseEvent } from 'react'
import GameSave from '../../../../scripts/SaveManager';
import CpSection from '../components/CpSection'

export default class personalize extends Component<{ save: GameSave }, { activeTheme: string, activeWallpaper }> {

    constructor(props) {
        super(props);

        this.state = {
            activeTheme: document.body.getAttribute("theme"),
            activeWallpaper: document.getElementById("wallpaper").getAttribute("data-wallpaper")
        }

        this.applyTheme = this.applyTheme.bind(this);
        this.applyWallpaper = this.applyWallpaper.bind(this);
    }

    applyTheme(e: MouseEvent<HTMLDivElement>) {
        const theme = e.currentTarget.getAttribute("data-theme");
        if (theme) {
            if (this.props.save) this.props.save.setConstant("theme", theme);
            document.body.setAttribute("theme", theme);
            this.setState({ activeTheme: theme });
        }
    }

    applyWallpaper(e: MouseEvent<HTMLDivElement>) {
        const cssBg = e.currentTarget.style.backgroundImage;

        document.getElementById("wallpaper").style.backgroundImage = cssBg;

        this.props.save.setConstant("wallpaper", cssBg);
        this.setState({ activeWallpaper: cssBg });
    }

    render() {
        return (
            <>

                <CpSection title="Themes">
                    <div className="personalize-themes">
                        <div onClick={this.applyTheme} className="theme" data-theme="blue" id={this.state.activeTheme === "blue" ? "ActiveThemeDisplay" : ""}></div>
                        <div onClick={this.applyTheme} className="theme" data-theme="black" id={this.state.activeTheme === "black" ? "ActiveThemeDisplay" : ""}></div>
                        <div onClick={this.applyTheme} className="theme" data-theme="red" id={this.state.activeTheme === "red" ? "ActiveThemeDisplay" : ""}></div>
                        <div onClick={this.applyTheme} className="theme" data-theme="green" id={this.state.activeTheme === "green" ? "ActiveThemeDisplay" : ""}></div>
                        <div onClick={this.applyTheme} className="theme" data-theme="pink" id={this.state.activeTheme === "pink" ? "ActiveThemeDisplay" : ""}></div>
                    </div>
                </CpSection>

                <CpSection title="Backgrounds">
                    <div className="personalize-wallpapers render-as-pixels">
                        <div onClick={this.applyWallpaper} className="wallpaper"></div>
                        <div onClick={this.applyWallpaper} style={{backgroundImage:`url("./assets/images/wallpapers/landscape.png")`, backgroundSize:"cover"}} className="wallpaper" id={this.state.activeWallpaper && this.state.activeWallpaper.includes("landscape") ? "ActiveWallpaperDisplay" : ""}></div>
                        <div onClick={this.applyWallpaper} style={{backgroundImage:`url("./assets/images/wallpapers/bird.png")`, backgroundSize:"cover"}} className="wallpaper" id={this.state.activeWallpaper && this.state.activeWallpaper.includes("bird") ? "ActiveWallpaperDisplay" : ""}></div>
                        <div onClick={this.applyWallpaper} style={{backgroundImage:`url("./assets/images/wallpapers/astronaut.png")`, backgroundSize:"cover"}} className="wallpaper" id={this.state.activeWallpaper && this.state.activeWallpaper.includes("astronaut") ? "ActiveWallpaperDisplay" : ""}></div>
                        <div onClick={this.applyWallpaper} style={{backgroundImage:`url("./assets/images/wallpapers/jellyfish.png")`, backgroundSize:"cover"}} className="wallpaper" id={this.state.activeWallpaper && this.state.activeWallpaper.includes("jellyfish") ? "ActiveWallpaperDisplay" : ""}></div>
                    </div>
                </CpSection>

            </>
        )
    }
}
