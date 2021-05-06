import React, { Component, RefObject } from 'react'
import Image from '../../ui/Image'
import Contact from './Contact'

import dMaya from "../../../data/dialogue/maya.json";
import dTj from "../../../data/dialogue/tj.json";
import dRosa from "../../../data/dialogue/rosa.json";
import dBryant from "../../../data/dialogue/bryant.json";


interface Message {
    message: string, 
    author: string
}

interface ContactData {
    username: string,
    avatar: string,
    theme: string,
    dialouge: Message[]
}

interface state {
    active_contact: ContactData
}

export default class app extends Component<{}, state> {
    private chatbox = React.createRef() as RefObject<HTMLDivElement>;

    constructor(props) {
        super(props);

        this.state = {
            active_contact: dMaya as any
        }

    }

    componentDidMount() {
        this.chatbox.current.scrollTo(0, this.chatbox.current.scrollHeight);
    }

    componentDidUpdate() {
        this.chatbox.current.scrollTo(0, this.chatbox.current.scrollHeight);
    }

    render() {
        return (
            <div className="app messager" id="messager">
                
                <div className="sidebar">
                    <div className="sidebar__contacts">
                        
                        <Contact onClick={() => this.setState({active_contact: dMaya as any})} name={dMaya.username}/>
                        <Contact onClick={() => this.setState({active_contact: dTj as any})} name={dTj.username}/>
                        <Contact onClick={() => this.setState({active_contact: dRosa as any})} name={dRosa.username}/>
                        <Contact onClick={() => this.setState({active_contact: dBryant as any})} name={dBryant.username}/>

                    </div>
                </div>

                <div className="chat">
                    <div className="chat__room v-center">

                        <div className="chat__room__section left">
                            <div className={`contact-profile ${this.state.active_contact.theme}`}>
                                <Image className="render-as-pixels avatar" src={`images/avatars/${this.state.active_contact.avatar}`}/>
                            </div>
                        </div>

                        <div className="chat__room__section right">
                            <div className="chat-box" ref={this.chatbox}>
                                {this.state.active_contact.dialouge.map(m => (
                                    <p className="chat-box__message"><span className={m.author !== "you" ? "them" : "you"}>{m.author !== "you" ? this.state.active_contact.username : "sebbyh"}: </span>{m.message}</p>
                                ))}
                            </div>
                        </div>

                        <div className="chat__room__section left">
                            <div className="contact-profile" style={{backgroundColor: "var(--secondary)"}}>
                                <Image className="render-as-pixels avatar" src="images/avatars/sebastian.png"/>
                            </div>
                        </div>

                        <div className="chat__room__section right">
                            <div className="user-input">
                                <div className="user-input__header">

                                </div>
                                <div className="user-input__box">

                                </div>
                                <div className="user-input__footer">
                                    <button className="send-button v-center">Send</button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}
