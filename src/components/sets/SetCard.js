/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useEffect, useState } from 'react'
import { retrieve } from '../../api/exercisesApi'
import { addSet, updateSet } from '../../api/setsApi'
import { miniCard } from '../../styles/main-styles'
import { isUndefined } from 'lodash'
import SetContext from '../../context/SetContext'

import {
  basicButton,
  formContainer,
  formInput,
  row,
  col25,
  col75,
  selectedMiniCard
} from '../../styles/main-styles'

const SetCard = props => {
  let context = useContext(SetContext)
  const [allExercises, setAllExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([])
  const [showExerciseList, setShowExerciseList] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const response = await retrieve()
      setAllExercises(response)
    }

    fetchData()
    return () => {}
  }, [])

  const renderSet = () => {
    console.log('renderSet')
    return (
      <div css={formContainer}>
        <div css={row}>
          <div css={col25}>
            <div>{`id: ${getSetId()}`} </div>
            <label htmlFor='exercises'>exercises for set</label>
          </div>
          <div css={col75}>
            <div css={row}>{renderExercisesForSet(context.set.exercises)}</div>
            <div css={row}>
              <input
                style={{ margin: '5px' }}
                type='button'
                value='Add Exercise'
                css={[basicButton, {float:'right'}]}
                onClick={toggleModal}
              />
            </div>
          </div>
          <div css={row}>
            <input
              style={{ margin: '5px' }}
              type='button'
              value='Save Set'
              css={[basicButton, {float:'right'}]}
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
    console.log('renderExerciseList')
    return (
      <React.Fragment>
        <div onClick={props.done}>close</div>
        <div css={row}>{renderAllExercises(allExercises)}</div>
        <div css={row}>
          <input
            style={{ margin: '5px' }}
            type='button'
            value='Save to Set'
            css={[basicButton, {float:'right'}]}
            onClick={addExercisesToSet}
          />
          <input
            style={{ margin: '5px' }}
            type='button'
            value='Cancel'
            css={[basicButton, {float:'right'}]}
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
    console.log('renderExerciseForSet')
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
          />
        </div>
      )
    })
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
    let index = exercisesForSet.findIndex(
      exercise => Number(exercise.id) === Number(id)
    )
    exercisesForSet[index].reps = value
    context.updateExercisesForSet(exercisesForSet)
  }

  const selectExercise = event => {
    let id = event.target.id
    let updatedSelectedExercises = [...selectedExercises]
    updatedSelectedExercises.push(allExercises[id])
    setSelectedExercises(updatedSelectedExercises)
  }

  const addExercisesToSet = async () => {
    let tempSelectedExercises = [...selectedExercises]
    let modifiedSelectedExercises = tempSelectedExercises.map(exercise => {
      exercise.reps = ''
      return exercise
    })

    console.log('context.set.exercises')
    console.log(JSON.stringify(context.set.exercises))
    console.log('modifiedSelectedExercises')
    console.log(JSON.stringify(modifiedSelectedExercises))

    let exercisesForSet = [
      ...context.set.exercises,
      ...modifiedSelectedExercises
    ]

    console.log('exercisesForSet')
    console.log(JSON.stringify(exercisesForSet))

    await context.updateExercisesForSet(exercisesForSet)
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
