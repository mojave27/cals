/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { useState, useEffect } from 'react'
import { retrieve as retrieveWorkouts } from '../../api/workoutsApi'
import WorkoutList from './WorkoutList'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const WorkoutListWrapper = props => {
  const classes = useStyles()
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    fetchWorkouts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchWorkouts = async () => {
    const response = await retrieveWorkouts()
    setWorkouts(response)
  }

  return (
    <Dialog fullScreen open={props.open} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Choose Workout
          </Typography>
        </Toolbar>
      </AppBar>

      <WorkoutList workouts={workouts} onClick={props.onClick} />
    </Dialog>
  )
}

export default WorkoutListWrapper
