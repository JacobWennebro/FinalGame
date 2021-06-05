import React, { Component, HtmlHTMLAttributes, LegacyRef, RefObject } from 'react'
import GameSave from '../../scripts/SaveManager'

export default class extends Component<{save: GameSave, saveClick: any, deleteClick: any}> {
    render() {
        let seperator = undefined;
        return(
            <span id={`save_${this.props.save.id}`}><li onClick={this.props.saveClick} className="listelement">
                Save {this.props.save.id}: Last updated {
                    // Format the date to MMMM-DD-YYYY
                    Intl.DateTimeFormat('en', {
                        month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric',
                        hour12: false, timeZoneName: 'short'
                    }).format(new Date(this.props.save.lastUpdated))
                }
            </li>
            <li className={`seperator deletebutton`} onClick={this.props.deleteClick}></li>
            </span>
            );
    }
}