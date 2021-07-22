import React, { Component, Consumer, createRef, MouseEvent } from 'react'
import loadable from '@loadable/component'
import { ConfigTypes } from '../../../types/ContextData'
import Sites from '../../../data/Sites.json'
import Bar from './Bar'

interface state {
    active_sublink: string
    active_url: string
    htmlpage: any
}

const default_url = "myface.com";
const default_sublink = "user/sebhughes88";

export default class app extends Component<{Consumer: Consumer<{}>}, state> {
    spanInputElement = createRef<HTMLSpanElement>();
    inputElement: HTMLSpanElement
    linkDescriptor = createRef<HTMLSpanElement>();

    constructor(props) {
        super(props);

        this.DynamicWebpageLoader = this.DynamicWebpageLoader.bind(this);
        this.LinkDescriptor = this.LinkDescriptor.bind(this);
        this.updateSite = this.updateSite.bind(this);
        this.redirect = this.redirect.bind(this);

        this.state = {
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

                /* Imports .gsml with raw-loader */
                import(`../../sites/${site}/${props.path || "index"}.gsml`).then(html => {
                    const renderer = document.getElementById("htmlBrowserRender");
                    const gsmlCSS = document.getElementById("gsmlCSS");
                    const path = `./assets/gsml/${site}/`;

                    if(gsmlCSS) gsmlCSS.remove();

                    console.log(html.default);

                    const parent = document.createElement("div");
                    parent.innerHTML = html.default;

                    const style = parent.querySelector("style");
                    const body = parent.querySelector("main");

                    style.id = "gsmlCSS";

                    document.head.appendChild(style);
                    
                    for(const c of Array.from(body.classList)) {
                        renderer.classList.add(c);                        
                    }

                    for(const img of Array.from(body.querySelectorAll("img"))) {
                        img.src = path + img.getAttribute("source");
                    }

                    renderer.innerHTML = body.innerHTML;
                    
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
        if(link) this.linkDescriptor.current.innerText = link;
        else this.linkDescriptor.current.innerText = "";
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
                            <span ref={this.linkDescriptor}></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}