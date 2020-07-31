import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../../Context'

import { Typography } from '@material-ui/core';
import { Input, Button, InputDate, InputOptions, Radio, Checkbox, MapComponent, Textarea } from '../index'
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
    margin: '0 auto',
    fontFamily: 'Montserrat'
  }
}));

export default function ProfileInfo() {
  let history = useHistory();
  const { userInfo, setUserInfo } = useContext(Context);
  const classes = useStyles();
  const [inputs, setInputValue] = useState([
    {
      type: 'text',
      name: 'First Name',
      value: '',
      error: false,
      helperText: '',
      placeholder: 'First Name'
    },
    {
      type: 'text',
      name: 'Last Name',
      value: '',
      error: false,
      helperText: '',
      placeholder: 'Last Name'
    },
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
      text: "Male",
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
      type: "checkbox",
      name: "Sex Preference",
      text: "Male",
      error: false,
      helperText: 'Choose at least one preference',
      image: Male,
      value: false
    },
    {
      type: "checkbox",
      name: "Sex Preference",
      text: "Female",
      error: false,
      helperText: 'Choose at least one preference',
      image: Female,
      value: true
    },
    {
      type: "options",
      name: "Interests",
      error: false,
      helperText: 'Choose min 3 interests',
      value: []
    },
    {
      type: "textarea",
      name: "Biography",
      error: false,
      helperText: 'Empty value',
      value: ''
    },
    {
      type: 'map',
      name: 'map',
      value: {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 11
      }
    }
  ]);

  async function addProfileInfo(event) {
    event.preventDefault();
    let firstName;
    let lastName;
    let age;
    let gender;
    let sexPreference = '';
    let interests;
    let bio;
    let lat;
    let lng;
    let errors = false;
    const newInputs = inputs.map((item) => {
      switch (item.name) {
        case 'First Name':
          firstName = item.value;
          break;
        case 'Last Name':
          lastName = item.value;
          break;
        case 'Gender':
          if (item.value === true)
            gender = item.text.toLowerCase();
          break;
        case 'Sex Preference':
          if (item.value === true) {
            sexPreference += item.text.toLowerCase();
          } else if (sexPreference === '' && item.text === 'Female') {
            item.error = true;
            errors = true;
          } else item.error = false;
          break;
        case 'Date of Birth':
          age = Math.floor((Date.now() - new Date(item.value).getTime()) / 1000 / 3600 / 8760);
          if (age < 18) {
            item.error = true;
            errors = true;
          } else 
            item.error = false;
          break;
        case 'Interests':
          if (item.value.length < 3) {
            item.error = true;
            errors = true;
          } else {
            item.error = false;
            interests = item.value;
          }
          break;
        case 'Biography':
          if (item.value === '') {
            item.error = true;
            errors = true;
          } else {
            item.error = false;
            bio = item.value;
          }
          break;
        case 'map':
          lat = item.value.lat;
          lng = item.value.lng;
          break;
        default:
          return item;
      }
      return item;
    });

    if (!errors) {
      if (sexPreference === 'malefemale') {
        sexPreference = 'bi';
      } else if (sexPreference === '') {
        errors = true;
      } else if (sexPreference === gender) {
        sexPreference = 'homo';
      } else sexPreference = 'hetero';

      let response = await fetch("http://localhost:3000/user/update/", {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'x-auth-token': sessionStorage.getItem('x-auth-token')
        },
        body: JSON.stringify({
          fname: firstName,
          lname: lastName,
          age: age,
          gender: gender,
          orientation: sexPreference,
          interests: interests,
          bio: bio,
          lat: lat,
          lng: lng
        })
      });

      if (response.status === 202) {
        history.push('/confirm/mail');
      } else if (!response.ok) {
        throw Error(response.statusText);;
      } else {
        setUserInfo({
          'ws-auth-token': userInfo['ws-auth-token'],
          'x-auth-token': userInfo['x-auth-token'],
          mail: userInfo.mail,
          fname: firstName,
          lname: lastName,
          age: age,
          gender: gender,
          orientation: sexPreference,
          interests: interests
        });
        history.push('/user/page');
      }
    } else setInputValue(newInputs);
  }

  function changeValue(name, value, type, text) {
    const newData = inputs.map(item => {
      if (item.type === 'checkbox') {
        if (item.text === text)
          item.value = !item.value;
      } else if (item.name === name) {
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
          } else if (item.type === 'checkbox') {
            return <Checkbox key={index} index={index} focus={index === 0 ? true : false} input={item} onChange={changeValue}/>
          } else if (item.type === 'options') {
            return <InputOptions key={index} input={item} onChange={changeValue}/>
          } else if (item.type === 'textarea') {
            return <Textarea key={index} input={item} onChange={changeValue}/>
          } else if (item.type === 'map') {
            return <MapComponent key={index} input={item} onChange={changeValue}></MapComponent>
          } else {
            return <Input key={index} focus={index === 0 ? true : false} input={item} onChange={changeValue}/>
          }
        })}
        <Button onClick={addProfileInfo} text="Continue" type="submit" subClass="submit" />
      </form>
    </div>
  )
};
