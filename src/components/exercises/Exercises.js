import React, { useEffect, useState } from 'react'
import { deleteExercisesById, retrieveExercises } from 'api/exercisesApi'
import Modal from 'components/modules/common/components/Modal'
import BasicSpinner from 'components/spinners/BasicSpinner'
import FormButton from 'components/inputs/FormButton'
import ExerciseForm from 'components/exercises/ExerciseForm'
import ExercisesTable from 'components/exercises/ExercisesTable'
import { dynamicSort } from 'components/modules/common/utilties/ArrayUtils'


const Exercises = props => {
  const [exercises, setExercises] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

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
    setShowSpinner(true)
    let exerciseIds = exercises.map( ex => ex.id)
    await deleteExercisesById(exerciseIds)
    let latestExercises = await retrieveExercises()
    let cleanedExercises = latestExercises.filter(ex => {
      let found = false
      exerciseIds.forEach(id => {
        // eslint-disable-next-line eqeqeq
        if (ex.id != id) found = true
      })
      return found
    })
    setExercises(cleanedExercises)
    setShowSpinner(false)
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

  const show = () => {
    if (showSpinner) return true
    if (exercises.length === 0) return true
    return false
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
        <BasicSpinner show={show()} />
        {renderExercises(exercises)}
      </div>
    </React.Fragment>
  )
}

export default Exercises
