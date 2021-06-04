import React, { Component, MouseEvent } from 'react'
import GameSave from '../../../scripts/SaveManager';
import SaveManager from '../../ui/SaveManagerInterface';
interface SettingsState {
    // An array of objects
    settings: {
        id: string,
        name: string,
        value: boolean,
        // Default value of the setting upon init
        default: boolean
    }[]
}

export default class app extends Component<{save: GameSave}, SettingsState> {
    
    constructor(props) {
        super(props);
        this.state = {
            settings: [
                {
                    id: "clickSound",
                    name: "Click Noise",
                    // If the value is not undefined, get it from the save, otherwise use default value
                    value: typeof this.props.save.getConstant("clickSound") !== undefined  ? this.props.save.getConstant("clickSound") : true,
                    default: true,
                }
            ]
        }
    }

    // Fetches the setting value from save or returns default
    fetchSettingValue(id: string) {
        const value = this.props.save.getSetting(id);
        if(value) return(value);
        else return(this.state.settings.filter((setting) => setting.id == id)[0].default);
    }

    updateSetting(id: string) {
        let setting = this.state.settings.filter((setting => setting.id == id))[0];
        this.props.save.setSetting(`${id}`, (!setting.value).toString());

        let settingObjectIndex = this.state.settings.findIndex((setting) => setting.id == id)
        this.state.settings[settingObjectIndex].value = !this.state.settings[settingObjectIndex].value;

        console.log(this.props.save.getConstant(`${setting.id}`));
    }

    render() {
        // An array of checked values
        let checkedValues = this.state.settings.map(setting => {
            this.fetchSettingValue(setting.id) ? "checked" : "";
        })
        // Settings work, but the values in the settings menu are not persistent due to an issue with me not
        // understanding how to write dynamic attributes into JSX.
        // Meaning the you can set your click make sound, and it will next time the save is loaded.
        // But when you open the settings app it will reset this value to false, because the values are not persistent
        // MAJOR TODO:
        return (
            <div className="app" id="mainsettings">
                {this.state.settings.map((setting, index) => (
                    <div>
                        <input onChange={() => {this.updateSetting(setting.id)}} type="checkbox" {...checkedValues[index]}/><span> {setting.name}</span>
                    </div>
                ))}
            </div>
        )
    }
}
