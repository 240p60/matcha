import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Avatar, Typography, Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Input, Preloader } from '../index'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }
}));

export default function ConfirmMail() {
  const history = useHistory();
  const [preloader, setPreloader] = useState(false);
  const [generalError, setError] = useState("");
  const [input, setValue] = useState({
    type: 'text',
    name: 'Auth code',
    value: '',
    error: false,
    helperText: 'Empty Value'
  });

  function changeValue(name, value) {
    const newInput = {
      type: 'text',
      name: 'Auth code',
      value: value,
      error: false,
      helperText: 'Empty Value'
    }
    setValue(newInput);
  }

  const classes = useStyles();

  function validateMail(event) {
    event.preventDefault();

    let errors = false;
    if (input.value === '') {
      setValue({
        type: 'text',
        name: 'Auth code',
        value: '',
        error: true,
        helperText: 'Empty Value'
      });
      errors = true;
    } else
      input.error = false;

    if (!errors) {
      fetch("http://localhost:3000/user/update/status/", {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          'x-reg-token': input.value
        })
      })
      .then(res => {
        if (res.status !== 200) {
          setError(`Something went wrong: ${res.status} - ${res.statusText}`);
        } else {
          setPreloader(true);
          setTimeout(() => {
            history.push('/signIn');
          }, 3000)
        }
      })
    }
  }

  return (
    <div className={`${classes.paper} form__block form__block-confirm`}>
      {preloader && <Preloader text="Почта подтверждена. Пожалуйста, совершите вход"/>}
      <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
          Confirm Mail
      </Typography>
      {generalError ? 
        <div className="form__block-error">
          {generalError}
        </div>
      : null}
      <form action="" method="POST" name="signUp">
        <Input focus={true} input={input} onChange={changeValue}/>
        <div className="description">Enter the code that will come to your mail</div>
        <Button onClick={validateMail} subClass="submit" type="submit" text="Confirm Mail" />
        <Grid container className="actions" justify="center">
          <Grid item>
            <Link to='/signIn'>
              Already have an account? <span className="red-link">Sign In</span>
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}