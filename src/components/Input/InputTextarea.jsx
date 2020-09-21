import React from 'react';
import TextField from '@material-ui/core/TextField';
import './Input.scss';

export default function InputTextarea({ input, name, onChange, focus }) {
  let margin =
    document.documentElement.clientHeight >= 660 ? 'normal' : 'dense';

  return (
    <TextField
      id="outlined-multiline-static"
      multiline
      rows={2}
      variant="outlined"
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
      fullWidth
      placeholder={input.placeholder ? input.placeholder : ''}
    />
  );
}
