import React, { useContext, useState, useEffect } from 'react'
import { emptyWorkout } from '../../context/WoProvider'
import WoContext from '../../context/WoContext'
import BasicSpinner from '../spinners/BasicSpinner'
import {
  retrieve as retrieveWorkouts,
  deleteWorkout as deleteWorkoutApi
} from '../../api/workoutsApi'
import WorkoutFormDialog from './WorkoutFormDialog'
import FormButton from '../inputs/FormButton'
import { findIndexOfStringId } from '../modules/common/utilties/ArrayUtils'
import WorkoutList from './WorkoutList'

const Workouts = props => {
  let woContext = useContext(WoContext)
  const [showWorkoutDialog, setShowWorkoutDialog] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    fetchWorkouts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchWorkouts = async () => {
    const response = await retrieveWorkouts()
    woContext.updateWorkouts(response)
  }

  const toggleDialog = () => {
    setShowWorkoutDialog(!showWorkoutDialog)
  }

  const addWorkout = () => {
    woContext.updateWorkout(emptyWorkout)
    toggleDialog()
  }

  const copyWorkout = async id => {
    woContext.copyWorkout(id)
    toggleDialog()
  }

  const editWorkout = async id => {
    await setSelectedWorkoutToContext(id)
    toggleDialog()
  }

  const saveWorkout = async workout => {
    await woContext.saveWorkoutInWorkoutsList(workout)
    toggleDialog()
  }

  const deleteWorkout = async id => {
    setShowSpinner(true)
    await deleteWorkoutApi(id)
    await fetchWorkouts()
    setShowSpinner(false)
  }

  const setSelectedWorkoutToContext = workoutId => {
    let index = findIndexOfStringId(workoutId, woContext.workouts)
    if (index > -1) {
      woContext.updateWorkout(woContext.workouts[index])
    }
  }

  return (
    <React.Fragment>
      <WorkoutFormDialog
        open={showWorkoutDialog}
        onClose={toggleDialog}
        saveWorkout={saveWorkout}
      />
      <BasicSpinner show={showSpinner} />
      <FormButton value={'Add Workout'} onClick={addWorkout} />
      {woContext.workouts.length > 0 ? (
          <WorkoutList 
            workouts={woContext.workouts} 
            deleteWorkout={deleteWorkout}
            editWorkout={editWorkout}
            copyWorkout={copyWorkout}
            disabled={false}
          />
      ) : (
        <BasicSpinner show={true} />
      )}
    </React.Fragment>
  )
}

export default Workouts
