import React, { useContext, useEffect, useState } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { deleteSet as deleteSetById, retrieve } from '../../api/setsApi'
import Modal from '../Modal'
import SetCard from './SetCard'
import SetViewer from './SetViewer'
import { findIndexOfId } from '../ArrayUtils'
import { isEmpty } from 'lodash'
import SetContext from '../../context/SetContext'
import { formButton } from '../../styles/main-styles'
import { gridContainer } from '../../styles/gridStyles'

const Sets = () => {
  let setContext = useContext(SetContext)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchMyAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMyAPI = async () => {
    const response = await retrieve()
    setContext.updateSets(response)
  }

  const done = () => {
    fetchMyAPI()
    setShowModal(false)
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const addSet = () => {
    let emptySet = { exercises: [] }
    setContext.updateSet(emptySet)
    toggleModal()
  }

  const saveSet = async set => {
    await fetchMyAPI()
    toggleModal()
  }

  const deleteSet = async event => {
    let id = event.currentTarget.id
    await deleteSetById(id)
    fetchMyAPI()
  }

  const handleSetSelect = e => {
    let id = e.currentTarget.id
    let index = findIndexOfId(id, setContext.sets)
    let set = { ...setContext.sets[index] }
    setContext.updateSet(set)
    toggleModal()
  }

  const renderSets = sets => {
    if (sets && sets.length > 0) {
      return sets.map(set => {
        let index = set.id
        return (
          <SetViewer
            id={index}
            key={index}
            set={set}
            deleteSet={deleteSet}
            selectSet={handleSetSelect}
          />
        )
      })
    }
  }

  return (
    <React.Fragment>
      <Modal showModal={showModal} handleClose={toggleModal}>
        <SetCard done={done} saveSet={saveSet} />
      </Modal>

      {isEmpty(setContext.selectedSet) ? (
        <React.Fragment>
          <button
            css={formButton}
            style={{ float: 'none', margin: '10px auto' }}
            onClick={addSet}
          >
            Add Set
          </button>
          <div css={gridContainer}>{renderSets(setContext.sets)}</div>
        </React.Fragment>
      ) : (
        <SetCard done={done} saveSet={saveSet} />
      )}
    </React.Fragment>
  )
}

export default Sets
