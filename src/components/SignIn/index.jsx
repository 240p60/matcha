import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../Context'

import { Avatar, Typography, Grid } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import Button from '../Button'
import Input from '../Input'

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

export default function SignIn () {
  const classes = useStyles();
  const { users, setUsers } = useContext(Context);

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
      pattern: /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[a-z0-9A-Z]{6,14}$/,
      error: false,
      helperText: "Enter 6 to 14 letters in upper or lower case and '.'"
    }
  ]);

  function changeValue(type, data, value) {
    const newData = data.map(item => {
      if (item.type === type)
        item.value = value;
      return item;
    })
    setInputValue(newData);
  }

  function addNewUser() {
    setInputValue(inputs.map((item) => {
      if (!(item.pattern.test(item.value)))
        item.error = true;
      else
        item.error = false;
      return item;
    }));
    // fetch("http://localhost:3000/users", {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     mail: inputs[0].value,
    //     password: inputs[1].value
    //   })
    // })
    // .then(res => {
    //   if (!res.ok) throw Error(res.statusText);
    //   return res.json()
    // })
    // .then(data => setUsers(data))
    // .catch(err => console.log(err))
  }

  return (
    <div className={`${classes.paper} authorization`}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <form action="" method="POST" name="phone_authorization">
        <Context.Provider value={{
          inputs,
          changeValue
        }}>
          {inputs.map((item, index) => {
            return <Input key={index} focus={index === 0 ? true : false} inputName={item.name}/>
          })}
        </Context.Provider>
        <div className="description">
          We need your mail to get you signed in
        </div>
        <Button onClick={addNewUser} type="submit" text="Sign In" />
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

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function SignIn() {
//   const classes = useStyles();

//   return (
//     <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign in
//         </Typography>
//         <form className={classes.form} noValidate>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//           />
//           <FormControlLabel
//             control={<Checkbox value="remember" color="primary" />}
//             label="Remember me"
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Sign In
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link href="#" variant="body2">
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//   );
// }