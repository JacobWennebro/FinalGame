import React from 'react'

export default function index(props: { redirect: (url: string) => void }) {
    return (
        <div>
            <h1>hello world</h1>
            <span onClick={() => props.redirect("myface.com")} className="hyperlink">Visit myface.com</span>
        </div>
    )
}
