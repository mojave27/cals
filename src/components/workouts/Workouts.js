/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useState, useEffect } from 'react'
import { emptyWorkout } from '../../context/WoProvider'
import WoContext from '../../context/WoContext'
import ThemeContext from '../../context/ThemeContext'
import BasicSpinner from '../spinners/BasicSpinner'
import {
  retrieve as retrieveWorkouts,
  deleteWorkout as deleteWorkoutApi
} from '../../api/workoutsApi'
import Modal from '../Modal'
import WorkoutForm from './WorkoutForm'
import { findIndexOfStringId } from '../ArrayUtils'
import WorkoutList from './WorkoutList'
import Container from '@material-ui/core/Container'

import { styles } from '../../styles/MainStyles'
import { styles as gridStyles } from '../../styles/GridStyles2'

const Workouts = props => {
  let woContext = useContext(WoContext)
  let themeContext = useContext(ThemeContext)
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  let { formButton } = styles(themeContext.theme)
  let { gridContainer } = gridStyles(themeContext.theme)

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
    console.log(id)
    console.log(
      `%c${id}`,
      "color:red;background-color:#eee;font-size:1.1rem;font-weight:bold"
    )
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
        <Container maxWidth={'small'}>
          <WorkoutForm saveWorkout={saveWorkout} />
        </Container>
      </Modal>
      <button
        css={formButton}
        style={{ float: 'none', margin: '10px auto' }}
        onClick={addWorkout}
      >
        Add Workout
      </button>
      {woContext.workouts.length > 0 ? (
        <div css={gridContainer}>
          <WorkoutList 
            workouts={woContext.workouts} 
            deleteWorkout={deleteWorkout}
            editWorkout={editWorkout}
          />
          </div>
      ) : (
        <BasicSpinner show={true} />
      )}
    </React.Fragment>
  )
}

export default Workouts
