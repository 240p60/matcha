import React from 'react';
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
  const [input, setValue] = React.useState({
    type: 'text',
    name: 'Auth code',
    value: '',
    error: false,
    helperText: 'Empty Value',
  });
  const dispatch = useDispatch();
  const mail = useSelector((store) => store.mail);

  const actionConfirmMail = React.useCallback(
    (text, token) => {
      dispatch(fetchConfirmMail(text, token));
    },
    [dispatch]
  );

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
      {history.location.pathname === '/confirm/mail' && (
        <>
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
          </form>
        </>
      )}
      <Grid container className="actions" justify="center">
          <Grid item>
            {history.location.pathname === '/confirm/mail' && (
              <Link
                to="/signIn"
                style={{ color: '#000', fontSize: '1rem', lineHeight: '1rem' }}
              >
                Already have an account? <span className="red-link">Sign In</span>
              </Link>
            )}
            {history.location.pathname === '/confirm/mail/fail' && (
              <a
                href='/confirm/mail'
                style={{ color: '#000', fontSize: '1rem', lineHeight: '1rem' }}
              >
                An error has occurred. Try again. <div style={{ textAlign: 'center', marginTop: '10px' }}><span className="red-link">Confirm mail with token</span></div>
              </a>
            )}
            {history.location.pathname === '/confirm/mail/success' && (
              <Link
                to="/signIn"
                style={{ color: '#000', fontSize: '1rem', lineHeight: '1rem' }}
              >
                Mail confirmed successfully! <div style={{ textAlign: 'center', marginTop: '10px' }}><span className="red-link">Sign In</span></div>
              </Link>
            )}
          </Grid>
        </Grid>
    </div>
  );
}
