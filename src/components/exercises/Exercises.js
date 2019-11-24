import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import retrieve from '../../api/retrieveExercises'
import { miniCard, formButton } from '../../styles/main-styles'
import Modal from '../Modal'
import Exercise from '../exercises/Exercise'

class Exercises extends React.Component {
  state = { exercises: [], showModal: false }

  render() {
    return this.state.showModal ? (
      <Modal handleClose={this.toggleModal}>
        <Exercise done={this.done} />
      </Modal>
    ) : (
      <React.Fragment>
        <button
          css={formButton}
          style={{ float: 'none', margin: '10px 10px' }}
          onClick={this.toggleModal}
        >
          Add Exercise
        </button>
        {this.renderExercises(this.state.exercises)}
      </React.Fragment>
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

  done = () => {
    retrieve().then(exercises => {
      this.setState({
        exercises: exercises,
        showModal: false
      })
    })
  }

  toggleModal = () => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal }
    })
  }

  renderExercises = exercises => {
    return exercises.map(exercise => {
      let index = exercise.id
      return (
        <div css={miniCard} key={index}>
          name: {exercise.name} - type: {exercise.type} - id: {exercise.id}
        </div>
      )
    })
  }
}

export default Exercises
