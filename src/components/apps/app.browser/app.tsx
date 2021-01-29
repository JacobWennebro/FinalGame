import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react'

export default function app() {

    const [state, setState] = useState({
        input: "",
        visible_suggestions: false
    });

    function SearchbarAutocomplete(e: MouseEvent|KeyboardEvent) {
        const address = testAddress.filter(a => a.startsWith(state.input))[0];
        const t = e.target as HTMLSpanElement;

        if(address && t.innerText !== address && state.input.length >= 3 && testAddress.filter(a => a.startsWith(state.input)).length > 0) t.innerText = address.length > 0 ? address : undefined;
        setState({...state, input: t.innerText});
    }

    function Searchbar(e: KeyboardEvent<HTMLSpanElement>) {
        const t = e.target as HTMLSpanElement;

        if (t.innerText.length > 40 && e.key.length == 1 && !e.ctrlKey) e.preventDefault();
        else if(e.key === "ArrowRight") SearchbarAutocomplete(e);

        setState({...state, input: t.innerText});
    }

    function SearchbarRestrictions(e: KeyboardEvent<HTMLSpanElement>) {
        if(e.key === "Enter") {
            e.preventDefault();

            console.log("Requested access to " + state.input);
        }
        else if(e.currentTarget.innerText.length > 40 && !e.ctrlKey && e.key !== "Backspace") e.preventDefault();
    }

    const testAddress = [
        "microsoft.com",
        "google.com"
    ];

    return (
        <div className="app" id="browser">
            <div className="browser">
                <div className="browser__bar">

                    <div className="browser__bar__pagination">
                        <div className="browser__bar__pagination__button v-center"></div>
                        <div className="browser__bar__pagination__button v-center"></div>
                    </div>

                    <div className="browser__bar__security">
                        <div className="browser__bar__security__icon v-center">
                            <img className="v-center render-as-pixels" src={"../../assets/icons/padlock-secure.png"}/>
                        </div>
                    </div>

                    <div className="browser__bar__search" input-value={state.input}>
                        {(state.input.length >= 3 && testAddress.filter(a => a.startsWith(state.input)).length > 0) ? (
                            <style>{`
                                .browser__bar__search[input-value="${testAddress.filter(a => a.startsWith(state.input))[0].substr(0, state.input.length)}"] .browser__bar__search__input:after {
                                    content: '${testAddress.filter(a => a.startsWith(state.input))[0].substr(state.input.length)}';
                                    background-color: #3368C4;
                                    color: #FFF;
                                }
                            `}</style>
                        ) : <React.Fragment/>}

                        <span onClick={e => SearchbarAutocomplete(e)} onFocus={() => setState({...state, visible_suggestions: true})} onBlur={() => setState({...state, visible_suggestions: false})} onKeyDown={SearchbarRestrictions} onKeyUp={Searchbar} contentEditable={true} className="browser__bar__search__input v-center"></span>
                        <div className={`browser__bar__search__suggestions ${state.visible_suggestions ? "active" : ""}`}>
                            <span>hello.com</span>
                            <span>hello.com</span>
                        </div>
                    </div>

                    <div className="browser__bar__bookmarks">

                    </div>

                </div>
                <div className="browser__view">

                </div>
            </div>
        </div>
    )
}
