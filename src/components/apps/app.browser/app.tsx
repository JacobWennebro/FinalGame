import React, { Component, Consumer, createRef, MouseEvent } from 'react'
import loadable from '@loadable/component'
import { ConfigTypes } from '../../../types/ContextData'
import Sites from '../../../configs/Sites.json'
import Bar from './Bar'

interface state {
    link_descriptor: string
    active_sublink: string
    active_url: string
    htmlpage: any
}

const default_url = "myface.com";
const default_sublink = "user/sebhughes88";

export default class app extends Component<{Consumer: Consumer<{}>}, state> {
    spanInputElement = createRef<HTMLSpanElement>();
    inputElement: HTMLSpanElement

    constructor(props) {
        super(props);

        this.DynamicWebpageLoader = this.DynamicWebpageLoader.bind(this);
        this.LinkDescriptor = this.LinkDescriptor.bind(this);
        this.updateSite = this.updateSite.bind(this);
        this.redirect = this.redirect.bind(this);

        this.state = {
            link_descriptor: undefined,
            active_url: default_url,
            active_sublink: default_sublink,
            htmlpage: "fallback"
        }
    }

    redirect(url: string) {
        const split = url.split("/");
        const domain = split[0];
        split.shift();
        const sublinks = split.join("/");
        
        document.body.classList.add("progress-state");

        setTimeout(() => {
            document.body.classList.remove("progress-state");
            document.getElementById("browserInput").innerText = url;

            this.updateSite(domain, sublinks);
        }, 2000*Math.random());

    }

    updateSite(active_url: string, active_sublink?: string) {
        this.setState({
            active_url,
            active_sublink
        });
    }

    DynamicWebpageLoader(props: { production: boolean, site: string, path?: string }) {
        let DynamicComp = (<div>fallback</div>)
    
        const targetSite = Sites.filter(s => s.url == props.site)[0];
        let site = props.site;

        if(!targetSite || targetSite && props.path && !targetSite.paths.includes(props.path)) site = "notfound";
        if(targetSite) targetSite.paths.push("");

        /* is html type site */
        if(targetSite && targetSite.html && targetSite.paths.includes(props.path)) {

                /* Imports .gtml with raw-loader */
                import(`../../sites/${site}/${props.path || "index"}.gtml`).then(html => {
                    document.getElementById("htmlBrowserRender").innerHTML = html.default;
                }).catch(e => {
                    this.updateSite(targetSite.url, props.path);
                });

            return (<div id="htmlBrowserRender"></div>)
        } else {

            if (props.production) DynamicComp = loadable(() => import(`../../sites/${site}/pages/${(props.path && site !== "notfound") ? props.path.split("/")[0] : "index"}`), {
                fallback: (<div>xd</div>)
            });
            else DynamicComp = require(`../../sites/${site}/pages/${(props.path && site !== "notfound") ? props.path.split("/")[0] : "index"}`).default;
    
            // @ts-ignore
            return (<DynamicComp redirect={this.redirect} production={props.production} exists={targetSite != undefined} site={props.site} path={props.path}/>);
        }
    
    }

    LinkDescriptor(e: MouseEvent<HTMLDivElement>) {
        const link = (e.target as HTMLElement).getAttribute("data-link");
        if(link) this.setState({ link_descriptor: link });
        else if(this.state.link_descriptor != undefined) this.setState({ link_descriptor: undefined });
    }

    render() {
        return (
            <div className="app" id="browser">
                <div className="browser" active-url={this.state.active_url}>
                    <Bar updateSite={this.updateSite}/>
                    <div onMouseMove={this.LinkDescriptor} className="browser__view">
                        <this.props.Consumer>
                            {(data: ConfigTypes) => (
                                <this.DynamicWebpageLoader site={this.state.active_url} path={this.state.active_sublink} production={data.production} />
                            )}
                        </this.props.Consumer>
                        <div className="link-descriptor">
                            <span>{this.state.link_descriptor}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}