/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import Select from '../inputs/Select'
import { EXERCISE_TYPES } from '../../constants'
import addExercise from '../../api/addExercise'

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

class Exercise extends React.Component {
  state = {
    exerciseName: '',
    exerciseType: '',
    showWorkoutModal: false
  }

  render() {
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
              value={this.state.exerciseName}
              placeholder='exercise name..'
              onChange={this.handleTextChange}
            />
          </div>
        </div>

        <div css={row}>
          <div css={col25}>
            <label htmlFor='country'>Type</label>
          </div>
          <div css={col75}>
            <Select options={options} onSelect={this.handleSelectType} />
          </div>
        </div>

        <div css={row}>
          <input
            type='submit'
            value='Submit'
            css={[basicButton, {float:'right'}]}
            onClick={this.addExerciseToDb}
          />
        </div>
      </div>
    )
  }

  addExerciseToDb = () => {
    const exercise = {
      name: this.state.exerciseName,
      reps: this.state.exerciseReps,
      type: this.state.exerciseType,
    }
    addExercise(exercise).then(response => {
      this.props.done()
    })
  }

  handleSelectType = e => {
    let text = e.target.textContent
    this.setState({ exerciseType: text })
  }

  handleTextChange = e => {
    let { id, value } = e.target
    this.setState(prevState => {
      let newState = { ...prevState }
      newState[id] = value
      return { ...newState }
    })
  }
}

export default Exercise
