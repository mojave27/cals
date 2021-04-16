import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import WorkoutTableMobile from './WorkoutTableMobile'

const useStyles = makeStyles(context => ({
  root: {
    flexGrow: 1,
    width: `${context.mobile === true ? '100%' : 'auto'}`
  }
}))

const Workout = props => {
  let context = useContext(ThemeContext)
  const classes = useStyles()

  const addSet = () => {
    props.addSet()
  }

  // const addExercise = () => {
    // props.addExercise()
  // }
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
      {/* {doStuff()} */}
      <ButtonGroup size='small' orientation={context.mobile === true ? 'vertical': 'horizontal'} variant='contained' style={{margin:'10px'}}>
        <Button style={{margin:'1px'}} onClick={showWorkoutChooser}>{'Choose Workout'}</Button>
        <Button style={{margin:'1px'}} onClick={addSet}>{'Add Set'}</Button>
        {/* <Button style={{margin:'1px'}} onClick={addExercise}>{'Add Exercise'}</Button> */}
        <Button style={{margin:'1px'}} onClick={deleteWorkout}>{'Delete Workout'}</Button>
      </ButtonGroup>

      <WorkoutTableMobile {...props} />
    </div>
  )
}

export default Workout
