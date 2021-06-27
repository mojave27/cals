import React, { useContext } from 'react'
import ThemeContext from 'context/ThemeContext'
import { makeStyles } from '@material-ui/core/styles'
import { Button, IconButton, Tooltip } from '@material-ui/core'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import WorkoutTableMobile from 'components/workouts/WorkoutTableMobile'
import WorkoutTableDesktop from 'components/workouts/WorkoutTableDesktop'
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

  const deleteWorkout = () => {
    props.deleteWorkout()
  }

  return (
    <div className={classes.root}>
      {context.mobile === true ? (
        <React.Fragment>
          <Tooltip title='Delete Workout'>
            <IconButton aria-label='delete' onClick={deleteWorkout}>
              <DeleteIcon color='inherit' style={{ margin: '1px' }} />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      ) : (
        <ButtonGroup
          size='small'
          orientation={'horizontal'}
          variant='outlined'
          style={{ margin: '10px' }}
        >
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
