import React from 'react';

import './Radio.scss';

export default function Radio({ input, image, name, onChange, index }) {
  return (
    <React.Fragment>
      {index % 2 === 0 ? <div className="radio__title">{input.name}</div> : ''}
      <input
        id={`radio${index}`}
        className="radio__input"
        type="radio"
        name={input.name}
        value={input.value}
        onChange={() => onChange(name, !input.value)}
      />
      <label
        htmlFor={`radio${index}`}
        className={`radio ${input.value ? 'active' : null}`}
      >
        <span className="text">
          <img alt={input.name} className="image" src={image} />
          {input.text}
        </span>
      </label>
    </React.Fragment>
  );
}
