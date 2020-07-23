import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    zIndex: '3',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    width: '100%',
    height: '100%',
    position: 'fixed',
    left: '50%',
    top: '0',
    marginLeft: `-${window.innerWidth / 2}px`,
    backgroundColor: 'white'
  },
  text: {
    fontSize: '20px',
    lineHeight: '24px',
    padding: '0 20px',
    marginBottom: '20px'
  }
}));

export default function Preloader({text}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.text}>{text}</div>
      <CircularProgress color="secondary" />
    </div>
  );
}