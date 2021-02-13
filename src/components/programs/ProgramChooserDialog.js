import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Dialog, DialogTitle } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import ListAltIcon from '@material-ui/icons/ListAlt'
import { blue } from '@material-ui/core/colors';
import { green } from '@material-ui/core/colors';

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
  const classes = useStyles()
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
