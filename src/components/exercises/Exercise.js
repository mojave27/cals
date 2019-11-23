/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import Select from '../inputs/Select'

import {
  formContainer,
  row,
  col25,
  col75,
  inputSubmit,
  formInput
} from '../../styles/main-styles'

class Exercise extends React.Component {
  state = {
    exerciseName: '',
    exerciseDescription: '',
    showWorkoutModal: false
  }

  render() {
    return (
      <div css={formContainer}>
        <form>
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
              <label htmlFor='exerciseDescription'>Description</label>
            </div>
            <div css={col75}>
              <textarea
                css={formInput}
                id='exerciseDescription'
                name='exerciseDescription'
                placeholder='exercise description..'
                onChange={this.handleTextChange}
                style={{ height: '42px' }}
              ></textarea>
            </div>
          </div>

          <div css={row}>
            <div css={col25}>
              <label htmlFor='country'>Type</label>
            </div>
            <div css={col75}>
                <Select />
              {/* <div css={customSelect}>
              <select id='exerciseType' name='exerciseType'>
                <option value='compound'>compound</option>
                <option value='isolation'>isolation</option>
              </select>
              </div> */}
            </div>
          </div>

          <div css={row}>
            <input type='submit' value='Submit' css={inputSubmit} />
          </div>
        </form>
      </div>
    )
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
