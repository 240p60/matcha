import 'date-fns'
import React from 'react'

// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

import TextField from '@material-ui/core/TextField';

export default function InputDate({input, onChange, focus}) {
  let margin = document.documentElement.clientHeight >= 660 ? 'normal' : 'dense';

  function handleDateChange(date) {
    onChange(input.name, date);
  }

  return (
    <div className="input__date">
      <TextField
        name={input.name}
        error={input.error}
        label={input.name}
        type="date"
        defaultValue={input.value}
        margin={margin}
        onChange={(event) => handleDateChange(event.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {input.error ? <div className="error">{input.helperText}</div> : ''}
    </div>
  )
}