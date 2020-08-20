import React from 'react';

import './Checkbox.scss';

export default function Checkbox({ input, onChange, index }) {
  return (
    <React.Fragment>
      {index % 2 === 0 ? (
        <div className="checkbox__title">{input.name}</div>
      ) : (
        ''
      )}
      <input
        id={`checkbox${index}`}
        className="checkbox__input"
        type="checkbox"
        name={input.name}
        value={input.value}
        onChange={() =>
          onChange(input.name, input.value, input.type, input.text)
        }
      />
      <label
        htmlFor={`checkbox${index}`}
        className={`checkbox ${input.value ? 'active' : null}`}
      >
        <span className="text">
          <img alt={input.name} className="image" src={input.image} />
          {input.text}
        </span>
      </label>
      {index === 6 && input.error ? (
        <div className="checkbox__error">{input.helperText}</div>
      ) : (
        ''
      )}
    </React.Fragment>
  );
}
