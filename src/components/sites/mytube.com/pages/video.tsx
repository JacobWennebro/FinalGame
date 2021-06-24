import React, { Component } from 'react'
import Layout from '../../mytube.com/components/Layout'
import VideoPlayer from '../components/VideoPlayer'
import Videos from '../../../../data/Videos.json'
import Users from '../../../../data/Profiles.json'
import NotFound from '../../notfound/pages';
import ReactStars from 'react-stars';
import Comment from '../components/Comment';
import Image from '../../../ui/Image';
import RelatedVideo from '../components/RelatedVideo'

export default class video extends Component<{ path: string, redirect: (url: string) => void, exists: boolean, site: string, production: boolean, time: number }> {
    months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    shuffleArray(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    render() {
        const video = Videos.find(v => v.id === this.props.path.split("/")[1]);
        const author = Users.find(u => u.myface.username === video.author).myface;
        if (video && author) {
            return (
                <Layout redirect={this.props.redirect}>
                    <div className="video">
                        <h1 className="video__title">{video.title}</h1>
                        <div className="video__seperator">
                            <div className="main">

                                <VideoPlayer src={video.file} />

                                <div className="statistics">
                                    <ReactStars
                                        count={5}
                                        value={video.stars}
                                        className="rating v-center"
                                        size={18}
                                        edit={false}
                                        color2={'#EB1D1D'}
                                    />
                                    <p className="v-center">{video.ratings} ratings</p>
                                    <p className="v-center lean-right"><b>{video.views}</b> views</p>
                                </div>

                                <hr />

                                <div className="section">
                                    <h3>Text Comments ({video.comments.length})</h3>
                                    <div className="section__contents">
                                        {video.comments.map(c => (
                                            <Comment redirect={this.props.redirect} user={c.user} message={c.message} />
                                        ))}
                                    </div>
                                </div>

                            </div>
                            <div className="related">

                                <div className="video__about">
                                    <div className="channel render-as-pixels">
                                        <Image src={`images/avatars/${author.avatar}`} />
                                        <div className="channel__info">
                                            <h3 className="hoverable link" data-link={`myface.com/user/${author.username}`} onClick={() => this.props.redirect ? this.props.redirect(`myface.com/user/${author.username}`) : ""}>{author.username}</h3>
                                            <p>{video.day} {this.months[video.month]}</p>
                                            <p>{video.year}</p>
                                        </div>
                                    </div>
                                    <p>{video.description}</p>
                                    <hr />
                                    <span>URL: </span><input readOnly onClick={e => e.currentTarget.select()} value={`https://mytube.com/video/${video.id}`} />
                                    <br />
                                    <br />
                                    <span>MyFace Profile: </span><input readOnly onClick={e => e.currentTarget.select()} value={`https://myface.com/user/${author.username}`} />
                                </div>
                                            
                                <div className="video__related">
                                    <h3>Related Videos</h3>
                                    <div className="video__related__videos">
                                        {this.shuffleArray(Videos).filter(v => v.id !== video.id).splice(0, 5).map(v => (
                                            <RelatedVideo key={v.id} redirect={this.props.redirect} title={v.title} file={v.file} author={v.author} id={v.id}/>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </Layout>
            )
        } else return (<NotFound production={this.props.production} exists={this.props.exists} site={this.props.site} redirect={this.props.redirect} />)
    }
}
