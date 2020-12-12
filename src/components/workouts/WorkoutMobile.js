import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
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
  let context = useContext(ThemeContext)
  const classes = useStyles(context)

  const addSet = () => {
    props.addSet()
  }

  const addExercise = () => {
    props.addExercise()
  }

  const showWorkoutChooser = () => {
    props.showWorkoutChooser()
  }

  // const renderExerciseGroups = () => {
  //   return props.wo.exerciseGroups.map((exGroup, index) => {
  //     return (<WorkoutTableMobile 

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
