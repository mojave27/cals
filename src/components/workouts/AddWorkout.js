/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import SetCard from '../sets/SetCard'
import { addWorkout, updateWorkout } from '../../api/workoutsApi'
import Table from '../tables/SimpleTable'
import { setBlock } from '../../styles/program'
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

const emptyWorkout = {
  "name": "",
  "description": "",
  "type": "",
  "sets": []
}

const AddWorkout = props => {
  const [workout, setWorkout] = useState(emptyWorkout)
  const [showSetDialog, setShowSetDialog] = useState(false)

  const toggleSetDialog = () => {
    setShowSetDialog(true)
  }

  const saveWorkout = () => {
    if (workout.id) {
      console.log('updating workout with id: ' + workout.id)
      updateWorkout(workout)
        .then(response => {
          setWorkout(response)
        })
    } else {
      console.log('adding workout')
      addWorkout(workout)
        .then(response => {
          // props.saveWorkout(response)
          setWorkout(response)
          return response
        })
        .then(response => {
          props.saveWorkout(response)
        })
    }
  }

  const handleTextChange = event => {
    let { id, value } = event.target
    let updatedWorkout = { ...workout }
    updatedWorkout[id] = value
    setWorkout(updatedWorkout)
  }

  const saveSet = set => {
    let updatedWorkout = {...workout}
    updatedWorkout.sets.push(set)
    setWorkout(updatedWorkout)
    setShowSetDialog(false)
  }

  const renderSets = sets => {
    return sets.map(set => {
      let data = {
        headers: ['name', 'reps'],
        rows: [...set.exercises]
      }
      return (
        <div key={set.id} css={setBlock}>
          <Table data={data} />
        </div>
      )
    })
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
                value={workout.name}
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
                value={workout.description}
                placeholder='workout description..'
                onChange={handleTextChange}
              />
            </div>
          </div>
        </div>
        <div css={stripe} />

        <div css={container}>
          <div style={{ display: 'block', paddingBottom: '10px' }}>
            <div style={{ paddingBottom: '10px' }}>Sets go here</div>
            {renderSets(workout.sets)}
            <input
              type='button'
              value='Add Set'
              css={formButton}
              onClick={toggleSetDialog}
              style={{ display: 'block' }}
            />
            <input
              type='button'
              value='Save Workout'
              css={formButton}
              onClick={saveWorkout}
              style={{ display: 'block' }}
            />
            {showSetDialog ? <SetCard saveSet={saveSet} done={toggleSetDialog} /> : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  )

}

export default AddWorkout
