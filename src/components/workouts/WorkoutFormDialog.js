import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import WoContext from 'context/WoContext'
import WorkoutForm from 'components/workouts/WorkoutForm'
import { addWorkout, updateWorkout } from 'api/workoutsApi'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'sticky',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WorkoutFormDialog = props => {
  const woContext = useContext(WoContext)
  const classes = useStyles();
  const { open, onClose } = props

  const handleSave = async () => {
    let response = {}
    if (woContext.workout.id) {
      response = await updateWorkout(woContext.workout)
    } else {
      response = await addWorkout(woContext.workout)
    }
    // update context because addWorkout will have added an id
    await woContext.updateWorkout(response)

    if (props.saveWorkout) {
      props.saveWorkout(response)
    }
  }

  const handleClose = () => {
    onClose()
  }

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
            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <WorkoutForm saveWorkout={handleSave} />

      </Dialog>
  );
}

export default WorkoutFormDialog
