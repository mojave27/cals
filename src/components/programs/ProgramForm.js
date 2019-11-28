/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import Modal from '../Modal'
import Workout from '../workouts/Workout'
import {
  formContainer,
  row,
  col25,
  col75,
  inputSubmit,
  formInput,
  formButton
} from '../../styles/main-styles'

class ProgramForm extends React.Component {
  state = {
    programName: '',
    programDescription: '',
    showWorkoutModal: false
  }

  render() {
    return (
      this.state.showWorkoutModal
      ? <Modal handleClose={this.toggleWorkoutModal}>
          <Workout />
        </Modal>
      : <div css={formContainer}>
        <form>
          <div css={row}>
            <div css={col25}>
              <label htmlFor='programName'>Program Name</label>
            </div>
            <div css={col75}>
              <input
                css={formInput}
                type='text'
                id='programName'
                name='programName'
                value={this.state.programName}
                placeholder='program name..'
                onChange={this.handleTextChange}
              />
            </div>
          </div>
          <div css={row}>
            <div css={col25}>
              <label htmlFor='programDescription'>Description</label>
            </div>
            <div css={col75}>
              <textarea
                css={formInput}
                id='programDescription'
                name='programDescription'
                placeholder='program description..'
                onChange={this.handleTextChange}
                style={{ height: '42px' }}
              ></textarea>
            </div>
          </div>
          <div css={row}>
            <div css={col25}>
              <label htmlFor='country'>Workouts</label>
            </div>
            <div css={col75}>
              <input
                type='button'
                value='Add Workout'
                css={formButton}
                onClick={this.toggleWorkoutModal}
              />
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

  toggleWorkoutModal = e => {
    this.setState(prevState => ({
      showWorkoutModal: !prevState.showWorkoutModal
    }))
  }
}

export default ProgramForm
