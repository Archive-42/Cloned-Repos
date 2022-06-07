import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

const useRowStyles = makeStyles({
  book_icon: {
    color: '#9e9e9e',
    height: 20
  },
  down: {
    width: 20,
    color: 'gray'
  },
  heading: {
    fontWeight: 'normal',
    fontSize: 12,
    color: 'gray'
  },

  hidden: {
    visibility: "hidden"
  },

  icon_button: {
    padding: 10
  },

  menu_item: {
    fontSize: 12
  },

  more_horiz: {
    fontSize: 15,
    // backgroundColor: 'white'
  },

  note_icon: {
    // transform: "rotate(90deg)",
    paddingRight: 2,
    paddingLeft: 10,
    color: '#9e9e9e',
    height: 20
  },

  root: {
    "& > *": {
      borderBottom: "unset"
    }
  },

  up: {
    width: 20,
    color: 'gray'
  },

});



export default function NbPanelActionButton() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useRowStyles();

  return (
    <>
      <Tooltip className={classes.tooltip} title="More actions" placement="top" arrow>
        <MoreHorizIcon className={classes.more_horiz} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        </MoreHorizIcon>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={classes.menu_item} onClick={handleClose}>Move</MenuItem>
        <MenuItem className={classes.menu_item} onClick={handleClose}>Copy to...</MenuItem>
        <MenuItem className={classes.menu_item} onClick={handleClose}>Duplicate...</MenuItem>
        <MenuItem className={classes.menu_item} onClick={handleClose}>Edit tags</MenuItem>
        <MenuItem className={classes.menu_item} onClick={handleClose}>Note info</MenuItem>
        <MenuItem className={classes.menu_item} onClick={handleClose}>Move to trash</MenuItem>
      </Menu>
    </>
  )
}
