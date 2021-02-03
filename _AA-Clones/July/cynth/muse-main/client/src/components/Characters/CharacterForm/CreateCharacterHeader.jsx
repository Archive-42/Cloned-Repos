import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import makeStyles from '@material-ui/core/styles/makeStyles';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import ClearIcon from '@material-ui/icons/Clear';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { postCharacter } from '../../../store/actions/characters';
import theme from '../../theme';

const useStyles = makeStyles((theme) => ({
  cc__title: {
    margin: '10px auto',
    fontSize: 17,
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
  },
  header: {
    display: 'flex',
    backgroundColor: theme.palette.primary.light,
    opacity: '1'
  },
  button: {
    maxHeight: '30px',
    margin: 'auto 7px',
  },
  
}));

export default function CharacterFormHeader(props) {
  const classes = useStyles(theme);
  
  
  // *** Redux ***
  const firstName = useSelector((state) => state.createCharacters.firstName);
  const lastName = useSelector((state) => state.createCharacters.lastName);
  const physical = useSelector((state) => state.createCharacters.physical);
  const strengths = useSelector((state) => state.createCharacters.strengths);
  const weaknesses = useSelector((state) => state.createCharacters.weaknesses);
  const motivations = useSelector((state) => state.createCharacters.motivations);
  const secrets = useSelector((state) => state.createCharacters.secrets);
  const imageUrl = useSelector((state) => state.createCharacters.imageUrl);
  const bio = useSelector(state => state.createCharacters.bio);
  const status = useSelector(state => state.utilities.status);
  const dispatch = useDispatch();
  
  
  //* Post Character Traits and Info to the Backend
  const handleSaveClick = () => {
    const character = {
      firstName,
      lastName,
      physical,
      strengths,
      weaknesses,
      motivations,
      secrets,
      imageUrl,
      bio
    };
    
    dispatch(postCharacter(character));
  };  
  
  
  // *** JSX ***
  
  return (
    <div className={classes.header} style={{ opacity: 1 }}>
      
      <Button
        color='secondary'
        className={classes.button}
        startIcon={<ClearIcon />}
        variant='outlined'
        disableElevation
        onClick={props.clear}
      >
        Clear
      </Button>
      
      <h3 className={classes.cc__title}>Create a New Character</h3>
      
      <Button
        variant='contained'
        color='secondary'
        className={classes.button}
        startIcon={<SaveAltIcon />}
        onClick={handleSaveClick}
        disableElevation
      >
        Save
      </Button>
      
      <ClickAwayListener onClickAway={props.close} >
        <Snackbar open={status === 'success'} autoHideDuration={2000} onClose={props.close}>
          <Alert elevation={6} variant='filled' onClose={props.close} severity="success">
            Your character has been saved!
          </Alert>
        </Snackbar>
      </ClickAwayListener>
      
    </div>
  );
}
