import React, { Component, MouseEvent } from 'react'
import GameSave from '../../../scripts/SaveManager';
interface SettingsState {
    // An array of objects
    settings: {
        id: string,
        name: string,
        value: boolean,
        // Default value of the setting upon init
    }[]
}

export default class app extends Component<{save: GameSave}, SettingsState> {
    
    constructor(props) {
        super(props);        

        if(this.props.save) this.state = {
            settings: [
                {
                    id: "clickSound",
                    name: "Click Noise",
                    value: this.props.save.getSetting("clickSound") === "true"
                }
            ]
        }
    }

    updateSetting(id: string) {
        const setting = this.state.settings.find((setting => setting.id == id));
        this.props.save.setSetting(`${id}`, (!setting.value).toString());

        const settingObjectIndex = this.state.settings.findIndex((setting) => setting.id == id)
        this.state.settings[settingObjectIndex].value = !this.state.settings[settingObjectIndex].value;
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
                        <input onChange={() => this.updateSetting(setting.id)} type="checkbox" defaultChecked={setting.value}/><span> {setting.name}</span>
                    </div>
                ))}
            </div>
        )
    }
}
