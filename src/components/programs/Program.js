import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    // width: '40%',
    "&:hover": {
      backgroundColor: "lightgreen",
      boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
    },
  },
  
  container: {
    padding: '2px 16px'
  },

  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

  const Program = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.card}>{props.program.name}
    </div>
  );
}

export default Program