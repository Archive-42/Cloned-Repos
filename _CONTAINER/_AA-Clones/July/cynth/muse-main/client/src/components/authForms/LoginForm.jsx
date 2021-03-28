import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { login } from '../../store/authentication';
// import './auth.css';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import theme from '../theme';
import Button from '@material-ui/core/Button';

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
    margin: '10px 0'
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
  const [password, setPassword] = useState('');
  // const token = useSelector((state) => state.authentication.token);
  const dispatch = useDispatch();
  const classes = useStyles(theme)
  
  
  const handleClick = () => {
    dispatch(login(username, password));
  };
  
  const handleDemoClick = () => {
    dispatch(login('Demo-lition', 'password'));
  };

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  // if (token) {
  //   return <Redirect to='/' />;
  // }
  
  return (
    <div className={classes.wrapper}>
      
      <h1 className={classes.title}>Muse</h1>
      <h1 className={classes.subTitle}>Welcome Back</h1>
    
      <TextField 
        label="Username" 
        variant="outlined" 
        value={username}
        className={classes.textField}
        onChange={updateProperty(setUsername)} />
      
      <TextField 
        label="Password" 
        variant="outlined" 
        value={password}
        className={classes.textField}
        type='password'
        onChange={updateProperty(setPassword)} />
      
      <div className={classes.button_wrapper}>
        <Button 
          onClick={handleClick} 
          variant='contained'
          color='primary'
          disableElevation
          className={classes.buttons}
        >Login
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
      
      {/* <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={updateProperty(setUsername)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={updateProperty(setPassword)}
        />
        <button type='submit'>Login</button>
      </form> */}
    </div>
  )
};

export default LoginForm;