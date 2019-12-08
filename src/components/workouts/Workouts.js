/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState, useEffect } from 'react'
import Table from '../tables/SimpleTable'
import { retrieve, deleteWorkout as deleteWorkoutApi } from '../../api/workoutsApi'
import { workoutBlock, workoutHeader, setBlock } from '../../styles/program'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Workouts = props => {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    fetchMyAPI()
  }, [])

  //TODO: render rows of 5
  const renderWorkouts = workouts => {
    // let maxSets = this.getMaxSets(this.state.program.workouts)
    return workouts.map(wo => {
      return (
        <div
          key={wo.id}
          id={wo.id}
          css={workoutBlock}
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
          <Table data={data} />
        </div>
      )
    })
  }

  const editWorkout = event => {
    let id = event.currentTarget.id
    console.log(`would edit workout with id: ${id}`)
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

  return (
    workouts.length > 0
    ? <div>{renderWorkouts(workouts)}</div>
    : <div>Workouts</div>
  )
}

export default Workouts
