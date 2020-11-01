import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Context } from '../../Context';
import { fetchUpdateUser } from '../../store/actions';

import { Typography } from '@material-ui/core';
import {
  Input,
  Button,
  InputDate,
  InputOptions,
  PictureSlider,
  Radio,
  Checkbox,
  MapComponent,
  Textarea,
} from '../index';
import { makeStyles } from '@material-ui/core/styles';

import Male from '../../assets/img/male.svg';
import Female from '../../assets/img/female.svg';

import './ProfileInfo.scss';

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
    fontFamily: 'Montserrat',
  },
}));

export default function ProfileInfo() {
  const dispatch = useDispatch();
  const { user, fetchUser, photos } = React.useContext(Context);
  console.warn(photos);
  const classes = useStyles();
  const gender = user.gender;
  const sex =
    user.orientation === 'bi'
      ? 'bi'
      : user.orientation === 'homo'
      ? gender
      : gender === 'female'
      ? 'male'
      : 'female';
  const location = {
    center: {
      lat: user.latitude,
      lng: user.longitude,
    },
    zoom: 11,
  };

  const [inputs, setInputValue] = React.useState({
    file: {
      type: 'file',
      name: 'Photos',
      value: user.file,
      error: false,
      helperText: '',
    },
    fname: {
      type: 'text',
      name: 'First Name',
      value: user.fname,
      error: false,
      helperText: 'First Name must be longer than 2 characters',
      placeholder: 'First Name',
    },
    lname: {
      type: 'text',
      name: 'Last Name',
      value: user.lname,
      error: false,
      helperText: 'Last Name must be longer than 2 characters',
      placeholder: 'Last Name',
    },
    date: {
      type: 'date',
      name: 'Date of Birth',
      value: user.birth,
      error: false,
      helperText: 'You are under 18 years old',
      placeholder: 'DD/MM/YYYY',
    },
    genderMale: {
      type: 'radio',
      name: 'Gender',
      text: 'Male',
      image: Male,
      value: gender === 'male' ? true : false,
    },
    genderFemale: {
      type: 'radio',
      name: 'Gender',
      text: 'Female',
      image: Female,
      value: gender === 'female' ? true : false,
    },
    sexPreferenceMale: {
      type: 'checkbox',
      name: 'Sex Preference',
      text: 'Male',
      error: false,
      helperText: 'Choose at least one preference',
      image: Male,
      value: sex === 'bi' || sex === 'male' ? true : false,
    },
    sexPreferenceFemale: {
      type: 'checkbox',
      name: 'Sex Preference',
      text: 'Female',
      error: false,
      helperText: 'Choose at least one preference',
      image: Female,
      value: sex === 'bi' || sex === 'female' ? true : false,
    },
    interests: {
      type: 'options',
      name: 'Interests',
      error: false,
      helperText: 'Choose min 3 interests',
      value: user.interests,
    },
    bio: {
      type: 'textarea',
      name: 'Biography',
      error: false,
      helperText: 'Empty value',
      value: user.bio,
    },
    map: {
      type: 'map',
      name: 'map',
      value: location,
    },
  });

  React.useEffect(() => {
    setInputValue({
      ...inputs,
      file: { ...inputs.file, value: photos },
      fname: { ...inputs.fname, value: user.fname },
      lname: { ...inputs.lname, value: user.lname },
      date: { ...inputs.date, value: user.birth },
      genderMale: {
        ...inputs.genderMale,
        value: gender === 'male' ? true : false,
      },
      genderFemale: {
        ...inputs.genderFemale,
        value: gender === 'female' ? true : false,
      },
      sexPreferenceMale: {
        ...inputs.sexPreferenceMale,
        value: sex === 'bi' || sex === 'male' ? true : false,
      },
      sexPreferenceFemale: {
        ...inputs.sexPreferenceFemale,
        value: sex === 'bi' || sex === 'female' ? true : false,
      },
      interests: { ...inputs.interests, value: user.interests },
      bio: { ...inputs.bio, value: user.bio },
      map: { ...inputs.map, value: location },
    });
  }, [user]);

  const actionUpdateUser = React.useCallback(
    (data) => {
      dispatch(fetchUpdateUser(data));
    },
    [dispatch]
  );

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
    let newInputs = { ...inputs };
    Object.keys(inputs).map((item) => {
      switch (inputs[item].name) {
        case 'First Name':
          if (inputs[item].value.length < 2) {
            newInputs[item] = { ...inputs[item], error: true };
            errors = true;
          } else {
            newInputs[item] = { ...inputs[item], error: false };
            firstName = inputs[item].value;
          }
          break;
        case 'Last Name':
          if (inputs[item].value.length < 3) {
            newInputs[item] = { ...inputs[item], error: true };
            errors = true;
          } else {
            newInputs[item] = { ...inputs[item], error: false };
            lastName = inputs[item].value;
          }
          break;
        case 'Gender':
          if (inputs[item].value === true)
            gender = inputs[item].text.toLowerCase();
          break;
        case 'Sex Preference':
          if (inputs[item].value === true) {
            sexPreference += inputs[item].text.toLowerCase();
          } else if (sexPreference === '' && inputs[item].text === 'Female') {
            newInputs[item] = { ...inputs[item], error: true };
            errors = true;
          } else newInputs[item] = { ...inputs[item], error: false };
          break;
        case 'Date of Birth':
          birth = inputs[item].value;
          age = Math.floor(
            (Date.now() - new Date(birth).getTime()) / 1000 / 3600 / 8760
          );
          if (age < 18) {
            newInputs[item] = { ...inputs[item], error: true };
            errors = true;
          } else newInputs[item] = { ...inputs[item], error: false };
          break;
        case 'Interests':
          if (inputs[item].value.length < 3) {
            newInputs[item] = { ...inputs[item], error: true };
            errors = true;
          } else {
            newInputs[item] = { ...inputs[item], error: false };
            interests = inputs[item].value;
          }
          break;
        case 'Biography':
          if (inputs[item].value === '') {
            newInputs[item] = { ...inputs[item], error: true };
            errors = true;
          } else {
            newInputs[item] = { ...inputs[item], error: false };
            bio = inputs[item].value;
          }
          break;
        case 'map':
          lat = inputs[item].value.center.lat;
          lng = inputs[item].value.center.lng;
          break;
        default:
          return null;
      }
      return null;
    });

    if (!errors) {
      if (sexPreference === 'malefemale') {
        sexPreference = 'bi';
      } else if (sexPreference === '') {
        errors = true;
      } else if (sexPreference === gender) {
        sexPreference = 'homo';
      } else sexPreference = 'hetero';

      actionUpdateUser({
        fname: firstName,
        lname: lastName,
        birth: birth,
        gender: gender,
        orientation: sexPreference,
        interests: interests,
        bio: bio,
        avaID: photos[user.uid][0].pid,
        latitude: lat,
        longitude: lng,
      });
    } else setInputValue(newInputs);
  }

  function changeValue(name, value) {
    const newData =
      inputs[name].type === 'radio'
        ? {
            ...inputs,
            genderMale: {
              ...inputs.genderMale,
              value: !inputs.genderMale.value,
            },
            genderFemale: {
              ...inputs.genderFemale,
              value: !inputs.genderFemale.value,
            },
          }
        : {
            ...inputs,
            [name]: { ...inputs[name], value: value },
          };
    setInputValue(newData);
  }

  return (
    <div className={`${classes.paper} form__block form__block-profile_info`}>
      <form action="/profile" className="profileForm">
        <Typography className={classes.typography} component="h1" variant="h5">
          Add Information
        </Typography>
        <div className="inputs_container">
          {Object.keys(inputs).map((item, index) => {
            if (inputs[item].type === 'file') {
              return (
                <PictureSlider
                  key={index}
                  name={item}
                  input={inputs[item]}
                  uid={user.uid}
                  volatile
                />
              );
            } else if (inputs[item].type === 'date') {
              return (
                <InputDate
                  key={index}
                  name={item}
                  focus={index === 0 ? true : false}
                  input={inputs[item]}
                  onChange={changeValue}
                />
              );
            } else if (inputs[item].type === 'radio') {
              return (
                <Radio
                  key={index}
                  name={item}
                  index={index}
                  focus={index === 0 ? true : false}
                  input={inputs[item]}
                  image={inputs[item].text === 'Male' ? Male : Female}
                  onChange={changeValue}
                />
              );
            } else if (inputs[item].type === 'checkbox') {
              return (
                <Checkbox
                  key={index}
                  name={item}
                  index={index}
                  focus={index === 0 ? true : false}
                  input={inputs[item]}
                  image={inputs[item].text === 'Male' ? Male : Female}
                  onChange={changeValue}
                />
              );
            } else if (inputs[item].type === 'options') {
              return (
                <InputOptions
                  key={index}
                  name={item}
                  input={inputs[item]}
                  onChange={changeValue}
                />
              );
            } else if (inputs[item].type === 'textarea') {
              return (
                <Textarea
                  key={index}
                  name={item}
                  input={inputs[item]}
                  onChange={changeValue}
                />
              );
            } else if (inputs[item].type === 'map') {
              return (
                <MapComponent
                  key={index}
                  name={item}
                  input={inputs[item]}
                  onChange={changeValue}
                ></MapComponent>
              );
            } else {
              return (
                <Input
                  key={index}
                  name={item}
                  focus={index === 0 ? true : false}
                  input={inputs[item]}
                  onChange={changeValue}
                />
              );
            }
          })}
        </div>
        <Button
          onClick={addProfileInfo}
          text="Save"
          type="submit"
          subClass="submit"
        />
        {fetchUser.error === 401 && (
          <div className="form__block-error">
            User not authorized
            <br />
            <Link className="red-link" to="/signIn">
              Sing in
            </Link>
          </div>
        )}
      </form>
      {user.fname.value !== '' && (
        <div className="form__block-info">
          <Link className="green-link" to="/user/page">
            Go to user page
          </Link>
        </div>
      )}
    </div>
  );
}
