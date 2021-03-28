import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import { login, signUp } from '../../store/authentication';
import theme from '../theme';

const useStyles = makeStyles(theme => ({
  wrapper: {
    minHeight: '400px',
    minWidth: '400px',
    display: 'flex',
    flexFlow: 'column',
  },
  
  title: {
    margin: '40px auto 0px',
    fontFamily: `'Sonsie One', cursive`,
    fontSize: '50px'
  },
  
  subTitle: {
    margin: '40px auto 50px',
    fontSize: '20px'
  },
  
  textField: {
    margin: '10px 0',
    errorText: {
      display: 'table'
    }
  },
  
  button_wrapper: {
    display: 'flex',
    flexFlow: 'column',
  },
  
  buttons: {
    width: '100%',
    minHeight: '40px',
    marginTop: '30px'
  }
  
}))

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState([]);
  // const token = useSelector((state) => state.authentication.token);
  const dispatch = useDispatch();
  const classes = useStyles(theme)
  
  useEffect(() => {}, [errors])

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };
  
  const handleSignUpClick = () => {
    if (password !== confirm) {
      setErrors(['Your passwords did not match. Please try again.']);
      return
    }
    
    const newUser = {
      username,
      email,
      password,
      confirm,
    };
    dispatch(signUp(newUser))
  };
  
  const handleDemoClick = () => {
    dispatch(login('Demo-lition', 'password'));
  };
  
  
  
  // if (token) {
  //   return <Redirect to='/' />;
  // }
  
  return (
    <div className={classes.wrapper}>
      
      <h1 className={classes.title}>Muse</h1>
      <h1 className={classes.subTitle}>Sign Up</h1>
      
      {errors  ?  errors.forEach(error => <Alert severity='error'>{error}</Alert>)  :  null}
      
      <TextField 
        label="Username" 
        variant="outlined" 
        value={username}
        className={classes.textField}
        required
        onChange={updateProperty(setUsername)} />
      
      <TextField 
        label="Email" 
        variant="outlined" 
        value={email}
        className={classes.textField}
        required
        onChange={updateProperty(setEmail)} />
      
      <TextField 
        label="Password" 
        variant="outlined" 
        value={password}
        className={classes.textField}
        type='password'
        required
        onChange={updateProperty(setPassword)} />
      
      <TextField 
        label="Confirm Password" 
        variant="outlined" 
        value={confirm}
        className={classes.textField}
        type='password'
        error={password !== confirm ? true : false}
        helperText={password !== confirm ? 'Passwords do not match' : ''}
        required
        onChange={updateProperty(setConfirm)} />
      
      <div className={classes.button_wrapper}>
        <Button 
          onClick={handleSignUpClick} 
          variant='contained'
          color='primary'
          disableElevation
          className={classes.buttons}
        >Sign Up
        </Button> 
        
        <Button 
          onClick={handleDemoClick} 
          variant='contained'
          color='secondary'
          disableElevation
          className={classes.buttons}
        >Demo
        </Button>
         
      </div>
    </div>
  )
};

export default LoginForm;