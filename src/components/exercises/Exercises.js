import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import retrieve from '../../api/retrieveExercises'
import { formButton } from '../../styles/main-styles'
import Modal from '../Modal'
import Exercise from '../exercises/Exercise'
import Table from '../tables/Table'
import { dynamicSort } from '../ArrayUtils'

class Exercises extends React.Component {
  state = { exercises: [], showModal: false }

  render() {
    return this.state.showModal ? (
      <Modal handleClose={this.toggleModal}>
        <Exercise done={this.done} />
      </Modal>
    ) : (
      <React.Fragment>
      <div style={{maxWidth: '500px', margin: '0px auto'}}>
        <button
          css={formButton}
          style={{ float: 'none', margin: '10px 10px' }}
          onClick={this.toggleModal}
        >
          Add Exercise
        </button>
        {this.renderExercises(this.state.exercises)}
        </div>
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
    let sortedExercises = [...exercises]
    sortedExercises.sort(dynamicSort('name', true))
    let data = {
      headers: ['name', 'type', 'id'],
      rows: sortedExercises
    }
    return <Table edit={true} onClick={this.handleClickRow} data={data} />
    // return <Table onClick={this.handleClickRow} data={data} />
  }

  handleClickRow = event => {
    let target = event.currentTarget
    console.log({target})
  }

}

export default Exercises
