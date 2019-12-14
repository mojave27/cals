import React, { useContext, useEffect, useState } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { retrieve } from '../../api/setsApi'
import { formButton } from '../../styles/main-styles'
import Modal from '../Modal'
import SetCard from './SetCard'
import SetViewer from './SetViewer'
import { findIndexOfId } from '../ArrayUtils'
import { isEmpty } from 'lodash'
import WoContext from '../../context/WoContext'


const Sets = () => {
  let context = useContext(WoContext)
  const [showModal, setShowModal] = useState(false)
  const [sets, setSets] = useState([])

  useEffect(() => {
    console.log('in Sets useEffect')
    async function fetchMyAPI() {
      const response = await retrieveSets()
      // setSets(response)
    }

    fetchMyAPI()
  }, [])


  const retrieveSets = () => {
    retrieve().then(sets => { setSets(sets) })
  }


  // updateSelectedSet = set => {
  //   this.setState({selectedSet: set})
  // }

  const done = () => {
    retrieve().then(sets => {
      setSets(sets)
      setShowModal(false)
    })
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleSetSelect = (e) => {
    let id = e.currentTarget.id
    let index = findIndexOfId(id, sets)
    let set = { ...sets[index] }
    // console.log(`setting this set into context: ${JSON.stringify(set)}`)
    context.updateSet(set)
    toggleModal()
  }

  const renderSets = sets => {
    if (sets.length > 0) {
      return sets.map(set => {
        let index = set.id
        return (
          <SetViewer id={index} key={index} set={set} onClick={handleSetSelect} />
        )
      })
    }
  }

  return (
      (showModal ? (
        <Modal handleClose={toggleModal}>
          <SetCard done={done} />
        </Modal>
      ) : (

          isEmpty(context.selectedSet)
            ? <React.Fragment>
              <button
                css={formButton}
                style={{ float: 'none', margin: '10px auto' }}
                onClick={toggleModal}
              >
                Add Set
        </button>
              {renderSets(sets)}
            </React.Fragment>
            : <SetCard set={context.set} />
        ))
  )

}

export default Sets
