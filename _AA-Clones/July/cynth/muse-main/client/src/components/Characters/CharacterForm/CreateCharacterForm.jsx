import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FreeSoloCreateOptionDialog from '../../Material-UI/FreeSoloCreateOptionDialog';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CreateCharacterHeader from './CreateCharacterHeader';
import { SET_TRAITS } from '../../../store/constants/constants';
import { compare } from '../../../utilities';
import { clearForm } from '../../../store/actions/createCharacters';
import { setStatus } from '../../../store/actions/utilities';
import theme from '../../theme';
import ImageBio from './ImageBioCreate';

//**********************************************************

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around',
    height: '100%',
    width: '100%',
    backgroundColor: 'var(--background-color)',
  },
  cc__title: {
    margin: '10px auto',
    // fontFamily: 'var(--font-display-text)',
    fontSize: 17,
    fontWeight: 'bold',
  },
  characterBio: {
    margin: '20px 0',
  },
  header: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    opacity: '1',
  },
  button: {
    maxHeight: '30px',
    margin: 'auto 7px',
  },
  traits: {
    width: '90%',
  },
}));

//**********************************************************

export default function CreateCharacterForm({ header, imgBio = true }) {
  const classes = useStyles(theme);

  // *** Redux ***
  const traits = useSelector((state) => state.traits);
  const token = useSelector((state) => state.authentication.token);
  const dispatch = useDispatch();

  // *** Use Effect Hooks ***

  // Fetch Character Traits on init render of component
  useEffect(() => {
    const fetchTraits = async () => {
      const response = await fetch('api/traits', {
        'Content-Type': 'application/json',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const { payload } = await response.json();
        dispatch({ type: SET_TRAITS, payload });
      }
    };

    fetchTraits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // *** Helper Functions ***

  // Clear form on click
  const handleClearClick = () => dispatch(clearForm());

  // Close Success Candy Bar
  const handleClose = (event, reason) => {
    dispatch(setStatus(null));
  };

  // *** JSX ***
  return (
    <div className={classes.container}>
      
      <CreateCharacterHeader clear={handleClearClick} close={handleClose} />

      <FreeSoloCreateOptionDialog
        key='1'
        typeLabel='First Name'
        className={classes.traits}
        traitType='firstName'
        traits={traits.firstName ? Object.values(traits.firstName).sort(compare) : null}
      />

      <FreeSoloCreateOptionDialog
        key='2'
        typeLabel='Last Name'
        className={classes.traits}
        traitType='lastName'
        traits={traits.lastName ? Object.values(traits.lastName).sort(compare) : null}
      />

      <FreeSoloCreateOptionDialog
        key='3'
        typeLabel='Identifying Characteristics'
        className={classes.traits}
        traitType='physical'
        traits={traits.physical ? Object.values(traits.physical).sort(compare) : null}
      />

      <FreeSoloCreateOptionDialog
        key='4'
        typeLabel='Character Strengths'
        className={classes.traits}
        traitType='strengths'
        traits={traits.strengths ? Object.values(traits.strengths).sort(compare) : null}
      />

      <FreeSoloCreateOptionDialog
        key='5'
        typeLabel='Character Weaknesses'
        className={classes.traits}
        traitType='weaknesses'
        traits={traits.weaknesses ? Object.values(traits.weaknesses).sort(compare) : null}
      />

      <FreeSoloCreateOptionDialog
        key='6'
        typeLabel='Motivations'
        className={classes.traits}
        traitType='motivations'
        traits={
          traits.motivations ? Object.values(traits.motivations).sort(compare) : null
        }
      />

      <FreeSoloCreateOptionDialog
        key='7'
        typeLabel='Secrets'
        className={classes.traits}
        traitType='secrets'
        traits={traits.secrets ? Object.values(traits.secrets).sort(compare) : null}
      />

      {imgBio && <ImageBio />}
    </div>
  );
}
