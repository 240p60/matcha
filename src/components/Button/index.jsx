import React from 'react'
import { Link } from 'react-router-dom'

import "./Button.scss"

export default function Button({text, type, subClass, onClick, href}) {
  return (
    <React.Fragment>
      {href ? (
        <Link to={href} className={[
          "button",
          type ? `button_${subClass}` : null
        ].join(' ')}>
          <span>{text}</span>
        </Link>
      ) : (
        <button
          type={type}
          onKeyPress={(e) => onClick(e)}
          onClick={(e) => onClick(e)}
          className={[
            "button",
            type ? `button_${subClass}` : null
          ].join(' ')}>
            <span>{text}</span>
        </button>
      )}
    </React.Fragment>
  )
};
