import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import ListAltIcon from '@material-ui/icons/ListAlt'
import { blue } from '@material-ui/core/colors';
import { green } from '@material-ui/core/colors';

import ThemeContext from '../../context/ThemeContext'

const EXISTING = 'Choose Existing'
const NEW = 'Create New'

const useStyles = makeStyles(theme => ({
  avatarExisting: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  avatarNew: {
    backgroundColor: green[100],
    color: green[600],
  },
  dialogBar: {
    backgroundColor: green[100],
    color: green[600],
  }
}))

const ProgramWorkoutDialog = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  const { onClose, onSelect, open } = props;

  const handleClose = () => {
    onClose();
  }

  const handleListItemClick = (value) => {
    onSelect(value);
  }

  return (
    <Dialog onClose={handleClose} open={open} style={{backgroundColor: '#333'}}>
      <DialogTitle id="simple-dialog-title">Choose Workout</DialogTitle>
      <List>
          <ListItem button onClick={() => handleListItemClick(EXISTING)} key={EXISTING}>
            <ListItemAvatar>
              <Avatar className={classes.avatarExisting}>
                <ListAltIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={EXISTING} />
          </ListItem>
        <ListItem autoFocus button onClick={() => handleListItemClick(NEW)}>
          <ListItemAvatar>
            <Avatar className={classes.avatarNew}>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={NEW} />
        </ListItem>
      </List>
    </Dialog>
  );
}

ProgramWorkoutDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string
}

export default ProgramWorkoutDialog
