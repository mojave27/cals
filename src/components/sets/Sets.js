import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { retrieve } from '../../api/setsApi'
import { formButton } from '../../styles/main-styles'
import Modal from '../Modal'
import SetCard from './SetCard'
import SetViewer from './SetViewer'
import { findIndexOfId } from '../ArrayUtils'
import { isEmpty } from 'lodash'

class Sets extends React.Component {
  state = { sets: [], showModal: false, selectedSet: {} }

  render() {
    return this.state.showModal ? (
      <Modal handleClose={this.toggleModal}>
        <SetCard done={this.done} />
      </Modal>
    ) : (

      isEmpty(this.state.selectedSet)
      ? <React.Fragment>
        <button
          css={formButton}
          style={{ float: 'none', margin: '10px auto' }}
          onClick={this.toggleModal}
        >
          Add Set
        </button>
        {this.renderSets(this.state.sets)}
      </React.Fragment>
      : <SetCard set={this.state.selectedSet} />
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
    let id = e.currentTarget.id
    let index = findIndexOfId(id, this.state.sets)
    let set = {...this.state.sets[index]}
    this.setState({selectedSet: set})
  }

  renderSets = sets => {
    if (sets.length > 0) {
    return sets.map(set => {
      let index = set.id
      return (
        <SetViewer id={index} key={index} set={set} onClick={this.handleSetSelect} />
      )
    })}
  }
}

export default Sets
