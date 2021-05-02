import React, { Component, createRef, KeyboardEvent, MouseEvent } from 'react'
import Sites from '../../../configs/Sites.json'
import Image from '../../ui/Image';

interface state {
    input: string
    visible_suggestions: boolean
    active_url: string
    active_sublink: string
    active_site_secure: boolean
    link_descriptor: string
}

export default class Bar extends Component<{updateSite: (active_url: string, active_sublink: string) => void}, state> {
    searchHistory = []
    spanInputElement = createRef<HTMLSpanElement>();

    constructor(props) {
        super(props);

        this.SearchbarClickAutoComplete = this.SearchbarClickAutoComplete.bind(this);
        this.Searchbar = this.Searchbar.bind(this);
        this.Pagination = this.Pagination.bind(this);

        this.state = {
            input: "",
            visible_suggestions: false,
            active_url: "myface.com",
            active_sublink: "user/mayacooper89",
            active_site_secure: true,
            link_descriptor: undefined
        }
    }

    SearchbarMoveCursorToEnd(contentEditableElement) {
        let range, selection;
        if (document.createRange) {
            range = document.createRange();
            range.selectNodeContents(contentEditableElement);
            range.collapse(false);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    SearchbarAutocomplete(e: MouseEvent | KeyboardEvent) {
        const addresses = this.searchHistory.filter(a => a.startsWith(this.state.input));
        const targetAddress = addresses[0]
        const t = e.target as HTMLSpanElement;

        if (targetAddress && t.innerText !== targetAddress && this.state.input.length >= 3 && addresses.length > 0) {
            t.innerText = targetAddress.length > 0 ? targetAddress : undefined;
            this.setState({ input: t.innerText });
            this.SearchbarMoveCursorToEnd(t);
        }
    }

    SearchbarClickAutoComplete(e: MouseEvent<HTMLSpanElement>) {
        const autoCompletes = this.searchHistory.filter(a => a.startsWith(this.state.input) && a !== this.state.input);
        const t = e.currentTarget;
        if (autoCompletes.length > 0 && window.getSelection().getRangeAt(0).endOffset == t.innerText.length) {
            e.preventDefault();
            this.SearchbarAutocomplete(e);
        }
    }

    Searchbar(e: KeyboardEvent<HTMLSpanElement>, i: boolean) {
        const t = e.target as HTMLSpanElement;
        const autoCompletes = this.searchHistory.filter(a => a.startsWith(this.state.input) && a !== this.state.input);

        // Max 40 characters
        if (t.innerText.length > 40 && e.key.length == 1 && !e.ctrlKey) e.preventDefault();

        // Autocomplete macros
        else if (["Tab", "ArrowRight"].includes(e.key) && autoCompletes.length > 0 && window.getSelection().getRangeAt(0).endOffset == t.innerText.length) {
            e.preventDefault();
            this.SearchbarAutocomplete(e);
        }

        // Cancel non-character keys
        if (e.key.length > 1) return;

        this.setState({ input: (t.innerText + (i ? e.key : "")).toLowerCase() });
    }

    SearchbarRestrictions(e: KeyboardEvent<HTMLSpanElement>) {

        if (e.key === "Enter") {
            e.preventDefault();

            const autoCompletes = this.searchHistory.filter(a => a.startsWith(this.state.input));
            let input = this.state.input;

            if (autoCompletes.length > 0) {
                this.SearchbarAutocomplete(e);
                input = autoCompletes[0];
            }

            this.GoToWebpage(input);
            this.setState({ input });

        }
        else if (e.key === "Backspace") {
            const t = e.currentTarget;

            this.setState({ input: t.innerText.substr(0, t.innerText.length - 1) });
        }
        else if (e.currentTarget.innerText.length > 40 && !e.ctrlKey) e.preventDefault();
    }

    CancelFocus() {
        const tmp = document.createElement("input");
        document.body.appendChild(tmp);
        tmp.focus();
        document.body.removeChild(tmp);     
    }

    GoToWebpage(address: string) {
        if(address && address.length <= 0) return;
        //if(address === this.state.active_url + this.state.active_sublink ? "/"+this.state.active_sublink : "") return;
        address = address.replace(/^(http|https):\/\/|www./gm, "");

        this.CancelFocus();
        const inputElement = this.spanInputElement.current;

        document.body.classList.add("progress-state");
        inputElement.classList.add("progress-state");
        
        setTimeout(() => {
            const sublinks = address.split("/");
            const domain = sublinks[0];
            sublinks.shift();

            const targetSite = Sites.filter(s => s.url == domain)[0];
            const path = sublinks.join("/");

            this.setState({ 
                active_url: domain, 
                active_sublink: (domain !== "notfound") ? path : "index", 
                active_site_secure: targetSite ? targetSite.secure : false
            });

            inputElement.innerText = address;
            this.searchHistory.push(domain);

            document.body.classList.remove("progress-state");
            inputElement.classList.remove("progress-state");

            this.props.updateSite(this.state.active_url, this.state.active_sublink);
        }, Math.round(Math.random() * 2000));
    }

    Pagination(e: MouseEvent<HTMLDivElement>) {
        if(e.currentTarget.classList.contains("back")) {
            const targetPage = this.searchHistory[this.searchHistory.length-2];
            console.log(targetPage);
            
            this.GoToWebpage(targetPage);
        } else {
            console.log("forward");
        }
    }

    render() {
        return (
            <div className="browser__bar">

                <div className="browser__bar__pagination">
                    <div onClick={this.Pagination} className="browser__bar__pagination__button v-center back"></div>
                    <div onClick={this.Pagination} className="browser__bar__pagination__button v-center forward"></div>
                </div>

                <div className="browser__bar__security">
                    <div className="browser__bar__security__icon v-center">
                        <Image className="v-center render-as-pixels" src={`icons/${this.state.active_site_secure ? "padlock-secure" : "padlock-unsecure"}.png`} />
                    </div>
                </div>

                <div className="browser__bar__search" input-value={this.state.input}>
                    {(this.state.input.length >= 3 && this.searchHistory.filter(a => a.startsWith(this.state.input)).length > 0) ? (
                        <style>{`
                        .browser__bar__search[input-value="${this.searchHistory.filter(a => a.startsWith(this.state.input))[0].substr(0, this.state.input.length)}"] .browser__bar__search__input:not(:empty):after {
                            content: '${this.searchHistory.filter(a => a.startsWith(this.state.input))[0].substr(this.state.input.length)}';
                            background-color: #3368C4;
                            color: #FFF;
                        }
                    `}</style>
                    ) : <React.Fragment />}

                    <span id="browserInput" ref={this.spanInputElement} onClick={this.SearchbarClickAutoComplete} onFocus={() => this.setState({ visible_suggestions: true })} onBlur={() => this.setState({ visible_suggestions: false })} onKeyUp={(e) => this.Searchbar(e, false)} onKeyDown={(e) => { this.SearchbarRestrictions(e); this.Searchbar(e, true); }} contentEditable={true} className={`browser__bar__search__input v-center ${this.state.active_site_secure ? "secure" : ""}`}></span>
                    <div className={`browser__bar__search__suggestions ${this.state.visible_suggestions ? "active" : ""}`}>
                        <span>hello.com</span>
                        <span>hello.com</span>
                    </div>
                </div>

                <div className="browser__bar__buttons">
                    <button onClick={() => this.GoToWebpage(this.state.input)} className="v-center search-btn">Search</button>
                    <button onClick={() => this.GoToWebpage("myface.com/user/mayacooper89")} className="v-center"><Image src="icons/menu.png"/></button>
                </div>

        </div>
        )
    }
}
