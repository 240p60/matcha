import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Avatar, Typography, Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { fetchSignUp } from '../../store/actions';

import { Button, Input } from '../index';

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
    fontFamily: 'Montserrat',
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const actionSignUp = useCallback(
    (mail, password, loadingText) => {
      dispatch(fetchSignUp(mail, password, loadingText));
    },
    [dispatch]
  );

  const [inputs, setInputValue] = useState({
    mail: {
      type: 'email',
      name: 'Mail',
      value: '',
      pattern: /^(\w.+)@(\w+)\.(\w+)$/,
      error: false,
      helperText: 'Mail has unexpected symbols',
    },
    password: {
      type: 'password',
      name: 'Password',
      value: '',
      pattern: /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[$&+,:;=?@#|'<>.^*()%!-])[a-z0-9A-Z$&+,:;=?@#|'<>.-^*()%!-]{6,14}$/,
      error: false,
      helperText:
        "Enter 6 to 14 letters in upper and lower case, digits and special character ($&+,:;=?@#|'<>.^*()%!-)",
    },
  });

  function changeValue(name, value) {
    const newData = { ...inputs, [name]: { ...inputs[name], value: value } };
    setInputValue(newData);
  }

  async function addNewUser(event) {
    event.preventDefault();
    let errors = false;
    let newInputs = {};
    Object.keys(inputs).map((item) => {
      if (!inputs[item].pattern.test(inputs[item].value)) {
        newInputs[item] = { ...inputs[item], error: true };
        errors = true;
      } else newInputs[item] = { ...inputs[item], error: false };
      return null;
    });

    if (!errors) {
      actionSignUp(
        inputs.mail.value,
        inputs.password.value,
        'Попытка регистрации'
      );
    } else setInputValue(newInputs);
  }

  return (
    <div className={`${classes.paper} form__block form__block-signIn`}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography className={classes.typography} component="h1" variant="h5">
        Sign Up
      </Typography>
      {/* {signUp.error && <div className="form__block-error">{signUp.error}</div>} */}
      <form action="" method="POST" name="signUp">
        {Object.keys(inputs).map((item, index) => {
          return (
            <Input
              name={item}
              key={index}
              focus={index === 0 ? true : false}
              input={inputs[item]}
              onChange={changeValue}
            />
          );
        })}
        <Button
          onClick={addNewUser}
          type="submit"
          subClass="submit"
          text="Sign Up"
        />
        <Grid container className="actions" justify="center">
          <Grid item>
            <Link
              to="/signIn"
              style={{ color: '#000', fontSize: '1rem', lineHeight: '1rem' }}
            >
              Already have an account? <span className="red-link">Sign In</span>
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
