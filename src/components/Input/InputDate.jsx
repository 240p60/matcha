import 'date-fns';
import React from 'react';

import TextField from '@material-ui/core/TextField';

export default function InputDate({ input, name, onChange, focus }) {
  let margin =
    document.documentElement.clientHeight >= 660 ? 'normal' : 'dense';

  return (
    <div className="input__date">
      <TextField
        name={input.name}
        error={input.error}
        label={input.name}
        type="date"
        defaultValue={input.value}
        margin={margin}
        onChange={(e) => onChange(name, e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {input.error ? <div className="error">{input.helperText}</div> : ''}
    </div>
  );
}
