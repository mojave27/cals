import React, { useEffect, useState } from 'react'
import { deleteExerciseById, retrieve } from '../../api/exercisesApi'
import Modal from '../Modal'
import BasicSpinner from '../spinners/BasicSpinner'
import FormButton from '../inputs/FormButton'
import Exercise from './Exercise'
import ExercisesTable from './ExercisesTable'
import { dynamicSort } from '../ArrayUtils'


const Exercises = props => {
  const [exercises, setExercises] = useState([])
  const [showModal, setShowModal] = useState(false)

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

  const deleteExercises = exerciseIds => {
    let id = exerciseIds[0]
    deleteExerciseById(id).then(response => {
      retrieve().then(response => {
        setExercises(response)
      })
    })
  }

  const editExercise = exerciseId => {
    console.log(`TODO: edit exerciseId: ${exerciseId}`)
  }

  const renderExercises = exercises => {
    let sortedExercises = [...exercises]
    sortedExercises.sort(dynamicSort('name', true))
    return (
      <ExercisesTable
        deleteExercises={deleteExercises}
        onEdit={editExercise}
        edit={true}
        data={sortedExercises}
      />
    )
  }

  return (
    <React.Fragment>
      <Modal showModal={showModal} handleClose={toggleModal}>
        <Exercise done={done} />
      </Modal>
      <div style={{ maxWidth: '500px', margin: '0px auto' }}>
        <div style={{margin:'10px'}}>
          <FormButton value={'Add Exercise'} onClick={toggleModal} />
        </div>
        {exercises.length === 0 ? <BasicSpinner show={true} /> : renderExercises(exercises)}
      </div>
    </React.Fragment>
  )
}

export default Exercises
