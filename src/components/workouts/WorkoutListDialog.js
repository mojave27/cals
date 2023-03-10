import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button, Dialog, Slide, Toolbar, IconButton, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import WorkoutList from '../workouts/WorkoutList'
import { retrieve as retrieveWorkouts } from '../../api/workoutsApi'
import { retrieveItemById } from '../modules/common/utilties/ArrayUtils'

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
  const classes = useStyles()

  const [workouts, setWorkouts] = useState([])
  const [selected, setSelected] = useState([])

  useEffect(() => {
    async function fetchData() {
      if (!props.workouts) {
        const allWorkouts = await retrieveWorkouts()
        setWorkouts(allWorkouts)
      } else {
        setWorkouts(props.workouts)
      }
    }

    fetchData()
    return () => {}
  }, [props.workouts])

  const handleClose = () => {
    if (props.onClose) props.onClose()
  }

  const handleSave = () => {
    if (props.onSave) props.onSave(selected)
  }

  const selectWorkout = async workoutId => {
    let workout = retrieveItemById(workoutId, workouts)
    setSelected(prevState => {
      return [...prevState, workout]
    })
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
            edge='end'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Choose Workout(s)
          </Typography>
          <Button autoFocus color='inherit' onClick={handleSave}>
            save
          </Button>
          <Button autoFocus color='inherit' onClick={handleClose}>
            done
          </Button>
        </Toolbar>
      </AppBar>
      <WorkoutList selected={selected} workouts={workouts} onClick={selectWorkout} />
    </Dialog>
  )
}

export default WorkoutListDialog
