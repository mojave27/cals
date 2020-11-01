import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  bottom: {
    color: '#1a90ff',
    // animationDuration: '550ms',
    position: 'absolute',
    left: '50%',
    top: '40%'
  }
}));

const BasicSpinner = () => {
  const classes = useStyles();

  return (
    <Container >
      {/* <CircularProgress color="secondary" /> */}
      <CircularProgress 
              className={classes.bottom}
              size={40}
              thickness={4}
              value={100}
      />
    </Container>
  );
}

export default BasicSpinner