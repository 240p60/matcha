import React, { useContext } from 'react'
import { Context } from '../../Context'

import TextField from '@material-ui/core/TextField';

export default function Input ({inputName, focus}) {
  const {inputs, changeValue} = useContext(Context);
  const input = inputs.find(item => {
    return item.name === inputName ? true : false;
  });

  let margin = document.documentElement.clientHeight >= 660 ? 'normal' : 'dense';

  let name = input.name;

  return (
    <TextField
        className={`input input__${name}`}
        value={input.value}
        onChange={e => changeValue(input.name, inputs, e.target.value)}
        type={input.type}
        name={name}
        error={input.error}
        helperText={input.error ? input.helperText : ''}
        autoFocus={focus ? true : false}
        margin={margin}
        label={name}
        required
        variant="outlined"
        fullWidth
    />
  )
}
