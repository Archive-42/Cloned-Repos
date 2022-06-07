import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import LoginForm from '../../authForms/LoginForm';
import SignUpForm from '../../authForms/SignUpForm';
import theme from '../../theme';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function TransitionsModal(props) {
  const classes = useStyles(theme);
  

  return (
    <div>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.loginOpen || props.signUpOpen}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.loginOpen || props.signUpOpen}>
          <div className={classes.paper}>
          
            {props.loginOpen  ?  <LoginForm />  :  null}
            {props.signUpOpen  ?  <SignUpForm />  :  null}
          
          </div>
        </Fade>
      </Modal>
    </div>
  );
}