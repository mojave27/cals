/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useState } from 'react'
import SetCard from '../sets/SetCard'
import { findIndexOfId, retrieveItemById, updateItemById, generateNewId } from '../ArrayUtils'
import { addWorkout, updateWorkout } from '../../api/workoutsApi'
import Table from '../tables/SimpleTable'
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
    console.log('toggling set dialog')
    setShowExerciseGroupDialog(!showExerciseGroupDialog)
  }

  const editSet = event => {
    console.log(event.target.id)
    console.log(event.target.name)
    let setId = event.target.id
    let index = findIndexOfId(setId, woContext.workout.exerciseGroups)
    // console.log(setId)
    console.log(JSON.stringify(woContext.workout.exerciseGroups[index]))
    setContext.updateSet(woContext.workout.exerciseGroups[index])
    toggleSetDialog() 
  }

  const showSetCard = () => {
    console.log('showing set card')
    setContext.clearSet()
    toggleSetDialog()
  }

  const saveWorkout = async () => {
    let response = {}
    if (woContext.workout.id) {
      console.log(`updating existing workout with id ${woContext.workout.id}`)
      console.log(`======================`)
      console.log(JSON.stringify(woContext.workout))
      console.log(`----------------------`)
      response = await updateWorkout(woContext.workout)
    } else {
      console.log(`adding new workout ${JSON.stringify(woContext.workout)}`)
      response = await addWorkout(woContext.workout)
      console.log(`  response from workout add: ${JSON.stringify(response)}`)
    }
    // update context because addWorkout will have added an id
    woContext.updateWorkout(response)

    if (props.saveWorkout) {
      console.log('calling props.saveWorkout')
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
    }else{
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
    console.log({update})
    // get set with matching id
    let set = { ...retrieveItemById(update.setId, woContext.workout.sets) }

    // find exercise with matching id
    let targetExercise = { ...retrieveItemById(update.id, set.exercises) }

    // update the appropriate value (based on name field - which will be either 'name' or 'reps')
    //   set that value to update.value
    targetExercise[update.name] = update.value

    // update set
    let updatedExerciseList = updateItemById(
      targetExercise,
      update.id,
      set.exercises
    )
    set.exercises = updatedExerciseList

    let updatedSetList = updateItemById(
      set,
      update.setId,
      woContext.workout.sets
    )

    //update context
    woContext.updateExerciseGroupsForWorkout(updatedSetList)
  }

  const deleteExercise = event => {
    console.log(event.target.id)
    console.log(event.target.value)
  }

  const deleteSet = event => {
    let id = event.currentTarget.id
    console.log(`[deteleSet] id: ${id}`)
    let exGroups = woContext.workout.exerciseGroups
    // throw up confirmation modal
    // find set in woContext.workout.sets
    let index = findIndexOfId(id, exGroups)
    if (index > -1) {
      // delete the set
      exGroups.splice(index, 1)
      woContext.updateExerciseGroupsForWorkout(exGroups)
      updateWorkout(woContext.workout)
    }else{
      console.log(`set with id ${id} not found in woContext.workout.exerciseGroups`)
    }
  }

  const renderSets = exGroups => {
    if (exGroups && exGroups.length > 0) {
      return exGroups.map(exGroup => {
        // console.log(`set: ${JSON.stringify(set)}`)
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
      <div css={detailCard}>
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
                value={woContext.workout.name ? woContext.workout.name : ''}
                placeholder='workout name..'
                onChange={handleTextChange}
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
                value={woContext.workout.description ? woContext.workout.description : ' '}
                placeholder='workout description..'
                onChange={handleTextChange}
              />
            </div>
          </div>
        </div>

        <div css={stripe} style={{marginTop:'10px', marginBottom:'5px'}} />

        <div css={container}>
          <div style={{ display: 'block', paddingBottom: '10px' }}>
            <div style={{ paddingBottom: '10px' }}>Sets</div>

            {renderSets(woContext.workout.exerciseGroups)}

            <input
              type='button'
              value='Add Set'
              css={formButton}
              onClick={showSetCard}
              style={{ display: 'block' }}
            />
            <input
              type='button'
              value='Save Workout'
              css={formButton}
              onClick={saveWorkout}
              style={{ display: 'block' }}
            />
            {showExerciseGroupDialog ? (
              <SetCard saveSet={addExerciseGroupToWorkout} done={toggleSetDialog} />
            ) : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default WorkoutForm
