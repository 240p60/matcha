import React, {useState} from 'react'

export default function Input ({type, name, placeholder}) {
    const [inputValue, setInputValue] = useState(type === 'tel' ? "+7" : '');

    function chageInputValue (value) {
      setInputValue(value);
    }

    return (
        <input
          className={`input input__${name}`}
          value={inputValue}
          onChange={e => chageInputValue(e.target.value)}
          type={type}
          name={name}
          placeholder={placeholder ? placeholder : ''}
      />
    )
}
