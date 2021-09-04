import React, { Component } from 'react'

export default class CpSection extends Component<{title: string}> {
    render() {
        return (
            <div className="controlpanel__main__page__view__section">
                <span className="controlpanel__main__page__view__section-title text-style-1">{this.props.title}</span>
                <section>
                    {this.props.children}
                </section>
            </div>
        )
    }
}
