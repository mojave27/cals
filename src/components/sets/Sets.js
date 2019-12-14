import React, { useContext, useEffect, useState } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { deleteSet as deleteSetById, retrieve } from '../../api/setsApi'
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
    async function fetchMyAPI() {
      await retrieveSets()
    }

    fetchMyAPI()
  }, [])

  const retrieveSets = () => {
    retrieve().then(sets => { setSets(sets) })
  }

  const done = () => {
    retrieve().then(sets => {
      setSets(sets)
      setShowModal(false)
    })
  }

  const addSet = () => {
    let emptySet = { exercises: [] }
    context.updateSet(emptySet)
    toggleModal()
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleSetSelect = (e) => {
    let id = e.currentTarget.id
    let index = findIndexOfId(id, sets)
    let set = { ...sets[index] }
    context.updateSet(set)
    toggleModal()
  }

  const deleteSet = event => {
    event.stopPropagation()
    deleteSetById(event.currentTarget.id)
    retrieveSets()
  }

  const saveSet = set => {
    retrieveSets()
  }

  const renderSets = sets => {
    if (sets.length > 0) {
      return sets.map(set => {
        let index = set.id
        return (
          <SetViewer id={index} key={index} set={set} deleteSet={deleteSet} selectSet={handleSetSelect} />
        )
      })
    }
  }

  return (
      (showModal ? (
        <Modal handleClose={toggleModal}>
          <SetCard done={done} saveSet={saveSet} />
        </Modal>
      ) : (

          isEmpty(context.selectedSet)
            ? <React.Fragment>
              <button
                css={formButton}
                style={{ float: 'none', margin: '10px auto' }}
                onClick={addSet}
              >
                Add Set
        </button>
              {renderSets(sets)}
            </React.Fragment>
            // : <SetCard set={context.set} />
            : <SetCard done={done} saveSet={saveSet} />
        ))
  )

}

export default Sets
