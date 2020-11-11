import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import './Input.scss';

export default function InputOptions({ input, name, onChange }) {
  return (
    <FormControl className="options__input">
      <InputLabel>{input.name}</InputLabel>
      <Select
        multiple
        value={input.value}
        onChange={(event) => onChange(name, event.target.value)}
        input={<Input />}
        renderValue={(selected) => selected.join(', ')}
        error={input.error}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={input.value.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
      {input.error ? <div className="error">{input.helperText}</div> : ''}
    </FormControl>
  );
}

const names = ['Music', 'Sport', 'Pizza', 'Travels', 'Hookahs', 'Serials'];
