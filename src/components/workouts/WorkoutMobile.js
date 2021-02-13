import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { basicButton, basicButtonSmall } from '../../styles/Styles'
import WorkoutTableMobile from './WorkoutTableMobile'

const useStyles = makeStyles(context => ({
  root: {
    flexGrow: 1,
    width: `${context.mobile === true ? '100%' : 'auto'}`
  },
  basicButtonSmall: basicButtonSmall(context),
  basicButton: basicButton(context)
}))

const WorkoutMobile = props => {
  const classes = useStyles()

  const addSet = () => {
    props.addSet()
  }

  const addExercise = () => {
    props.addExercise()
  }

  const showWorkoutChooser = () => {
    props.showWorkoutChooser()
  }

  return (
    <div className={classes.root}>
      <div style={{ margin: 'auto' }}>
        <input
          className={classes.basicButton}
          type='button'
          value='Choose Workout'
          onClick={showWorkoutChooser}
          autoComplete={'off'}
        />
        <input
          style={{ margin: '5px' }}
          type='button'
          value='Add Set'
          className={classes.basicButton}
          onClick={addSet}
          autoComplete={'off'}
        />
        <input
          style={{ margin: '5px' }}
          type='button'
          value='Add Exercise'
          className={classes.basicButton}
          onClick={addExercise}
          autoComplete={'off'}
        />
      </div>

      {/* <div style={{ margin: 'auto' }}>{renderExerciseGroups()}</div> */}
      <WorkoutTableMobile {...props} />
    </div>
  )
}

export default WorkoutMobile
