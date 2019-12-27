/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import Modal from '../Modal'
import WorkoutList from '../workouts/WorkoutList'
import WorkoutDay from './WorkoutDay'
import { retrieveWorkoutById } from '../../api/workoutsApi'
import {
  basicButton,
  cardNoHover,
  row
} from '../../styles/main-styles'
import { isEmpty } from 'lodash'

const WorkoutTracker = props => {
  const [showWorkoutList, setShowWorkoutList] = useState(false)
  const [selectedWorkout, setSelectedWorkout] = useState({})

  const toggleShowWorkoutList = () => {
    setShowWorkoutList(!showWorkoutList)
  }
  const getDate = () => {
    const timestamp = Number(new Date())
    const date = new Date(timestamp).toDateString()
    return date
  }

  const copyWorkout = () => {}

  const newWorkout = () => {
    toggleShowWorkoutList()
  }

  const handleSelectWorkout = event => {
    let id = event.currentTarget.id
    retrieveWorkoutById(id).then(response => {
      let workoutDay = convertToWorkoutDay(response)
      setSelectedWorkout(workoutDay)
      toggleShowWorkoutList()
    })
  }

  const convertToWorkoutDay = ({id, name, type, sets}) => {
    let workoutDaySets = sets.map( set => {
      let exercises = convertExercises(set.exercises)
      set.exercises = exercises
      return set
    })

    let workoutDay = {
      date: getDate(),
      workoutId: id,
      name: name,
      type: type,
      sets: workoutDaySets
    }
    return workoutDay
  }

  const convertExercises = exercises => {
    return exercises.map( exercise => {
      exercise.targetReps = exercise.reps
      exercise.weight = 0
      exercise.actualReps = 0
      delete exercise.reps
      return exercise
    })
  }

  const updateWorkoutDay = update => {
    console.log(`updateWorkoutDay - ${JSON.stringify(update)}`)
    // update state with the changes.
  }

  return (
    <React.Fragment>
      <Modal showModal={showWorkoutList} handleClose={toggleShowWorkoutList}>
        <WorkoutList selectWorkout={handleSelectWorkout} />
      </Modal>
      <div css={cardNoHover}>
        { isEmpty(selectedWorkout) ? (
          <div css={row}>
            <input
              style={{ margin: '5px' }}
              type='button'
              value='New'
              css={[basicButton, { float: 'left' }]}
              onClick={newWorkout}
            />
            <input
              style={{ margin: '5px' }}
              type='button'
              value='Copy Existing'
              css={[basicButton, { float: 'left' }]}
              onClick={copyWorkout}
            />
          </div>
        ) : (
          <WorkoutDay workout={selectedWorkout} update={updateWorkoutDay} />
        )}
      </div>
    </React.Fragment>
  )
}

export default WorkoutTracker
