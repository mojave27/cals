/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useState, useEffect } from 'react'
import { emptyWorkout } from '../../context/WoProvider'
import WoContext from '../../context/WoContext'
import {
  retrieve as retrieveWorkouts,
  deleteWorkout as deleteWorkoutApi
} from '../../api/workoutsApi'
import Table from '../tables/SimpleTable'
import Modal from '../Modal'
import WorkoutForm from './WorkoutForm'
import BlockHeader from '../BlockHeader'
import { findIndexOfId } from '../ArrayUtils'

import { workoutBlock, setBlock } from '../../styles/program'
import { formButton } from '../../styles/main-styles'
import { gridContainer, gridItem } from '../../styles/gridStyles'

const Workouts = props => {
  let woContext = useContext(WoContext)
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)

  useEffect(() => {
    fetchMyAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMyAPI = async () => {
    const response = await retrieveWorkouts()
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
          <div>{renderSets(wo.sets)}</div>
        </div>
      )
    })
  }

  const renderSets = sets => {
    return sets.map(set => {
      let data = {
        headers: ['name', 'reps'],
        rows: [...set.exercises]
      }
      return (
        <div key={set.id} css={setBlock}>
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
