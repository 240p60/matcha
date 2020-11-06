import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAuth } from '../../store/actions';

import { Avatar, Typography, Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

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

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const actionSignIn = useCallback(
    (mail, password, loadingText) => {
      dispatch(fetchAuth(mail, password, loadingText));
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

  async function actionSingIn(event) {
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
      actionSignIn(
        inputs.mail.value,
        inputs.password.value,
        'Попытка авторизации'
      );
    } else setInputValue(newInputs);
  }

  return (
    <div className={`${classes.paper} form__block form__block-signIn`}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography className={classes.typography} component="h1" variant="h5">
        Sign In
      </Typography>
      <form action="" method="POST" name="signIn">
        {Object.keys(inputs).map((item, index) => {
          return (
            <Input
              key={index}
              focus={index === 0 ? true : false}
              input={inputs[item]}
              name={item}
              onChange={changeValue}
            />
          );
        })}
        <div className="description">
          We need your mail to get you signed in
        </div>
        <Button
          onClick={actionSingIn}
          type="submit"
          subClass="submit"
          text="Sign In"
        />
        <Grid container className="actions">
          <Grid item xs>
            <Link className="red-link" to="/">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link className="green-link" to="/signUp">
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
