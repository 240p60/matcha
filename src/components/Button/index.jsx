import React from 'react'
import { Link } from 'react-router-dom'

import "./Button.scss"

export default function Button({text, type, href}) {
    return (
        <Link to={href} className={[
            "button",
            type ? `button_${type}` : null
        ].join(' ')}>
                <span>{text}</span>
        </Link>
    )
};
