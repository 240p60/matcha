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

export default function SignUp () {
  const history = useHistory();
  const classes = useStyles();
  const { users, setUsers } = useContext(Context);

  const [inputs, setInputValue] = useState([
    {
      type: 'text',
      name: 'First Name',
      value: '',
      pattern: /^(\w{2,12})$/,
      error: false,
      helperText: 'Enter 1 to 12 letters in upper or lower case'
    },
    {
      type: 'text',
      name: 'Last Name',
      value: '',
      pattern: /^(\w{2,12})$/,
      error: false,
      helperText: 'Enter 1 to 12 letters in upper or lower case'
    },
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
      pattern: /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[a-z0-9A-Z]{6,14}$/,
      error: false,
      helperText: 'Enter 6 to 14 letters in upper and lower case and digits'
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

  function addNewUser(event) {
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
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: inputs[0].value,
          lastName: inputs[1].value,
          mail: inputs[2].value,
          password: window.btoa(inputs[3].value)
        })
      })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json()
      })
      .then(data => {
        setUsers(data);
        history.push('/profile');
      })
      .catch(err => console.log(err));
    } else
      setInputValue(newInputs);
  }

  return (
    <div className={`${classes.paper} form__block form__block-signIn`}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <form action="" method="POST" name="signUp">
        {inputs.map((item, index) => {
          return <Input key={index} focus={index === 0 ? true : false} input={item} onChange={changeValue}/>
        })}
        <Button onClick={addNewUser} type="submit" text="Sign Up" />
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