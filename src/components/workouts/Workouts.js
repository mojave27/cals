/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useState, useEffect } from 'react'
import { emptyWorkout } from '../../context/WoProvider'
import WoContext from '../../context/WoContext'
import ThemeContext from '../../context/ThemeContext'
import {
  retrieve as retrieveWorkouts,
  deleteWorkout as deleteWorkoutApi
} from '../../api/workoutsApi'
import Table from '../tables/SimpleTable'
import Modal from '../Modal'
import WorkoutForm from './WorkoutForm'
import BlockHeader from '../BlockHeader'
import { findIndexOfId } from '../ArrayUtils'

import { styles as programStyles } from '../../styles/ProgramStyles'
import { styles } from '../../styles/MainStyles'
import { styles as gridStyles } from '../../styles/GridStyles2'

const Workouts = props => {
  let woContext = useContext(WoContext)
  let themeContext = useContext(ThemeContext)
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  let { formButton } = styles(themeContext.theme)
  let { gridContainer, gridItem } = gridStyles(themeContext.theme)
  let { workoutBlock, setBlock } = programStyles(themeContext.theme)

  useEffect(() => {
    fetchMyAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMyAPI = async () => {
    const response = await retrieveWorkouts()
    console.log({response})
    woContext.updateWorkouts(response)
  }

  const addWorkout = () => {
    woContext.updateWorkout(emptyWorkout)
    toggleModal()
  }

  const toggleModal = () => {
    setShowWorkoutModal(!showWorkoutModal)
  }

  const saveWorkout = async workout => {
    await woContext.saveWorkoutInWorkoutsList(workout)
    toggleModal()
  }

  const editWorkout = async event => {
    console.log({ event })
    let id = event.currentTarget.id
    await setSelectedWorkoutToContext(id)
    toggleModal()
  }

  const setSelectedWorkoutToContext = workoutId => {
    let index = findIndexOfId(workoutId, woContext.workouts)
    if (index > -1) {
      woContext.updateWorkout(woContext.workouts[index])
    }
  }

  const deleteWorkout = async event => {
    let id = event.currentTarget.id
    await deleteWorkoutApi(id)
    fetchMyAPI()
  }

  const renderWorkouts = workouts => {
    console.log('rendering workouts...')
    return workouts.map(wo => {
      console.log({wo})
      return (
        <div
          key={wo.id}
          id={wo.id}
          css={[workoutBlock, gridItem]}
          style={{ marginLeft: '5px', marginBottom: '10px' }}
        >
          <BlockHeader
            item={wo}
            deleteItem={deleteWorkout}
            editItem={editWorkout}
          />
          <div>{renderExerciseGroups(wo.exerciseGroups)}</div>
        </div>
      )
    })
  }

  const renderExerciseGroups = exerciseGroups => {
    return exerciseGroups.map(exGroup => {
      let data = {
        headers: ['name', 'reps'],
        rows: [...exGroup.exercises]
      }
      return (
        <div key={exGroup.id} css={setBlock}>
          <Table data={data} disabled={true} />
        </div>
      )
    })
  }

  return (
    <React.Fragment>
      <Modal showModal={showWorkoutModal} handleClose={toggleModal}>
        <WorkoutForm saveWorkout={saveWorkout} />
      </Modal>
      <button
        css={formButton}
        style={{ float: 'none', margin: '10px auto' }}
        onClick={addWorkout}
      >
        Add Workout
      </button>
      {woContext.workouts.length > 0 ? (
        <div css={gridContainer}>{renderWorkouts(woContext.workouts)}</div>
      ) : (
        <div>Workouts</div>
      )}
    </React.Fragment>
  )
}

export default Workouts
