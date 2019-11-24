import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import retrieve from '../../api/retrieveSets'
import { card, miniCard, formButton } from '../../styles/main-styles'
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

  renderSets = sets => {
    return sets.map(set => {
      let index = set.id
      return (
        // <div css={card} key={index} >
        //   set id: {set.id}
        // </div>
        <SetViewer set={set} />
      )
    })
  }
}

export default Sets
