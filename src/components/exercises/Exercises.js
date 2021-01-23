import React, { useEffect, useState } from 'react'
import { deleteExercisesById, retrieveExercises } from '../../api/exercisesApi'
import Modal from '../Modal'
import BasicSpinner from '../spinners/BasicSpinner'
import FormButton from '../inputs/FormButton'
import ExerciseForm from './ExerciseForm'
import ExercisesTable from './ExercisesTable'
import { dynamicSort } from '../ArrayUtils'


const Exercises = props => {
  const [exercises, setExercises] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    let didCancel = false
    async function fetchMyAPI() {
      const response = await retrieveExercises()
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
    retrieveExercises().then(exercises => {
      setExercises(exercises)
      setShowModal(false)
    })
  }

  const deleteExercises = async (exercises) => {
    let exerciseIds = exercises.map( ex => ex.id)
    await deleteExercisesById(exerciseIds)
    let latestExercises = await retrieveExercises()
    setExercises(latestExercises)
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
        onDelete={deleteExercises}
        onEdit={editExercise}
        edit={true}
        data={sortedExercises}
      />
    )
  }

  return (
    <React.Fragment>
      <Modal showModal={showModal} handleClose={toggleModal}>
        <ExerciseForm done={done} />
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
