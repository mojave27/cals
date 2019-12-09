/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { retrieve } from '../../api/exercisesApi'
import addSet from '../../api/addSet'
import { miniCard } from '../../styles/main-styles'

import {
  formContainer,
  formInput,
  row,
  col25,
  col75,
  inputSubmit,
  selectedMiniCard
} from '../../styles/main-styles'

class Set extends React.Component {
  state = {
    selectedExercises: [],
    exercisesForSet: [],
    exercises: [],
    showExerciseList: false
  }

  render() {
    return this.state.showExerciseList ? (
      <React.Fragment>
        <div css={row}>{this.renderAllExercises(this.state.exercises)}</div>
        <div css={row}>
          <input
            style={{ margin: '5px' }}
            type='button'
            value='Save to Set'
            css={inputSubmit}
            onClick={this.addExercisesToSet}
          />
          <input
            style={{ margin: '5px' }}
            type='button'
            value='Cancel'
            css={inputSubmit}
            onClick={this.toggleModal}
          />
        </div>
      </React.Fragment>
    ) : (
      <div css={formContainer}>
        <div css={row}>
          <div css={col25}>
            <label htmlFor='exercises'>exercises for set</label>
          </div>
          <div css={col75}>
            <div css={row} >
              {this.renderExercisesForSet(this.state.exercisesForSet)}
            </div>
            <div css={row}>
              <input
                style={{ margin: '5px' }}
                type='button'
                value='Add Exercise'
                css={inputSubmit}
                onClick={this.toggleModal}
              />
            </div>
          </div>
          <div css={row}>
            <input
              style={{ margin: '5px' }}
              type='button'
              value='Save Set'
              css={inputSubmit}
              onClick={this.addSetToDb}
            />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount = () => {
    this.retrieveExercises()
  }

  retrieveExercises = () => {
    retrieve().then(exercises => {
      this.setState({ exercises })
    })
  }

  renderAllExercises = exercises => {
    return exercises.map(exercise => {
      let index = exercise.id
      return (
        <div
          id={index}
          css={this.getClasses(exercise.id)}
          key={index}
          onClick={this.selectExercise}
        >
          name: {exercise.name} - type: {exercise.type} - id: {exercise.id}
        </div>
      )
    })
  }

  renderExercisesForSet = exercises => {
    return exercises.map(exercise => {
      let index = exercise.id
      return (
        <div
          id={index}
          css={this.getClasses(exercise.id)}
          key={index}
          onClick={this.selectExercise}
        >
          name: {exercise.name} - type: {exercise.type} - id: {exercise.id}
           <input
              css={[formInput, {width: '100px'}]}
              type='text'
              id={exercise.id}
              name='exerciseReps'
              value={exercise.reps}
              placeholder='exercise reps..'
              onChange={this.handleRepsChange}
            />
        </div>
      )
    })
  }

  handleRepsChange = e => {
    let { id, value } = e.target
    let exercisesForSet = [...this.state.exercisesForSet]
    let index = exercisesForSet.findIndex( exercise => Number(exercise.id) === Number(id))
    exercisesForSet[index].reps = value
    this.setState({exercisesForSet})
  }

  getClasses = id => {
    let index = this.state.selectedExercises.findIndex(exercise => {
      return Number(exercise.id) === Number(id)
    })
    if (index === -1) {
      return miniCard
    } else {
      return [miniCard, selectedMiniCard]
    }
  }

  selectExercise = event => {
    let id = event.target.id
    let selectedExercises = [...this.state.selectedExercises]
    selectedExercises.push(this.state.exercises[id])
    this.setState({ selectedExercises })
  }

  addExercisesToSet = () => {
    let tempSelectedExercises = [...this.state.selectedExercises] 
    let modifiedSelectedExercises = tempSelectedExercises.map(exercise => {
      exercise.reps = ''
      return exercise
    })

    let exercisesForSet = [
      ...this.state.exercisesForSet,
      ...modifiedSelectedExercises
    ]
    this.setState({ exercisesForSet: exercisesForSet, showExerciseList: false })
  }

  toggleModal = () => {
    this.setState(prevState => {
      return { showExerciseList: !prevState.showExerciseList }
    })
  }

  addSetToDb = () => {
    const set = {
      exercises: this.state.exercisesForSet
    }
    addSet(set).then(response => {
      this.props.done()
    })
  }
}

export default Set
