import React, { Component, HtmlHTMLAttributes, LegacyRef, RefObject } from 'react'
import GameSave from '../../scripts/SaveManager'

export default class extends Component<{ save: GameSave, saveClick: () => void, deleteClick: () => void }> {
    render() {
        return (
            <li id={`save_${this.props.save.id}`} className="listelement">
                <span className="save-details" onClick={this.props.saveClick}>
                    Save {this.props.save.id+1}: Last updated {
                        // Format the date to MMMM-DD-YYYY
                        Intl.DateTimeFormat('en', {
                            month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric',
                            hour12: false, timeZoneName: 'short'
                        }).format(new Date(this.props.save.lastUpdated))
                    }
                </span>
                <span onClick={this.props.deleteClick} className="delete-btn">delete</span>
            </li>
        );
    }
}