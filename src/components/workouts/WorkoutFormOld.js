/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useState } from 'react'
import {
  findIndexOfId,
  retrieveItemById,
  updateItemById,
  generateNewId
} from '../ArrayUtils'
import ExerciseGroupCard from '../sets/ExerciseGroupCard'
import { addWorkout, updateWorkout } from '../../api/workoutsApi'
import Table from '../tables/WorkoutTable'
import { setBlock } from '../../styles/program'
import WoContext from '../../context/WoContext'
import SetContext from '../../context/SetContext'
import {
  detailCard,
  container,
  formButton,
  formInput,
  row,
  col25,
  col75,
  stripe
} from '../../styles/main-styles'

const WorkoutForm = props => {
  let woContext = useContext(WoContext)
  let setContext = useContext(SetContext)
  const [showExerciseGroupDialog, setShowExerciseGroupDialog] = useState(false)

  const toggleSetDialog = () => {
    setShowExerciseGroupDialog(!showExerciseGroupDialog)
  }

  const editSet = id => {
    let index = findIndexOfId(id, woContext.workout.exerciseGroups)
    setContext.updateSet(woContext.workout.exerciseGroups[index])
    toggleSetDialog()
  }

  const showSetCard = () => {
    setContext.clearSet()
    toggleSetDialog()
  }

  const saveWorkout = async () => {
    let response = {}
    console.log(woContext.workout)
    if (woContext.workout.id) {
      response = await updateWorkout(woContext.workout)
    } else {
      response = await addWorkout(woContext.workout)
    }
    // update context because addWorkout will have added an id
    woContext.updateWorkout(response)

    if (props.saveWorkout) {
      props.saveWorkout(response)
    }
  }

  const handleTextChange = event => {
    let { id, value } = event.target
    let updatedWorkout = { ...woContext.workout }
    updatedWorkout[id] = value
    woContext.updateWorkout(updatedWorkout)
  }

  // add/update exercise group in workout context
  const addExerciseGroupToWorkout = exGroup => {
    if (typeof exGroup.id === 'undefined') {
      addSetToWorkout(exGroup)
    } else {
      updateSetInWorkout(exGroup)
    }
  }

  const addSetToWorkout = exGroup => {
    exGroup = setExGroupId(exGroup)
    let updatedWorkout = { ...woContext.workout }
    updatedWorkout.exerciseGroups.push(exGroup)
    woContext.updateWorkout(updatedWorkout)
    setShowExerciseGroupDialog(false)
  }

  const updateSetInWorkout = exGroup => {
    let updatedWorkout = { ...woContext.workout }
    let index = findIndexOfId(exGroup.id, updatedWorkout.exerciseGroups)
    updatedWorkout.exerciseGroups[index] = exGroup
    woContext.updateWorkout(updatedWorkout)
    setShowExerciseGroupDialog(false)
  }

  const setExGroupId = exGroup => {
    if (typeof exGroup.id === 'undefined') {
      console.log(`exGroup id is undefined`)
      let newId = generateNewId(woContext.workout.exerciseGroups)
      exGroup.id = newId
    }
    return exGroup
  }

  const handleRowClick = event => {
    let id = event.currentTarget.id
    console.log(id)
  }

  // lots of changes going on here...
  const handleSetChange = update => {
    // get set with matching id
    let exGroup = { ...retrieveItemById(update.exGroupId, woContext.workout.exerciseGroups) }

    // find exercise with matching id
    let targetExercise = { ...retrieveItemById(update.id, exGroup.exercises) }

    // update the appropriate value (based on name field - which will be either 'name' or 'reps')
    //   set that value to update.value
    targetExercise[update.name] = update.value

    // update set
    let updatedExerciseList = updateItemById(
      targetExercise,
      update.id,
      exGroup.exercises
    )
    exGroup.exercises = updatedExerciseList

    let updatedExerciseGroups = updateItemById(
      exGroup,
      update.exGroupId,
      woContext.workout.exerciseGroups
    )

    //update context
    woContext.updateExerciseGroupsForWorkout(updatedExerciseGroups)
  }

  const deleteExercise = id => {
    console.log(id)
  }

  const deleteSet = id => {
    let exGroups = woContext.workout.exerciseGroups
    // throw up confirmation modal
    // find set in woContext.workout.sets
    let index = findIndexOfId(id, exGroups)
    if (index > -1) {
      // delete the set
      exGroups.splice(index, 1)
      woContext.updateExerciseGroupsForWorkout(exGroups)
      updateWorkout(woContext.workout)
    } else {
      console.log(
        `set with id ${id} not found in woContext.workout.exerciseGroups`
      )
    }
  }

  // this is actually rendering exercise groups, not sets
  const renderSets = exGroups => {
    if (exGroups && exGroups.length > 0) {
      return exGroups.map(exGroup => {
        let data = {
          setId: exGroup.id,
          headers: ['name', 'reps'],
          rows: [...exGroup.exercises]
        }
        return (
          <div key={exGroup.id} css={setBlock}>
            <Table
              disabled={false}
              data={data}
              handleSetChange={handleSetChange}
              onCellChange={handleSetChange}
              onClick={handleRowClick}
              deleteRow={deleteExercise}
              deleteItem={deleteSet}
              editItem={editSet}
            />
          </div>
        )
      })
    } else {
      return null
    }
  }

  return (
    <React.Fragment>
      <div css={detailCard} style={{maxWidth: '60%'}}>
        <WorkoutHeader workout={woContext.workout} onChange={handleTextChange} />

        <div css={stripe} style={{ marginTop: '10px', marginBottom: '5px' }} />

        <div css={container}>
          <div style={{ display: 'block', paddingBottom: '10px' }}>
            <div style={{ paddingBottom: '10px' }}>Sets</div>

            {renderSets(woContext.workout.exerciseGroups)}

            <div style={{ marginTop: '25px', marginBottom: '25px' }} />
            <Button value='Add Set' onClick={showSetCard} />
            <Button value='Save Workout' onClick={saveWorkout} />

            {showExerciseGroupDialog ? (
              <ExerciseGroupCard
                saveSet={addExerciseGroupToWorkout}
                done={toggleSetDialog}
              />
            ) : null}

          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default WorkoutForm

const Button = props => {
  return (
    <input
      type='button'
      value={props.value}
      css={formButton}
      onClick={props.onClick}
      style={{ display: 'block' }}
    />
  )
}

const WorkoutHeader = props => {
  return (
        <div css={container}>
          <div css={row}>
            <div css={col25}>
              <label htmlFor='workoutName'>Workout Name</label>
            </div>
            <div css={col75}>
              <input
                css={formInput}
                type='text'
                id='name'
                name='name'
                value={props.workout.name ? props.workout.name : ''}
                placeholder='workout name..'
                onChange={props.onChange}
              />
            </div>
          </div>
          <div css={row}>
            <div css={col25}>
              <label htmlFor='workoutDescription'>Workout Description</label>
            </div>
            <div css={col75}>
              <input
                css={formInput}
                type='text'
                id='description'
                name='description'
                value={
                  props.workout.description
                    ? props.workout.description
                    : ' '
                }
                placeholder='workout description..'
                onChange={props.onChange}
              />
            </div>
          </div>
        </div>
  )
}