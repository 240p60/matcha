import React, { useState } from 'react'

import { Typography } from '@material-ui/core';
import { Input, Button, InputDate, InputOptions, Radio, MapComponent } from '../index'
import { makeStyles } from '@material-ui/core/styles';

import Male from '../../assets/img/male.svg'
import Female from '../../assets/img/female.svg'

import "./ProfileInfo.scss"

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  typography: {
    margin: '0 auto'
  }
}));

export default function ProfileInfo() {
  const classes = useStyles();
  const [inputs, setInputValue] = useState([
    {
      type: 'date',
      name: 'Date of Birth',
      value: "2017-05-24",
      error: false,
      helperText: 'You are under 18 years old',
      placeholder: 'DD/MM/YYYY'
    },
    {
      type: "radio",
      name: "Gender",
      text: "Мale",
      image: Male,
      value: true
    },
    {
      type: "radio",
      name: "Gender",
      text: "Female",
      image: Female,
      value: false
    },
    {
      type: "radio",
      name: "Sex Preference",
      text: "Мale",
      image: Male,
      value: false
    },
    {
      type: "radio",
      name: "Sex Preference",
      text: "Female",
      image: Female,
      value: true
    },
    {
      type: "options",
      name: "Interests",
      error: false,
      helperText: 'Choose min 3 interests',
      value: []
    }
  ]);

  function addProfileInfo(event) {
    let years;
    let gender;
    let sexPreference;
    let interests;
    event.preventDefault();
    let errors = false;
    const newInputs = inputs.map((item) => {
      switch (item.name) {
        case 'Gender':
          if (item.value === true)
            gender = item.text;
          break;
        case 'Sex Preference':
          if (item.value === true)
            sexPreference = item.text;
          break;
        case 'Date of Birth':
          years = Math.floor((Date.now() - new Date(item.value).getTime()) / 1000 / 3600 / 8760);
          if (years < 18) {
            item.error = true;
            errors = true;
          } else 
            item.error = false;
          break;
        case 'Interests':
          if (item.value.length < 4) {
            item.error = true;
            errors = true;
          } else {
            item.error = false;
            interests = item.value;
          }
          break;
        default:
          return item;
      }
      return item;
    });

    if (!errors) {
      fetch("http://localhost:3000/user/update", {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          years: years,
          gender: gender,
          sex: sexPreference,
          interests: interests
        })
      })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json()
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));
    } else
      setInputValue(newInputs);
  }

  function changeValue(name, value) {
    const newData = inputs.map(item => {
      if (item.name === name) {
        item.value = typeof item.value === "boolean" ? !item.value : value;
      }
      return item;
    })
    setInputValue(newData);
  }

  return (
    <div className={`${classes.paper} form__block form__block-profile_info`}>
      <form action="/profile" className="profileForm">
        <Typography className={classes.typography} component="h1" variant="h5">
          Add Information
        </Typography>
        {inputs.map((item, index) => {
          if (item.type === 'date') {
            return <InputDate key={index} focus={index === 0 ? true : false} input={item} onChange={changeValue}/>
          } else if (item.type === 'radio') {
            return <Radio key={index} index={index} focus={index === 0 ? true : false} input={item} onChange={changeValue}/>
          } else if (item.type === 'options') {
            return <InputOptions key={index} input={item} onChange={changeValue}/>
          } else {
            return <Input key={index} focus={index === 0 ? true : false} input={item} onChange={changeValue}/>
          }
        })}
        {/* <MapComponent></MapComponent> */}
        <Button onClick={addProfileInfo} text="Continue" type="submit" />
      </form>
    </div>
  )
};
