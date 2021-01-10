/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import Select from '../inputs/Select'
import { EXERCISE_TYPES } from '../../constants'
import { addExercise } from '../../api/exercisesApi'

import {
  basicButton,
  formContainer,
  row,
  col25,
  col75,
  formInput
} from '../../styles/main-styles'

const options = [
  'Select type:',
  EXERCISE_TYPES.COMPOUND,
  EXERCISE_TYPES.ISOLATION
]

const Exercise = props => {
  const [exerciseName, setExerciseName] = useState('')
  const [exerciseType, setExerciseType] = useState('')

  const addExerciseToDb = () => {
    const exercise = {
      name: exerciseName,
      reps: '',
      type: exerciseType,
      id: ''
    }
    addExercise(exercise).then(response => {
      props.done()
    })
  }

  const handleSelectType = e => {
    let text = e.target.textContent
    setExerciseType(text)
  }

  const handleTextChange = e => {
    let { id, value } = e.target
    switch (id) {
      case 'exerciseName':
        setExerciseName(value)
        break
      case 'exerciseType':
        setExerciseType(value)
        break
      default: console.log(`no match for ${id}`)
    }
  }

    return (
      <div css={formContainer}>
        <div css={row}>
          <div css={col25}>
            <label htmlFor='exerciseName'>Exercise Name</label>
          </div>
          <div css={col75}>
            <input
              css={formInput}
              type='text'
              id='exerciseName'
              name='exerciseName'
              value={exerciseName}
              placeholder='exercise name..'
              onChange={handleTextChange}
            />
          </div>
        </div>

        <div css={row}>
          <div css={col25}>
            <label htmlFor='country'>Type</label>
          </div>
          <div css={col75}>
            <Select options={options} onSelect={handleSelectType} />
          </div>
        </div>

        <div css={row}>
          <input
            type='submit'
            value='Submit'
            css={[basicButton, {float:'right'}]}
            onClick={addExerciseToDb}
          />
        </div>
      </div>
    )
  
}

export default Exercise
