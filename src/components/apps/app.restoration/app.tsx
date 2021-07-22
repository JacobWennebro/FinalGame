import React, { Component } from 'react'
import GameSave from '../../../scripts/SaveManager'

export default class app extends Component<{save: GameSave}> {
    render() {
        return (
            <div id="restore" className="app">
                <p>System Restore completed successfully. The system has been restored to 9/2/2006 8:32:14 PM. Your documents have not been affected.</p>
            </div>
        )
    }
}
