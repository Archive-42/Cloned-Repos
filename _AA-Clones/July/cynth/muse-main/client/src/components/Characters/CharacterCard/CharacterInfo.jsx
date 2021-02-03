import React from 'react';

import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import './character_card.css';
import CharacterTraits from './CharacterTraits';

//***********************************************

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{ width: '100%' }} >
          <Typography variant='body1' component='div'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    border: '2px solid var(--secondary)',
    borderRadius: 10,
    margin: 10
  },
  character_info: {
  },
  header: {
    backgroundColor: theme.palette.primary.transparent,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '40px',
    display: 'flex',
  },
  headerTabs: {
    height: '40px',
    minHeight: '30px',
    border: 'none'
  },
  tab: {
    fontWeight: 'bold',
    height: '40px',
    minHeight: '30px',
  },
  tabPanel: {
    backgroundColor: theme.palette.backgroundColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    display: 'flex',
  },
  traits: {
    height: '100%'
  },
  bioWrapper: {
    display: 'flex',
    minHeight: 100
  },
  bio: {
    height: '100%',
    width: '100%',
  }
  
}));


//***********************************************

export default function CharacterInfo(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  
  
  
  return (
    <div className={classes.root}>
      
      <AppBar position="static" className={classes.header} >
        <Tabs 
          value={value} 
          onChange={handleChange} 
          centered
          className={classes.headerTabs}
          aria-label="simple tabs example"
        >
          <Tab label="Traits" className={classes.tab} {...a11yProps(0)} />
          <Tab label="Bio" className={classes.tab} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      
      <TabPanel value={value} index={0} className={classes.tabPanel} >
        <CharacterTraits props={props.props} className={classes.traits} />
      </TabPanel>
      
      <TabPanel value={value} index={1} className={classes.tabPanel} >
        <div className={classes.bioWrapper} >
          <div className={classes.bio} >{props.props.bio}</div>
        </div>
      </TabPanel>
    
    </div>
  )
}