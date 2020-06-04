import React, { useState } from 'react'

export default function Radio({name, text, img, status}) {
    const [checked, setChecked] = useState(status);

    return (
        <label className={checked ? 'active' : ''}>
            <input type="radio" name={name} value={text} checked={checked} onChange={() => setChecked(!checked)}/>
            <span className={`text text${text}`}>
                <img alt={name} className={`image image_${name}`} src={img}/>
                {text}
            </span>
        </label>
    )
};