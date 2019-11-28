import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import retrieve from '../../api/retrieveSets'
import { formButton } from '../../styles/main-styles'
import Modal from '../Modal'
import Set from './Set'
import SetViewer from './SetViewer'

class Sets extends React.Component {
  state = { sets: [], showModal: false, selectedSet: {} }

  render() {
    return this.state.showModal ? (
      <Modal handleClose={this.toggleModal}>
        <Set done={this.done} />
      </Modal>
    ) : (
       <React.Fragment>
        <button
          css={formButton}
          style={{ float: 'none', margin: '10px auto' }}
          onClick={this.toggleModal}
        >
          Add Set
        </button>
        {this.renderSets(this.state.sets)}
      </React.Fragment>
      )
  }

  componentDidMount = () => {
    this.retrieveSets()
  }

  retrieveSets = () => {
    retrieve().then(sets => {
      this.setState({ sets })
    })
  }

  done = () => {
    retrieve().then(sets => {
      this.setState({
        sets: sets,
        showModal: false
      })
    })
  }

  toggleModal = () => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal }
    })
  }

  handleSetSelect = (e) => {
    console.log(e.target.id)
  }

  renderSets = sets => {
    if (sets.length > 0) {
    return sets.map(set => {
      let index = set.id
      return (
        <SetViewer key={index} set={set} onClick={this.handleSetSelect} />
      )
    })}
  }
}

export default Sets
