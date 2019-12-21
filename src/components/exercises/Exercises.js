import React, { useState, useEffect } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { deleteExerciseById, retrieve } from '../../api/exercisesApi'
import { formButton } from '../../styles/main-styles'
import Modal from '../Modal'
import Exercise from './Exercise'
import ExercisesTable from './ExercisesTable'
import { dynamicSort } from '../ArrayUtils'

const Exercises = props => {
  const [exercises, setExercises] = useState([])
  // const [selectedExerciseIds, setSelectedExerciseIds] = useState([])
  const [showModal, setShowModal] = useState(false)

  const columns = React.useMemo(
    () => [
      {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <input type='checkbox' {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        Cell: ({ row }) => (
          <div>
            <input type='checkbox' {...row.getToggleRowSelectedProps()} />
          </div>
        )
      },
      {
        Header: 'name',
        accessor: 'name'
      },
      {
        Header: 'type',
        accessor: 'type'
      },
      {
        Header: 'id',
        accessor: 'id'
      }
    ],
    []
  )

  useEffect(() => {
    let didCancel = false
    async function fetchMyAPI() {
      const response = await retrieve()
      if (!didCancel) {
        setExercises(response)
      }
    }

    fetchMyAPI()
    return () => {
      didCancel = true
    }
  }, [])

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const done = () => {
    retrieve().then(exercises => {
      setExercises(exercises)
      setShowModal(false)
    })
  }

  // const submitTable = ids => {
  //   console.log(ids)
  //   let exercisesToAdd = ids.map( id => {
  //     let index = findExerciseById(id)
  //     return exercises[index]
  //   })
  //   updateSelectedExercises(exercisesToAdd)
  // }

  // const findExerciseById = id => {
  //   // let index = exercises.findIndex( exercise => Number(exercise.id) === Number(id))
  //   let index = findIndexOfId(id, exercises)
  //   return index
  // }

  // const updateSelectedExercises = exercisesToAdd => {
  //   let newSelectedExerciseIds = [...selectedExerciseIds, ...exercisesToAdd]
  //   let uniqueIds = new Set(newSelectedExerciseIds)
  //   let updatedSelectedExerciseIds = Array.from(uniqueIds)
  //   setSelectedExerciseIds(updatedSelectedExerciseIds)
  // }

  const deleteExercises = exerciseIds => {
    let id = exerciseIds[0]
    deleteExerciseById(id).then(response => {
      retrieve().then(response => {
        setExercises(response)
      })
    })
  }

  const renderExercises = exercises => {
    let sortedExercises = [...exercises]
    sortedExercises.sort(dynamicSort('name', true))
    return (
      <ExercisesTable
        deleteExercises={deleteExercises}
        edit={true}
        columns={columns}
        data={sortedExercises}
      />
    )
  }

  // return showModal ? (
  return (
    <React.Fragment>
      <Modal showModal={showModal} handleClose={toggleModal}>
        <Exercise done={done} />
      </Modal>
      <div style={{ maxWidth: '500px', margin: '0px auto' }}>
        <button
          css={formButton}
          style={{ float: 'none', margin: '10px 10px' }}
          onClick={toggleModal}
        >
          Add Exercise
        </button>
        {renderExercises(exercises)}
      </div>
    </React.Fragment>
  )
}

export default Exercises
