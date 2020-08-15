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

  const gender = userInfo.gender || 'male';
  const sex = userInfo.orientation === 'bi' ? 'bi' 
  : userInfo.orientation === 'homo' ? gender : 
  gender === 'female' ? 'male'
  : 'female';
  const location = userInfo.latitude ? {
    center: {
      lat: userInfo.latitude,
      lng: userInfo.longitude
    },
    zoom: 11
  } : {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 11
  };

  const [inputs, setInputValue] = useState([
    {
      type: 'text',
      name: 'First Name',
      value: userInfo.fname || '',
      error: false,
      helperText: '',
      placeholder: 'First Name'
    },
    {
      type: 'text',
      name: 'Last Name',
      value: userInfo.lname || '',
      error: false,
      helperText: '',
      placeholder: 'Last Name'
    },
    {
      type: 'date',
      name: 'Date of Birth',
      value: userInfo.birth || "2017-05-24",
      error: false,
      helperText: 'You are under 18 years old',
      placeholder: 'DD/MM/YYYY'
    },
    {
      type: "radio",
      name: "Gender",
      text: "Male",
      image: Male,
      value: gender === 'male' ? true : false
    },
    {
      type: "radio",
      name: "Gender",
      text: "Female",
      image: Female,
      value: gender === 'female' ? true : false
    },
    {
      type: "checkbox",
      name: "Sex Preference",
      text: "Male",
      error: false,
      helperText: 'Choose at least one preference',
      image: Male,
      value: sex === 'bi' || sex === 'male' ? true : false
    },
    {
      type: "checkbox",
      name: "Sex Preference",
      text: "Female",
      error: false,
      helperText: 'Choose at least one preference',
      image: Female,
      value: sex === 'bi' || sex === 'female' ? true : false
    },
    {
      type: "options",
      name: "Interests",
      error: false,
      helperText: 'Choose min 3 interests',
      value: userInfo.interests || []
    },
    {
      type: "textarea",
      name: "Biography",
      error: false,
      helperText: 'Empty value',
      value: userInfo.bio || ''
    },
    {
      type: 'map',
      name: 'map',
      value: location
    }
  ]);

  console.log(inputs);

  async function addProfileInfo(event) {
    event.preventDefault();
    let firstName;
    let lastName;
    let age;
    let birth;
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
          birth = item.value;
          age = Math.floor((Date.now() - new Date(birth).getTime()) / 1000 / 3600 / 8760);
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
          lat = item.value.center.lat;
          lng = item.value.center.lng;
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
        },
        body: JSON.stringify({
          'x-auth-token': sessionStorage.getItem('x-auth-token'),
          fname: firstName,
          lname: lastName,
          birth: birth,
          gender: gender,
          orientation: sexPreference,
          interests: interests,
          bio: bio,
          latitude: lat,
          longitude: lng
        })
      });
      console.log(lat, lng);

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
          birth: birth,
          gender: gender,
          orientation: sexPreference,
          bio: bio,
          interests: interests,
          latitude: lat,
          longitude: lng
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
