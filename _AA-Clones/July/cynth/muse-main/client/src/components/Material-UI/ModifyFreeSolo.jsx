/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import { setModTrait, postModTrait } from '../../store/actions/traits';



const filter = createFilterOptions();

export default function ModifyFreeSolo(props) {
  // *** Redux ***
  const reduxValueId = useSelector(state => state.modifyCharacter?.traits?.[props.traitType]);
  const traits = useSelector(state => state.traits?.[props.traitType]);
  const status = useSelector(state => state.utilities.status);
  const dispatch = useDispatch();
  
  // *** Local State ***
  const [value, setValue] = useState(traits?.[reduxValueId] || '');
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState({ name: "" });

  
  // *** Use Effect Hooks ***
  useEffect(() => {
    if (value?.new) {
      dispatch(postModTrait(value));
      return;
    }
    
    // Needing lots of guardrails against undefined during loading
    const { name: traitName } = traits?.[reduxValueId] || { name: null }
    
    if (value && value !== traitName) {
      const [{ id }] = Object.values(traits).filter(trait => {
        return trait.name === value.name
      })
      
      dispatch(setModTrait({ type: props.traitType, id }));
    }
    
    if (value === null) dispatch(setModTrait(props.traitType, null))
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  
  useEffect(() => {
    if (status === 'deleted') setValue('')
  }, [status])
  
  useEffect(() => {
    reduxValueId  ?  setValue(traits[reduxValueId].name)  :  setValue('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxValueId])

  
  // *** Helper Functions ***
  
  const handleClose = () => {
    setDialogValue({ name: '', type: '' });

    toggleOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      name: dialogValue.name,
      type: props.traits[0].type,
      new: true,
    });
    handleClose();
  };

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'string') {
      // timeout to avoid instant validation of the dialog's form.
      setTimeout(() => {
        toggleOpen(true);
        setDialogValue({
          name: newValue,
        });
      });
    } else if (newValue && newValue.inputValue) {
      toggleOpen(true);
      setDialogValue({
        name: newValue.inputValue,
        type: props.traits[0].type,
      });
    } else {
      setValue(newValue);
    }
  };

  const filterOptions = (options, params) => {
    const filtered = filter(options, params);

    if (params.inputValue !== '') {
      filtered.push({
        inputValue: params.inputValue,
        name: `Add "${params.inputValue}"`,
      });
    }

    return filtered;
  };

  const getOptionLabel = (option) => {
    if (typeof option === 'number') return;
    if (typeof option === 'string') return option;

    if (option.inputValue) return option.inputValue;

    return option.name;
  };

  
  // *** JSX ***
  return (
    <React.Fragment>
      
      {!props.traits ? null : (
        <Autocomplete
          value={value}
          onChange={handleChange}
          filterOptions={filterOptions}
          id={props.traitType}
          options={props.traits}
          getOptionLabel={getOptionLabel}
          selectOnFocus
          clearOnBlur
          clearOnEscape
          disabled={!reduxValueId}
          handleHomeEndKeys
          renderOption={(option) => option.name}
          style={{ width: '95%', margin: '1% 2%' }}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.typeLabel}
              color='secondary'
              style={{ boxSizing: 'border-box' }}
              variant='standard'
            />
          )}
        />
      )}
      
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <form onSubmit={handleSubmit}>
      
          <DialogTitle id='form-dialog-title'>Add new {props.typeLabel}</DialogTitle>
      
          <DialogContent>
            <DialogContentText>
              Did not see what you were looking for in our list? Please, add it!
            </DialogContentText>
      
            <TextField
              autoFocus
              margin='dense'
              id='name'
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({ ...dialogValue, name: event.target.value })
              }
              label={props.typeLabel}
              type='text'
            />
          </DialogContent>
      
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Add
            </Button>
          </DialogActions>
      
        </form>
      </Dialog>
      
    </React.Fragment>
  );
}
