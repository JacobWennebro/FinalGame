import React, { Component, MouseEvent } from 'react'
import GameSave from '../../../scripts/SaveManager';

interface Setting {
    id: string,
    name: string,
    onUpdate?: (value: any) => void;
}

interface SettingsState {
    // An array of objects
    settings: Setting[]
}

export default class app extends Component<{save: GameSave}, SettingsState> {
    
    constructor(props) {
        super(props);        

        if(this.props.save) this.state = {
            settings: [
                {
                    id: "clickSound",
                    name: "Click Noise",
                },
                {
                    id: "blackBars",
                    name: "Auto-scaling screen width",
                    onUpdate: (value: boolean) => {
                        value ? document.body.setAttribute("full-width", "") : document.body.removeAttribute("full-width");
                    }
                }
            ]
        }
    }

    updateSetting(setting: Setting) {
        const newValue = !this.props.save.getSetting(setting.id);
        this.props.save.setSetting(`${setting.id}`, newValue);
        if(setting.onUpdate) setting.onUpdate(newValue);
    }

    render() {
        // Settings work, but the values in the settings menu are not persistent due to an issue with me not
        // understanding how to write dynamic attributes into JSX.
        // Meaning the you can set your click make sound, and it will next time the save is loaded.
        // But when you open the settings app it will reset this value to false, because the values are not persistent
        // MAJOR TODO:

        if(!this.props.save) return (
            <div className="app" id="mainsettings">
                <p>Settings can not be changed without a save.</p>
            </div>
        )

        return (
            <div className="app" id="mainsettings">
                {this.state.settings.map(setting => (
                    <div>
                        <input onChange={() => this.updateSetting(setting)} type="checkbox" defaultChecked={this.props.save.getSetting(setting.id)}/><span> {setting.name}</span>
                    </div>
                ))}
            </div>
        )
    }
}
