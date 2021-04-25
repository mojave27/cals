import React, { useContext } from 'react'
import ThemeContext from 'context/ThemeContext'
import { makeStyles } from '@material-ui/core/styles'
import { Button, IconButton, Tooltip } from '@material-ui/core'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import WorkoutTableMobile from 'components/workouts/WorkoutTableMobile'
import WorkoutTableDesktop from 'components/workouts/WorkoutTableDesktop'
import TouchAppIcon from '@material-ui/icons/TouchApp'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((context) => ({
  root: {
    flexGrow: 1,
    width: `${context.mobile === true ? '100%' : 'auto'}`,
  },
}))

const Workout = (props) => {
  let context = useContext(ThemeContext)
  const classes = useStyles()

  const addSet = () => {
    props.addSet()
  }

  const deleteWorkout = () => {
    props.deleteWorkout()
  }

  const showWorkoutChooser = () => {
    props.showWorkoutChooser()
  }

  // const doStuff = () => {
  //   console.log(JSON.stringify(props.wo))
  // }

  return (
    <div className={classes.root}>
      {context.mobile === true ? (
        // <ButtonGroup
        //   size='small'
        //   orientation={'horizontal'}
        //   variant='contained'
        //   style={{ margin: '10px' }}
        // >
        <React.Fragment>
          <Tooltip title='Choose Workout'>
            <IconButton aria-label='delete' onClick={showWorkoutChooser}>
              <TouchAppIcon color='inherit' style={{ margin: '1px' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Add Set'>
            <IconButton aria-label='delete' onClick={addSet}>
              <AddIcon color='inherit' style={{ margin: '1px' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Workout'>
            <IconButton aria-label='delete' onClick={deleteWorkout}>
              <DeleteIcon color='inherit' style={{ margin: '1px' }} />
            </IconButton>
          </Tooltip>
        </React.Fragment>
        // </ButtonGroup>
      ) : (
        <ButtonGroup
          size='small'
          orientation={'horizontal'}
          variant='outlined'
          style={{ margin: '10px' }}
        >
          <Button style={{ margin: '1px' }} onClick={showWorkoutChooser}>
            {'Choose Workout'}
          </Button>
          <Button style={{ margin: '1px' }} onClick={addSet}>
            {'Add Set'}
          </Button>
          <Button style={{ margin: '1px' }} onClick={deleteWorkout}>
            {'Delete Workout'}
          </Button>
        </ButtonGroup>
      )}

      {context.mobile ? <WorkoutTableMobile {...props} /> : <WorkoutTableDesktop {...props} /> }
    </div>
  )
}

export default Workout
