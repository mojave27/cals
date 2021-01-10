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
import { findIndexOfStringId } from '../ArrayUtils'
import WorkoutList from './WorkoutList'

const Workouts = props => {
  let woContext = useContext(WoContext)
  const [showWorkoutDialog, setShowWorkoutDialog] = useState(false)

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

  const editWorkout = async id => {
    await setSelectedWorkoutToContext(id)
    toggleDialog()
  }

  const saveWorkout = async workout => {
    await woContext.saveWorkoutInWorkoutsList(workout)
    toggleDialog()
  }

  const deleteWorkout = async id => {
    await deleteWorkoutApi(id)
    fetchWorkouts()
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
      <FormButton value={'Add Workout'} onClick={addWorkout} />
      {woContext.workouts.length > 0 ? (
          <WorkoutList 
            workouts={woContext.workouts} 
            deleteWorkout={deleteWorkout}
            editWorkout={editWorkout}
            disabled={false}
          />
      ) : (
        <BasicSpinner show={true} />
      )}
    </React.Fragment>
  )
}

export default Workouts
