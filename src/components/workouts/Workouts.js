/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext, useState, useEffect } from 'react'
import WoContext from '../../context/WoContext'
import { retrieve, deleteWorkout as deleteWorkoutApi } from '../../api/workoutsApi'
import Table from '../tables/SimpleTable'
import Modal from '../Modal'
import WorkoutForm from './WorkoutForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { workoutBlock, workoutHeader, setBlock } from '../../styles/program'
import { gridContainer, gridItem } from '../../styles/gridStyles'
import { findIndexOfId } from '../ArrayUtils'

const Workouts = props => {
  let context = useContext(WoContext)
  const [workouts, setWorkouts] = useState([])
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(-1)

  useEffect(() => {
    fetchMyAPI()
  }, [])

  //TODO: render rows of 5
  const renderWorkouts = workouts => {
    return workouts.map(wo => {
      return (
        <div
          key={wo.id}
          id={wo.id}
          css={[workoutBlock, gridItem]}
          style={{marginLeft: '5px', marginBottom: '10px'}}
        >
          <div css={workoutHeader}>
            {wo.name}
            <FontAwesomeIcon
              alt={'remove workout from program'}
              id={wo.id}
              style={{ marginLeft: '10px', float: 'right' }}
              icon={faTrashAlt}
              onClick={deleteWorkout}
            />
            <FontAwesomeIcon
              alt={'edit workout'}
              id={wo.id}
              style={{ marginLeft: '10px', float: 'right' }}
              icon={faEdit}
              onClick={editWorkout}
            />
          </div>
          <div>{renderSets(wo.sets)}</div>
        </div>
      )
    })
  }

  const renderSets = sets => {
    // console.log(`sets: ${JSON.stringify(sets)}`)
    return sets.map(set => {
      let data = {
        headers: ['name', 'reps'],
        rows: [...set.exercises]
      }
      return (
        <div key={set.id} css={setBlock}>
          <Table data={data} disabled={true} />
        </div>
      )
    })
  }

  const editWorkout = event => {
    let id = event.currentTarget.id
    setSelectedWorkoutToContext(id)
    // setShowWorkoutModal(true)
    toggleModal()
  }

  const setSelectedWorkoutToContext = workoutId => {
    let index = findIndexOfId(workoutId, workouts)
    if (index != -1) {
      context.updateWorkout(workouts[index])
    }
  }

  const deleteWorkout = async event => {
    let id = event.currentTarget.id
    console.log(`deleting workout with id: ${id}`)
    await deleteWorkoutApi(id)
    fetchMyAPI()
    // update array in state as well?  or force refresh/useEffect call?
    
  }

  const fetchMyAPI = async () => {
    const response = await retrieve()
    setWorkouts(response)
  }

  const toggleModal = () => {
    let newValue = !showWorkoutModal 
    setShowWorkoutModal(newValue)
  }

  return (
    showWorkoutModal
    ? <Modal handleClose={toggleModal}>
        <WorkoutForm workoutId={selectedWorkoutId} />
      </Modal>
    : (workouts.length > 0
    ? <div css={gridContainer}>{renderWorkouts(workouts)}</div>
    : <div>Workouts</div>)
  )
}

export default Workouts
