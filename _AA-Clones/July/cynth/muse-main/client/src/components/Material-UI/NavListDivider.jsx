import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  overrides: {
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: "orange",
          },
        },
      },
      button: {
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
        },
      },
    },
  },
  
}));

export default function ListDividers() {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="Create Character" />
      </ListItem>
      <Divider />
      {/* <ListItem button divider>
        <ListItemText primary="Create Scene" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Create Story" />
      </ListItem>
      <Divider light /> */}
    </List>
  );
}