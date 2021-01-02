import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import WorkoutList from '../workouts/WorkoutList'
import { retrieve as retrieveWorkouts } from '../../api/workoutsApi'
import ProgramContext from '../../context/ProgramContext'
import ThemeContext from '../../context/ThemeContext'
import { retrieveItemByStringId } from '../ArrayUtils'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const WorkoutListDialog = props => {
  const theme = useContext(ThemeContext)
  const programContext = useContext(ProgramContext)
  const classes = useStyles(theme)

  const [ workouts, setWorkouts ] = useState([])

  useEffect(() => {
    async function fetchData() {
      const allWorkouts = await retrieveWorkouts()
      setWorkouts(allWorkouts)
    }

    fetchData()
    return () => { }
  }, [])

  const handleClose = () => {
    if (props.onClose) props.onClose()
  }

  const selectWorkout = async (workoutId) => {
    let workout = retrieveItemByStringId(workoutId, workouts)
    await programContext.addWorkout(workout)
  }

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Choose Workout(s)
          </Typography>
          <Button autoFocus color='inherit' onClick={handleClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <WorkoutList workouts={workouts} onClick={selectWorkout} />
    </Dialog>
  )
}

export default WorkoutListDialog