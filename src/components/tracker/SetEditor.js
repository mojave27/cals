/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'
import { /*compareByName,*/ findIndexOfId } from '../ArrayUtils'
import { retrieve } from '../../api/exercisesApi'
import { miniCard } from '../../styles/main-styles'
import { isUndefined } from 'lodash'
import BlockHeader from '../BlockHeader'

import {
  basicButton,
  formContainer,
  formInput,
  row,
  col25,
  col75,
  selectedMiniCard
} from '../../styles/main-styles'

const SetEditor = props => {
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
    return (
      <div css={formContainer}>
        <div css={row}>
          <div css={col25}>
            <div>{`id: ${getSetId()}`} </div>
            <label htmlFor='exercises'>exercises for set</label>
          </div>
          <div css={col75}>
            <div css={row}>{renderExercisesForSet(props.set.exercises)}</div>
            <div css={row}>
              <input
                style={{ margin: '5px' }}
                type='button'
                value='Add Exercise'
                css={[basicButton, { float: 'right' }]}
                onClick={toggleModal}
              />
            </div>
          </div>
          <div css={row}>
            <input
              style={{ margin: '5px' }}
              type='button'
              value='Save Set'
              css={[basicButton, { float: 'right' }]}
              onClick={saveSet}
            />
          </div>
        </div>
      </div>
    )
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
            css={[basicButton, { float: 'right' }]}
            onClick={addExercisesToSet}
          />
          <input
            style={{ margin: '5px' }}
            type='button'
            value='Cancel'
            css={[basicButton, { float: 'right' }]}
            onClick={toggleModal}
          />
        </div>
      </React.Fragment>
    )
  }

  const renderAllExercises = exercises => {
    // exercises.sort(m)
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
        <div id={index} css={getClasses(exercise.id)} key={index}>
          <BlockHeader item={{ id: exercise.id, name: exercise.name }} deleteItem={deleteExercise} />
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

  const getSetId = () => {
    return isUndefined(props.set.id) ? ' ' : props.set.id
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
    let exercisesForSet = [...props.set.exercises]
    let index = exercisesForSet.findIndex(
      exercise => Number(exercise.id) === Number(id)
    )
    exercisesForSet[index].reps = value
    let update = {
      id: props.set.id,
      exercises: exercisesForSet
    }
    props.updateSet(update)
  }

  const selectExercise = event => {
    let id = event.target.id
    let updatedSelectedExercises = [...selectedExercises]
    updatedSelectedExercises.push(allExercises[id])
    setSelectedExercises(updatedSelectedExercises)
  }

  const addExercisesToSet = async () => {
    // exercises from the db don't have a reps property.
    // so we add the reps prop with an empty value here.
    let tempExercises = [...selectedExercises]
    let modifiedExercises = tempExercises.map(exercise => {
      exercise.reps = ''
      return exercise
    })

    // add the newly selected exercises to the existing ones.
    let exercisesForSet = [
      ...props.set.exercises,
      ...modifiedExercises
    ]

    let update = {
      id: props.set.id,
      exercises: exercisesForSet
    }

    await props.updateSet(update)
    setShowExerciseList(false)
  }

  const toggleModal = () => {
    let newShowExerciseList = !showExerciseList
    setShowExerciseList(newShowExerciseList)
  }

  const deleteExercise = event => {
    let id = event.currentTarget.id
    let exercises = props.set.exercises
    let index = findIndexOfId(id, exercises)
    if (index > -1) {
      exercises.splice(index, 1)
      let update = {
        id: props.set.id,
        exercises: exercises
      }
      props.updateSet(update)
    }
  }

  const saveSet = async () => {
    if (props.saveSet) {
      props.saveSet(props.set.id)
    }
  }

  return showExerciseList ? renderExerciseList() : renderSet()
}

export default SetEditor
