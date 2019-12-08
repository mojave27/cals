/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { navigate } from '@reach/router'
import { workoutBlock, workoutHeader, setBlock } from '../../styles/program'
import { retrieveProgramById as retrieveProgram, updateProgram, addProgram } from '../../api/programsApi'
import Table from '../tables/SimpleTable'
import Modal from '../Modal'
import AddWorkout from '../workouts/AddWorkout'
import {
  closeButton,
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
    program: {
      programName: '',
      programDescription: '',
      workouts: []
    },
    showWorkoutModal: false
  }

  componentDidMount = () => {
    if (this.props.programId) {
      this.retrieveFullProgram(this.props.programId)
    }
  }

  render() {
    return (
      this.state.showWorkoutModal
        ? <Modal handleClose={this.toggleWorkoutModal}>
          <AddWorkout saveWorkout={this.saveWorkout} />
        </Modal>
        : <div css={formContainer}>
          <span css={closeButton} onClick={this.handleClose}>&times;</span>
          <div css={row}>
            <div css={col25}>
              <label htmlFor='name'>Program Name</label>
            </div>
            <div css={col75}>
              <input
                css={formInput}
                type='text'
                id='name'
                name='name'
                value={this.state.program.name ? this.state.program.name : 'program name...'}
                placeholder='program name..'
                onChange={this.handleTextChange}
              />
            </div>
          </div>
          <div css={row}>
            <div css={col25}>
              <label htmlFor='description'>Description</label>
            </div>
            <div css={col75}>
              <textarea
                css={formInput}
                id='description'
                name='description'
                value={this.state.program.description}
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
              {this.state.program.workouts.length > 0
                ? this.renderWorkouts()
                : null}
              <input
                style={{ display: 'block' }}
                type='button'
                value='Add Workout'
                css={formButton}
                onClick={this.toggleWorkoutModal}
              />
            </div>
          </div>
          <div css={row}>
            <input type='submit' value='Submit' css={inputSubmit} onClick={this.saveProgram} />
          </div>
        </div>
    )
  }

  saveProgram = () => {
    if (typeof this.state.program.id !== 'undefined') {
      updateProgram(this.state.program)
    } else {
      addProgram(this.state.program)
    }
  }

  saveWorkout = workout => {
    let program = { ...this.state.program }
    program.workouts.push(workout)
    this.setState({ program })
  }

  renderWorkouts = workouts => {
    return this.state.program.workouts.map(wo => {
      return (
        <div key={wo.id} css={workoutBlock}>
          <div css={workoutHeader}>{wo.name}</div>
          <div>{this.renderSets(wo.sets)}</div>
        </div>
      )
    })
  }

  renderSets = sets => {
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

  handleTextChange = e => {
    let { id, value } = e.target
    let updatedProgram = { ...this.state.program }
    updatedProgram[id] = value
    this.setState({ program: updatedProgram })
  }

  toggleWorkoutModal = () => {
    this.setState(prevState => ({
      showWorkoutModal: !prevState.showWorkoutModal
    }))
  }

  retrieveFullProgram = programId => {
    retrieveProgram(programId)
      .then(response => {
        this.setState({ program: response.fullProgram })
      })
  }

  handleClose = () => {
    navigate('/programs')
  }

}

export default ProgramForm
