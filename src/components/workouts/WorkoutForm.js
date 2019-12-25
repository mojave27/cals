/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useState } from 'react'
import SetCard from '../sets/SetCard'
import { findIndexOfId, retrieveItemById, updateItemById } from '../ArrayUtils'
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
  const [showSetDialog, setShowSetDialog] = useState(false)

  const toggleSetDialog = () => {
    setShowSetDialog(!showSetDialog)
  }

  const showSetCard = () => {
    setContext.clearSet()
    toggleSetDialog()
  }

  const saveWorkout = async () => {
    let response = {}
    if (woContext.workout.id) {
      console.log(`updating existing workout with id ${woContext.workout.id}`)
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

  const addSetToWorkout = set => {
    // add/update set in workout context
    let updatedWorkout = { ...woContext.workout }
    updatedWorkout.sets.push(set)
    woContext.updateWorkout(updatedWorkout)
    setShowSetDialog(false)
  }

  const handleRowClick = event => {
    let id = event.currentTarget.id
    console.log(id)
  }

  // lots of changes going on here...
  const handleSetChange = update => {
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
    woContext.updateSetsForWorkout(updatedSetList)
  }

  const deleteExercise = event => {
    console.log(event.target.id)
    console.log(event.target.value)
  }

  const deleteSet = event => {
    let id = event.currentTarget.id
    console.log(id)
    let sets = woContext.workout.sets
    // throw up confirmation modal
    // find set in woContext.workout.sets
    let index = findIndexOfId(id, sets)
    if (index > -1) {
      // delete the set
      sets.splice(index, 1)
      woContext.updateSetsForWorkout(sets)
      updateWorkout(woContext.workout)
    }else{
      console.log(`set with id ${id} not found in woContext.workout.sets`)
    }
  }

  const renderSets = sets => {
    if (sets && sets.length > 0) {
      return sets.map(set => {
        // console.log(`set: ${JSON.stringify(set)}`)
        let data = {
          setId: set.id,
          headers: ['name', 'reps'],
          rows: [...set.exercises]
        }
        return (
          <div key={set.id} css={setBlock}>
            <Table
              disabled={false}
              data={data}
              handleSetChange={handleSetChange}
              onClick={handleRowClick}
              deleteRow={deleteExercise}
              deleteItem={deleteSet}
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

        <div css={stripe} />

        <div css={container}>
          <div style={{ display: 'block', paddingBottom: '10px' }}>
            <div style={{ paddingBottom: '10px', color: 'red' }}>Sets</div>

            {renderSets(woContext.workout.sets)}

            <input
              type='button'
              value='Add Set'
              css={formButton}
              // onClick={toggleSetDialog}
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
            {showSetDialog ? (
              <SetCard saveSet={addSetToWorkout} done={toggleSetDialog} />
            ) : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default WorkoutForm
