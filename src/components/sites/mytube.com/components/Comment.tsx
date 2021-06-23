import React, { Component } from 'react'
import Image from '../../../ui/Image'
import Users from '../../../../data/MyFaceUsers.json'

interface Props {
    user: string;
    message: string;
    redirect?: (url: string) => void;
}

export default class Comment extends Component<Props> {
    render() {
        const user = Users.find(u => u.username === this.props.user);
        if(user) return (
                <div className="comment render-as-pixels">
                    <div className="hoverable" data-link={`myface.com/user/${user.username}`} onClick={() => this.props.redirect ? this.props.redirect(`myface.com/user/${user.username}`) : ""}>
                        <Image src={`images/avatars/${user.avatar}`}/>
                    </div>
                    <div className="comment__content">
                        <h4 className="link hoverable" data-link={`myface.com/user/${user.username}`} onClick={() => this.props.redirect ? this.props.redirect(`myface.com/user/${user.username}`) : ""}>{user.username}</h4>
                        <p>{this.props.message}</p>
                    </div>
                </div>
        );
        else return (
            <div>invalid user</div>
        )

    }
}
