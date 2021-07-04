import React, { useContext, useState, useEffect } from 'react'
import { emptyWorkout } from 'context/WoProvider'
import WoContext from 'context/WoContext'
import BasicSpinner from 'components/spinners/BasicSpinner'
import {
  retrieve as retrieveWorkouts,
  deleteWorkout as deleteWorkoutApi
} from '../../api/workoutsApi'
import WorkoutFormDialog from 'components/workouts/WorkoutFormDialog'
import FormButton from 'components/inputs/FormButton'
import { findIndexOfStringId } from 'components/modules/common/utilties/ArrayUtils'
import WorkoutList from 'components/workouts/WorkoutList'
import { Grid } from '@material-ui/core'
import StyledLogger, { Style } from 'modules/common/logging/StyledLogger'

const Workouts = props => {
  let woContext = useContext(WoContext)
  const [showWorkoutDialog, setShowWorkoutDialog] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [viewMode, setViewMode] = useState(false)

  useEffect(() => {
    fetchWorkouts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchWorkouts = async () => {
    const response = await retrieveWorkouts()
    woContext.updateWorkouts(response)
  }

  const toggleDialog = () => {
    if(!showWorkoutDialog === false) setViewMode(false)
    setShowWorkoutDialog(!showWorkoutDialog)
  }

  const addWorkout = () => {
    woContext.updateWorkout(emptyWorkout)
    setDialogTitle('Create Workout')
    toggleDialog()
  }

  const copyWorkout = async id => {
    woContext.copyWorkout(id)
    setDialogTitle('Copy Workout')
    toggleDialog()
  }

  const viewWorkout = async id => {
    StyledLogger.log(id, Style.warning)
    await setSelectedWorkoutToContext(id)
    setViewMode(true)
    setDialogTitle('View Workout')
    toggleDialog()
  }

  const editWorkout = async id => {
    await setSelectedWorkoutToContext(id)
    setDialogTitle('Edit Workout')
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
    StyledLogger.log(`index: ${index}`, Style.warning)
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
        dialogTitle={dialogTitle}
        view={viewMode}
      />
      <BasicSpinner show={showSpinner} />
      <Grid container >
        <Grid item xs={12} sm={6}>
      <FormButton value={'Add Workout'} onClick={addWorkout} />
      </Grid>
      {woContext.workouts.length > 0 ? (
          <WorkoutList 
            workouts={woContext.workouts} 
            deleteWorkout={deleteWorkout}
            viewWorkout={viewWorkout}
            editWorkout={editWorkout}
            copyWorkout={copyWorkout}
            disabled={false}
          />
      ) : (
        <BasicSpinner show={true} />
      )}
      </Grid>
    </React.Fragment>
  )
}

export default Workouts
