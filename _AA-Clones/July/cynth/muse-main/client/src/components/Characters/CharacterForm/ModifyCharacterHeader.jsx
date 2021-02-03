import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import makeStyles from '@material-ui/core/styles/makeStyles';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { setStatus } from '../../../store/actions/utilities';
import { patchCharacter, deleteCharacter } from '../../../store/actions/characters';
import theme from '../../theme';

const useStyles = makeStyles((theme) => ({
  cc__title: {
    margin: '10px auto',
    fontSize: 17,
    fontWeight: 'bold',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.light,
    opacity: '1',
    height: 50,
  },
  button: {
    maxHeight: '30px',
    margin: 'auto 7px',
  },
  delete: {
    maxHeight: '30px',
    margin: 'auto 7px',
    color: 'white',
    backgroundColor: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
}));

export default function CharacterFormHeader() {
  const classes = useStyles(theme);

  // *** Redux ***
  const id = useSelector((state) => state.modifyCharacter?.id);
  const traitIds = useSelector((state) => state.modifyCharacter?.traits);
  const imageUrl = useSelector((state) => state.modifyCharacter?.imageUrl);
  const bio = useSelector((state) => state.modifyCharacter?.bio);
  const status = useSelector((state) => state.utilities.status);
  const allCharacters = useSelector((state) => state.allCharacters);
  const dispatch = useDispatch();

  // *** Use Effect Hooks ***
  const statusIsDeleted = status === 'deleted';
  useEffect(() => {}, [statusIsDeleted]);

  // *** Helper Functions ***

  const findUpdatedTraits = (oldCharacter) => {
    const character = { id: oldCharacter.id, oldTraits: [], newTraits: [] };

    if (oldCharacter.imageUrl !== imageUrl) character.imageUrl = imageUrl;
    if (oldCharacter.bio !== bio) character.bio = bio;

    for (const [traitType, modTraitId] of Object.entries(traitIds)) {
      if (oldCharacter.traits[traitType] !== modTraitId) {
        character.oldTraits.push(oldCharacter.traits[traitType]);
        character.newTraits.push(modTraitId);
      }
    }

    return character;
  };

  // Post Character Traits and Info to the Backend
  const handleUpdateClick = () => {
    const character = findUpdatedTraits(allCharacters[id]);
    dispatch(patchCharacter(character));
  };

  const handleDeleteClick = () => {
    if (!id) return;

    dispatch(deleteCharacter(id));
  };

  // Close Success Candy Bar
  const handleClose = (event, reason) => {
    dispatch(setStatus(null));
  };

  // *** JSX ***

  return (
    <div className={classes.header} style={{ opacity: 1 }}>
      <Button
        className={classes.delete}
        startIcon={<DeleteForeverIcon />}
        variant='contained'
        disableElevation
        onClick={handleDeleteClick}>
        Delete
      </Button>

      <h3 className={classes.cc__title}>Modify a Character</h3>

      <Button
        variant='contained'
        color='secondary'
        className={classes.button}
        startIcon={<SaveAltIcon />}
        onClick={handleUpdateClick}
        disableElevation>
        Update
      </Button>

      <ClickAwayListener onClickAway={handleClose} >
        <Snackbar
          open={status === 'deleted' || status === 'updated'}
          autoHideDuration={2000}
          onClose={handleClose}>
          <Alert elevation={6} variant='filled' onClose={handleClose} severity='success'>
            {`Your character has been successfully ${status}`}
          </Alert>
        </Snackbar>
      </ClickAwayListener>
    </div>
  );
}
