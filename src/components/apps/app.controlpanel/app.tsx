import React, { ChangeEvent, Component, MouseEvent } from 'react'
import GameSave from '../../../scripts/SaveManager';

interface Setting {
    id: string,
    name: string,
    onUpdate?: (value: any) => void;
    type: "boolean" | "dropdown",
    value?: boolean
}

interface SettingsState {
    // An array of objects
    settings: Setting[]
}

export default class app extends Component<{ save: GameSave }, SettingsState> {

    constructor(props) {
        super(props);

        this.state = {
            settings: [
                {
                    id: "clickSound",
                    name: "Click Noise",
                    type: "boolean",
                },
                {
                    id: "fullWidth",
                    name: "Auto-scale monitor",
                    type: "boolean",
                    onUpdate: (value: boolean) => {
                        value ? document.body.setAttribute("full-width", "") : document.body.removeAttribute("full-width");
                    }
                }
            ]
        }
    }

    updateSetting(setting: Setting, e: ChangeEvent<HTMLInputElement>) {
        const newValue = !this.props.save.getSetting(setting.id);
        this.props.save.setSetting(`${setting.id}`, newValue);
        
        const checkbox = document.getElementById(`checkbox-${setting.id}`);
        e.currentTarget.checked ? checkbox.classList.add("active") : checkbox.classList.remove("active");

        if (setting.onUpdate) setting.onUpdate(newValue);
    }

    render() {
        // Settings work, but the values in the settings menu are not persistent due to an issue with me not
        // understanding how to write dynamic attributes into JSX.
        // Meaning the you can set your click make sound, and it will next time the save is loaded.
        // But when you open the settings app it will reset this value to false, because the values are not persistent
        // MAJOR TODO:

        return (
            <div className="app" id="controlpanel">
                <div className="controlpanel__sidebar">
                    
                    <div className="controlpanel__sidebar__card">
                        <h2>System settings</h2>
                        <div className="controlpanel__sidebar__card__list">
                            {this.state.settings.map(setting => {

                                if (setting.type === "boolean") return (
                                    <label className="setting" htmlFor={setting.id}>
                                        <input id={setting.id} name={setting.id} onChange={e => this.updateSetting(setting, e)} type="checkbox" defaultChecked={this.props.save ? this.props.save.getSetting(setting.id) : true} />
                                        <div id={`checkbox-${setting.id}`} className={`checkbox ${this.props.save.getSetting(setting.id) ? "active" : ""}`}></div>
                                        <p>{setting.name}</p>
                                    </label>
                                )

                            })}
                        </div>
                    </div>


                </div>
                <div className="controlpanel__main">
                    <h1>Pick a category</h1>
                </div>
            </div>
        )
    }
}
