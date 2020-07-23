import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../../Context'

import { Avatar, Typography, Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Input } from '../index'

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

export default function SignIn() {
  let history = useHistory();
  const classes = useStyles();
  const { userInfo, setUserInfo } = useContext(Context);
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

  async function actionSingIn(event) {
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
      let response = await fetch("http://localhost:3000/user/auth/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mail: inputs[0].value,
          passwd: inputs[1].value,
        })
      });

      if (response.status === 202) {
        history.push('/confirm/mail');
      } else if (response.status === 400) {
        setError("Wrong mail or password");
        history.push('/signIn');
      } else if (!response.ok) {
        throw Error(response.statusText);
      } else {
        let data = await response.json();
        sessionStorage.setItem('x-auth-token', data['x-auth-token']);
        setUserInfo(data);
        if (data.fname)
          history.push('user/page');
        else
          history.push('/profile');
      }
    } else setInputValue(newInputs);
  }

  return (
    <div className={`${classes.paper} form__block form__block-signIn`}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      {generalError ? 
        <div className="form__block-error">
          {generalError}
        </div>
      : null}
      <form action="" method="POST" name="signIn">
        {inputs.map((item, index) => {
          return <Input key={index} focus={index === 0 ? true : false} input={item} onChange={changeValue}/>
        })}
        <div className="description">
          We need your mail to get you signed in
        </div>
        <Button onClick={actionSingIn} type="submit" text="Sign In" />
        <Grid container className="actions">
          <Grid item xs>
            <Link className="red-link" to='/'>
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
  )
}