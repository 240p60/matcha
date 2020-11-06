import React from 'react';
import TextField from '@material-ui/core/TextField';
import './Input.scss';

export default function Input({ input, name, onChange, focus }) {
  let margin =
    document.documentElement.clientHeight >= 660 ? 'normal' : 'dense';

  return (
    <TextField
      className={`input input__${input.name}`}
      value={input.value}
      onChange={(e) => onChange(name, e.target.value)}
      type={input.type}
      name={input.name}
      error={input.error}
      helperText={input.error ? input.helperText : ''}
      autoFocus={focus ? true : false}
      margin={margin}
      label={input.name}
      required
      variant="outlined"
      fullWidth
      placeholder={input.placeholder ? input.placeholder : ''}
    />
  );
}
