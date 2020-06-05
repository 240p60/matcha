import React, { useContext } from 'react'
import { Context } from '../../Context';

export default function Radio({name, text, img, status, id, radioType}) {
    const { radioButtons, setRadioButtons } = useContext(Context);

    function setChecked(id) {
        let newButtons;
        if (radioButtons[id].checked === true) {
            return;
        } else {
            newButtons = radioButtons.map(item => {
                if (radioType === item.type) {
                    item.checked = !item.checked;
                    return item;
                }
                return item;
            });
        }
        setRadioButtons(newButtons);
    }

    return (
        <label className={status ? 'active' : null}>
            <input type="radio" name={name} value={text} onChange={() => setChecked(id)}/>
            <span className="text">
                <img alt={name} className="image" src={img}/>
                {text}
            </span>
        </label>
    )
};