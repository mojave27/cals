import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ThemeContext from '../../context/ThemeContext'
import CardioForm from './CardioForm'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    // backgroundColor: theme.color5.hex,
    // color: theme.color5_text.hex
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CardioFormDialog = props => {
  const theme = useContext(ThemeContext)
  const classes = useStyles(theme);
  const { open, onClose, saveWorkout } = props

  const handleSave = workout => {
    saveWorkout(workout)
    onClose()
  };

  const handleClose = () => {
    onClose()
  };

  return (
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Create Workout
            </Typography>
          </Toolbar>
        </AppBar>

        <CardioForm saveWorkout={handleSave} />

      </Dialog>
  );
}

export default CardioFormDialog
