import React, { useContext, useState, useEffect } from 'react'
import { emptyWorkout } from '../../context/WoProvider'
import WoContext from '../../context/WoContext'
import BasicSpinner from '../spinners/BasicSpinner'
import {
  retrieve as retrieveWorkouts,
  deleteWorkout as deleteWorkoutApi
} from '../../api/workoutsApi'
import Modal from '../Modal'
import WorkoutForm from './WorkoutForm'
import FormButton from '../inputs/FormButton'
import { findIndexOfStringId } from '../ArrayUtils'
import WorkoutList from './WorkoutList'
import Container from '@material-ui/core/Container'

const Workouts = props => {
  let woContext = useContext(WoContext)
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)

  useEffect(() => {
    fetchWorkouts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchWorkouts = async () => {
    const response = await retrieveWorkouts()
    woContext.updateWorkouts(response)
  }

  const toggleModal = () => {
    setShowWorkoutModal(!showWorkoutModal)
  }

  const addWorkout = () => {
    woContext.updateWorkout(emptyWorkout)
    toggleModal()
  }

  const editWorkout = async id => {
    await setSelectedWorkoutToContext(id)
    toggleModal()
  }

  const saveWorkout = async workout => {
    await woContext.saveWorkoutInWorkoutsList(workout)
    toggleModal()
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
      {/* TODO: change this to the dialog */}
      <Modal showModal={showWorkoutModal} handleClose={toggleModal}>
        <Container>
          <WorkoutForm saveWorkout={saveWorkout} />
        </Container>
      </Modal>
      <FormButton buttonText={'Add Workout'} onClick={addWorkout} />
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
