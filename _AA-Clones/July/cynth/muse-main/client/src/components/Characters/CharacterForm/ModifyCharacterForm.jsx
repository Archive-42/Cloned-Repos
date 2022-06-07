import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import makeStyles from '@material-ui/core/styles/makeStyles';

import ModifyCharacterHeader from './ModifyCharacterHeader';
import { compare } from '../../../utilities';
import theme from '../../theme';
import ImageBio from './ImageBioCreate';
import ModifyFreeSolo from '../../Material-UI/ModifyFreeSolo';

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

export default function CharacterForm() {
  const classes = useStyles(theme);

  // *** Redux ***
  const traits = useSelector((state) => state.traits);
  

  // *** JSX ***
  return (
    <div className={classes.container}>
    
      <ModifyCharacterHeader />

      <ModifyFreeSolo
        key='1'
        typeLabel='First Name'
        className={classes.traits}
        traitType='firstName'
        traits={traits.firstName ? Object.values(traits.firstName).sort(compare) : null}
      />

      <ModifyFreeSolo
        key='2'
        typeLabel='Last Name'
        className={classes.traits}
        traitType='lastName'
        traits={traits.lastName ? Object.values(traits.lastName).sort(compare) : null}
      />

      <ModifyFreeSolo
        key='3'
        typeLabel='Identifying Characteristics'
        className={classes.traits}
        traitType='physical'
        traits={traits.physical ? Object.values(traits.physical).sort(compare) : null}
      />

      <ModifyFreeSolo
        key='4'
        typeLabel='Character Strengths'
        className={classes.traits}
        traitType='strengths'
        traits={traits.strengths ? Object.values(traits.strengths).sort(compare) : null}
      />

      <ModifyFreeSolo
        key='5'
        typeLabel='Character Weaknesses'
        className={classes.traits}
        traitType='weaknesses'
        traits={traits.weaknesses ? Object.values(traits.weaknesses).sort(compare) : null}
      />

      <ModifyFreeSolo
        key='6'
        typeLabel='Motivations'
        className={classes.traits}
        traitType='motivations'
        traits={
          traits.motivations ? Object.values(traits.motivations).sort(compare) : null
        }
      />

      <ModifyFreeSolo
        key='7'
        typeLabel='Secrets'
        className={classes.traits}
        traitType='secrets'
        traits={traits.secrets ? Object.values(traits.secrets).sort(compare) : null}
      />

      <ImageBio />
      
    </div>
  );
}
