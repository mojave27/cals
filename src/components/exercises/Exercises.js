import React, { useState, useEffect } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import retrieve from '../../api/retrieveExercises'
import { formButton } from '../../styles/main-styles'
import Modal from '../Modal'
import Exercise from '../exercises/Exercise'
import Table from '../tables/SortableTable'
import { dynamicSort } from '../ArrayUtils'

const Exercises = props => {
  const [exercises, setExercises] = useState([])
  const [selectedExerciseIds, setSelectedExerciseIds] = useState([])
  const [showModal, setShowModal] = useState(false)

  const columns = React.useMemo(
    () => [
      // Let's make a column for selection
      {
        id: 'selection',
        // The header can use the table's getToggleAllRowsSelectedProps method
        // to render a checkbox
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => (
          <div>
            {/* <input onClick={handleRowSelect} data-id={row.values.id} type="checkbox" {...row.getToggleRowSelectedProps()} /> */}
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      {
        Header: 'name',
        accessor: 'name'
      },
      // {
      //   Header: 'reps',
      //   accessor: 'reps'
      // },
      {
        Header: 'type',
        accessor: 'type'
      },
      {
        Header: 'id',
        accessor: 'id'
      }
    ],
    []
  )

  useEffect(() => {
    let didCancel = false
    async function fetchMyAPI() {
      const response = await retrieve()
      if (!didCancel) {
        console.log({ response })
        // Ignore if we started fetching something else
        setExercises(response)
      }
    }

    fetchMyAPI()
    return () => {
      didCancel = true
    } // Remember if we start fetching something else
  }, [])

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const done = () => {
    retrieve().then(exercises => {
      this.setState({
        exercises: exercises,
        showModal: false
      })
    })
  }

  const submitTable = data => {
    console.log(data)
  }

  // const handleRowSelect = event => {
  //   let id = event.currentTarget.dataset.id
  //   let updatedSelectedExerciseIds = [...selectedExerciseIds]
  //   updatedSelectedExerciseIds.push(id)
  //   let uniqueIds = new Set(updatedSelectedExerciseIds)
  //   updatedSelectedExerciseIds = Array.from(uniqueIds)
  //   setSelectedExerciseIds(updatedSelectedExerciseIds)
  // }

  const renderExercises = exercises => {
    let sortedExercises = [...exercises]
    sortedExercises.sort(dynamicSort('name', true))
    return <Table callback={submitTable} edit={true} columns={columns} data={sortedExercises} />
  }

  return showModal ? (
    <Modal handleClose={toggleModal}>
      <Exercise done={done} />
    </Modal>
  ) : (
      <React.Fragment>
        <div style={{ maxWidth: '500px', margin: '0px auto' }}>
          <button
            css={formButton}
            style={{ float: 'none', margin: '10px 10px' }}
            onClick={toggleModal}
          >
            Add Exercise
        </button>
          {renderExercises(exercises)}
        </div>
      </React.Fragment>
    )

}

export default Exercises
