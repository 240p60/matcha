import React from 'react';
import { notification } from 'antd';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import './Input.scss';

export default function InputOptions({ input, name, onChange }) {
  const [tags, setTags] = React.useState([]);
  const [value, setValue] = React.useState('');

  const addNewTag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.key === 'Enter') {
      setTags([...tags, event.target.value]);
      onChange(name, [...input.value, event.target.value]);
      setValue('');
    }
  }

  const getOptions = async () => {
    if (sessionStorage.getItem('x-auth-token')) {
      let res = await fetch('http://localhost:3000/interests/get/');

      if (res.ok) {
        const data = await res.json();
        setTags(data.map(item => item.name));
      } else notification.error({
        message: 'Не удалось загрузить список интересов',
      });
    }
  }

  React.useEffect(() => {
    getOptions();
  }, []);

  return (
    <div className="options__container">
      <Autocomplete
        multiple
        limitTags={5}
        id="multiple-limit-tags"
        inputValue={value}
        options={tags}
        getOptionLabel={(option) => option}
        className="options__input"
        onChange={(e, newValue) => onChange(name, newValue)}
        value={input.value}
        renderInput={(params) => (
          <TextField
            error={!!input.error}
            onChange={(event) => setValue(event.target.value)}
            onKeyPress={(event) => event.key === 'Enter' && addNewTag(event)}
            variant="outlined"
            label="Tags"
            placeholder="Favorites"
            {...params}
          />
        )}
      />
      {input.error ? <div className="error">{input.helperText}</div> : null}
    </div>
  );
}
