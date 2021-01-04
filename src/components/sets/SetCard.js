/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useEffect, useState } from 'react'
import { findIndexOfId, sortByStringProperty } from '../ArrayUtils'
import { retrieve } from '../../api/exercisesApi'
import { updateSet } from '../../api/setsApi'
import { miniCard } from '../../styles/main-styles'
import { isUndefined } from 'lodash'
import SetContext from '../../context/SetContext'
// import ThemeContext from '../../context/ThemeContext'
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

// TODO: disconnect this from SetContext and just have it manage the set(s) locally, and save/update
//       to the parent component via props

// TODO: change this to ExerciseGroup card, since it isn't really a Set.
const SetCard = props => {
  let setContext = useContext(SetContext)
  // let themeContext = useContext(ThemeContext)
  const [allExercises, setAllExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([])
  const [showExerciseList, setShowExerciseList] = useState(false)

  useEffect(() => {
    async function fetchData() {
      let exercises = await retrieve()
      setAllExercises(sortByName(exercises))
    }

    fetchData()
    return () => {}
  }, [])

  const sortByName = exercises => {
    let ignoreCase = true
    return sortByStringProperty(exercises, 'name', ignoreCase)
  }

  const handleRepsChange = event => {
    event.stopPropagation()
    let { id, value } = event.target
    let exercisesForSet = [...setContext.set.exercises]
    let index = exercisesForSet.findIndex(
      exercise => Number(exercise.id) === Number(id)
    )
    exercisesForSet[index].reps = value
    setContext.updateExercisesForSet(exercisesForSet)
  }

  const selectExercise = event => {
    let id = event.target.id
    let updatedSelectedExercises = [...selectedExercises]
    let allExercisesId = findIndexOfId(id, allExercises)
    updatedSelectedExercises.push(allExercises[allExercisesId])
    setSelectedExercises(updatedSelectedExercises)
  }

  const addExercisesToSet = async () => {
    let tempSelectedExercises = [...selectedExercises]
    let modifiedSelectedExercises = tempSelectedExercises.map(exercise => {
      exercise.reps = ''
      return exercise
    })

    let exercisesForSet = [
      ...setContext.set.exercises,
      ...modifiedSelectedExercises
    ]

    await setContext.updateExercisesForSet(exercisesForSet)
    setShowExerciseList(false)
  }

  const toggleModal = () => {
    let newShowExerciseList = !showExerciseList
    setShowExerciseList(newShowExerciseList)
  }

  const deleteExercise = id => {
    let exercises = setContext.set.exercises
    let index = findIndexOfId(id, exercises)
    if (index > -1) {
      exercises.splice(index, 1)
      setContext.updateExercisesForSet(exercises)
      updateSet(setContext.set)
    }
  }

  const editExercise = event => {
    console.log(event.currentTarget.id)
  }

  const saveSet = async () => {
    if (props.saveSet) {
      props.saveSet(setContext.set)
    }
  }

  return (
    showExerciseList ? (
      <ExerciseList
        onSelect={selectExercise}
        onSave={addExercisesToSet}
        onClose={toggleModal}
        exercises={allExercises}
        selectedExercises={selectedExercises}
      />
    ) : (
      <ExerciseGroup
        onAdd={toggleModal}
        onChange={handleRepsChange}
        onDelete={deleteExercise}
        onEdit={editExercise}
        onSave={saveSet}
        selectedExercises={selectedExercises}
      />
    )
  )
}

export default SetCard

const ExerciseGroup = props => {
  const setContext = useContext(SetContext)

  const getClasses = id => {
    let index = findIndexOfId(id, props.selectedExercises)
    if (index === -1) {
      return miniCard
    } else {
      return [miniCard, selectedMiniCard]
    }
  }

  const getSetId = () => {
    return isUndefined(setContext.set.id) ? ' ' : setContext.set.id
  }

  const renderExercisesForSet = exercises => {
    return exercises.map(exercise => {
      let index = exercise.id
      return (
        <div id={index} css={getClasses(exercise.id)} key={index}>
          <BlockHeader
            item={{ id: exercise.id, name: exercise.name }}
            deleteItem={props.onDelete}
            editItem={props.onEdit}
          />
          name: {exercise.name} - type: {exercise.type} - id: {exercise.id}
          <input
            css={[formInput, { width: '100px' }]}
            type='text'
            id={exercise.id}
            name='exerciseReps'
            value={exercise.reps}
            placeholder='exercise reps..'
            onChange={props.onChange}
          />
        </div>
      )
    })
  }

  return (
    <div css={formContainer}>
      <div css={row}>
        <div css={col25}>
          <div>{`id: ${getSetId()}`} </div>
          <label htmlFor='exercises'>exercises for set</label>
        </div>

        <div css={col75}>
          <div css={row}>
            {renderExercisesForSet(setContext.set.exercises)}
          </div>
          <div css={row}>
            <input
              style={{ margin: '5px' }}
              type='button'
              value='Add Exercise'
              css={[basicButton, { float: 'right' }]}
              onClick={props.onAdd}
            />
          </div>
        </div>
        <div css={row}>
          <input
            style={{ margin: '5px' }}
            type='button'
            value='Save Set'
            css={[basicButton, { float: 'right' }]}
            onClick={props.onSave}
          />
        </div>
      </div>
    </div>
  )

}

const ExerciseList = props => {
  const getClasses = id => {
    let index = findIndexOfId(id, props.selectedExercises)
    if (index === -1) {
      return miniCard
    } else {
      return [miniCard, selectedMiniCard]
    }
  }

  const renderAllExercises = exercises => {
    return exercises.map(exercise => {
      return (
        <div
          id={exercise.id}
          css={getClasses(exercise.id)}
          key={exercise.id}
          onClick={props.onSelect}
        >
          name: {exercise.name} - type: {exercise.type} - id: {exercise.id}
        </div>
      )
    })
  }

  return (
    <React.Fragment>
      <div css={row}>
        <input
          style={{ margin: '5px' }}
          type='button'
          value='Save to Set'
          css={[basicButton, { float: 'right' }]}
          onClick={props.onSave}
        />
        <input
          style={{ margin: '5px' }}
          type='button'
          value='Cancel'
          css={[basicButton, { float: 'right' }]}
          onClick={props.onClose}
        />
      </div>
      <div css={row}>{renderAllExercises(props.exercises)}</div>
    </React.Fragment>
  )
}
