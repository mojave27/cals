/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useEffect, useState } from 'react'
import { retrieve } from '../../api/exercisesApi'
// import { retrieveSetById } from '../../api/setsApi'
import { addSet, updateSet } from '../../api/setsApi'
import { closeButton, miniCard } from '../../styles/main-styles'
import { isUndefined } from 'lodash'
import WoContext from '../../context/WoContext'

import {
  formContainer,
  formInput,
  row,
  col25,
  col75,
  inputSubmit,
  selectedMiniCard
} from '../../styles/main-styles'

const SetCard = props => {
  let context = useContext(WoContext)
  const [allExercises, setAllExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([])
  const [showExerciseList, setShowExerciseList] = useState(false)

  useEffect(() => {
    let didCancel = false

    async function fetchData() {
      const response = await retrieve()
      setAllExercises(response)
    }

    fetchData()
    return () => { didCancel = true }
  }, [])


  const renderSet = () => {
    return (
      <div css={formContainer} style={{ border: '3px solid cyan' }}>
        <div css={row}>
          <div css={col25}>
            <div>{`id: ${getSetId()}`} </div>
            <label htmlFor='exercises'>exercises for set</label>
          </div>
          <div css={col75}>
            <div css={row} >
              {renderExercisesForSet(context.set.exercises)}
            </div>
            <div css={row}>
              <input
                style={{ margin: '5px' }}
                type='button'
                value='Add Exercise'
                css={inputSubmit}
                onClick={toggleModal}
              />
            </div>
          </div>
          <div css={row}>
            <input
              style={{ margin: '5px' }}
              type='button'
              value='Save Set'
              css={inputSubmit}
              onClick={saveSet}
            />
          </div>
        </div>
      </div>
    )
  }

  const getSetId = () => {
    return isUndefined(context.set.id) ? ' ' : context.set.id
  }

  const renderExerciseList = () => {
    return (
      <React.Fragment>
        <div onClick={props.done}>close</div>
        <div css={row}>{renderAllExercises(allExercises)}</div>
        <div css={row}>
          <input
            style={{ margin: '5px' }}
            type='button'
            value='Save to Set'
            css={inputSubmit}
            onClick={addExercisesToSet}
          />
          <input
            style={{ margin: '5px' }}
            type='button'
            value='Cancel'
            css={inputSubmit}
            onClick={toggleModal}
          />
        </div>
      </React.Fragment>
    )
  }

  const renderAllExercises = exercises => {
    return exercises.map(exercise => {
      let index = exercise.id
      return (
        <div
          id={index}
          css={getClasses(exercise.id)}
          key={index}
          onClick={selectExercise}
        >
          name: {exercise.name} - type: {exercise.type} - id: {exercise.id}
        </div>
      )
    })
  }

  const renderExercisesForSet = exercises => {
    return exercises.map(exercise => {
      let index = exercise.id
      return (
        <div
          id={index}
          css={getClasses(exercise.id)}
          key={index}
        // onClick={selectExercise}
        >
          name: {exercise.name} - type: {exercise.type} - id: {exercise.id}
          <input
            css={[formInput, { width: '100px' }]}
            type='text'
            id={exercise.id}
            name='exerciseReps'
            value={exercise.reps}
            placeholder='exercise reps..'
            onChange={handleRepsChange}
          // onClick={handleRepsChange}
          />
        </div>
      )
    })
  }

  const getFullExercise = exerciseId => {
    let fullExercise = allExercises.find(fullEx => {
      return (Number(fullEx.id) === Number(exerciseId))
    })
    console.log(`fullExercises is: ${JSON.stringify(fullExercise)}`)
    return fullExercise
  }

  const getClasses = id => {
    let index = selectedExercises.findIndex(exercise => {
      return Number(exercise.id) === Number(id)
    })
    if (index === -1) {
      return miniCard
    } else {
      return [miniCard, selectedMiniCard]
    }
  }

  const handleRepsChange = event => {
    event.stopPropagation()
    let { id, value } = event.target
    let exercisesForSet = [...context.set.exercises]
    let index = exercisesForSet.findIndex(exercise => Number(exercise.id) === Number(id))
    exercisesForSet[index].reps = value
    context.updateExercisesForSet(exercisesForSet)
  }

  const selectExercise = event => {
    let id = event.target.id
    let updatedSelectedExercises = [...selectedExercises]
    updatedSelectedExercises.push(allExercises[id])
    setSelectedExercises(updatedSelectedExercises)
  }

  const addExercisesToSet = () => {
    let tempSelectedExercises = [...selectedExercises]
    let modifiedSelectedExercises = tempSelectedExercises.map(exercise => {
      exercise.reps = ''
      return exercise
    })

    let exercisesForSet = [
      ...context.set.exercises,
      ...modifiedSelectedExercises
    ]
    context.updateExercisesForSet(exercisesForSet)
    setShowExerciseList(false)
  }

  const toggleModal = () => {
    let newShowExerciseList = !showExerciseList
    setShowExerciseList(newShowExerciseList)
  }

  const saveSet = async () => {
    let response = {}
    if (context.set.id) {
      response = await updateSet(context.set)
    } else {
      response = await addSet(context.set)
    }

    if (props.saveSet) {
      props.saveSet(response)
    }

  }

  return (
    showExerciseList
      ? renderExerciseList()
      : renderSet()
  )

}

export default SetCard
