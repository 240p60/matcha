import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Avatar, Typography, Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Input } from '../index';
import { fetchConfirmMail } from '../../store/actions';

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
}));

export default function ConfirmMail() {
  const history = useHistory();
  const [input, setValue] = useState({
    type: 'text',
    name: 'Auth code',
    value: '',
    error: false,
    helperText: 'Empty Value',
  });
  const dispatch = useDispatch();
  const actionConfirmMail = useCallback(
    (text, token) => {
      dispatch(fetchConfirmMail(text, token));
    },
    [dispatch]
  );

  const mail = useSelector((store) => store.mail);

  function changeValue(name, value) {
    const newInput = {
      type: 'text',
      name: 'Auth code',
      value: value,
      error: false,
      helperText: 'Empty Value',
    };
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
        helperText: 'Empty Value',
      });
      errors = true;
    } else input.error = false;

    if (!errors) {
      actionConfirmMail('Подтверждаем почту...', input.value);
    }
  }

  React.useEffect(() => {
    if (mail.success) {
      history.push('/signIn');
    }
  }, [history, mail]);

  return (
    <div className={`${classes.paper} form__block form__block-confirm`}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Confirm Mail
      </Typography>
      <form action="" method="POST" name="signUp">
        <Input focus={true} input={input} onChange={changeValue} />
        <div className="description">
          Enter the code that will come to your mail
        </div>
        <Button
          onClick={validateMail}
          subClass="submit"
          type="submit"
          text="Confirm Mail"
        />
        <Grid container className="actions" justify="center">
          <Grid item>
            <Link to="/signIn">
              Already have an account? <span className="red-link">Sign In</span>
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
