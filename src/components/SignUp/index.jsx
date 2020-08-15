import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../../Context'

import { Avatar, Typography, Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Input, ConfirmMail } from '../index'

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
    fontFamily: 'Montserrat'
  }
}));

export default function SignUp () {
  const history = useHistory();
  const classes = useStyles();
  const [generalError, setError] = useState("");

  const [inputs, setInputValue] = useState([
    {
      type: 'email',
      name: 'Mail',
      value: '',
      pattern: /^(\w.+)@(\w+)\.(\w+)$/,
      error: false,
      helperText: 'Mail has unexpected symbols'
    },
    {
      type: 'password',
      name: 'Password',
      value: '',
      pattern: /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[$&+,:;=?@#|'<>.^*()%!-])[a-z0-9A-Z$&+,:;=?@#|'<>.-^*()%!-]{6,14}$/,
      error: false,
      helperText: 'Enter 6 to 14 letters in upper and lower case, digits and special character ($&+,:;=?@#|\'<>.^*()%!-)'
    }
  ]);

  function changeValue(name, value) {
    const newData = inputs.map(item => {
      if (item.name === name)
        item.value = value;
      return item;
    })
    setInputValue(newData);
  }

  async function addNewUser(event) {
    event.preventDefault();
    let errors = false;
    const newInputs = inputs.map((item) => {
      if (!(item.pattern.test(item.value))) {
        item.error = true;
        errors = true;
      } else
        item.error = false;
      return item;
    });

    if (!errors) {
      let response = await fetch("http://localhost:3000/user/create/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mail: inputs[0].value,
          pass: inputs[1].value,
        })
      });

      if (response.status === 406) {
        history.push('/confirm/mail');
      } else if (response.status !== 201) {
        throw new Error(await response.json());
      } else {
        history.push('/confirm/mail');
      }
    } else
      setInputValue(newInputs);
  }

  return (
    <div className={`${classes.paper} form__block form__block-signIn`}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography className={classes.typography} component="h1" variant="h5">
        Sign Up
      </Typography>
      {generalError ? 
        <div className="form__block-error">
          {generalError}
        </div>
      : null}
      <form action="" method="POST" name="signUp">
        {inputs.map((item, index) => {
          return <Input key={index} focus={index === 0 ? true : false} input={item} onChange={changeValue}/>
        })}
        <Button onClick={addNewUser} type="submit" subClass="submit" text="Sign Up" />
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