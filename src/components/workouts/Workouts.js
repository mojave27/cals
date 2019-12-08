/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState, useEffect } from 'react'
import Table from '../tables/SimpleTable'
import { retrieve } from '../../api/workoutsApi'
import { workoutBlock, workoutHeader, setBlock } from '../../styles/program'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Workouts = props => {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    let didCancel = false

    async function fetchMyAPI() {
      const response = await retrieve()
      if (!didCancel) {
        // Ignore if we started fetching something else
        setWorkouts(response)
      }
    }

    fetchMyAPI()
    return () => {
      didCancel = true
    } // Remember if we start fetching something else
  }, [])

  // render rows of 5
  const renderWorkouts = workouts => {
    // let maxSets = this.getMaxSets(this.state.program.workouts)
    return workouts.map(wo => {
      return (
        <div
          key={wo.id}
          id={wo.id}
          css={workoutBlock}
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

  const deleteWorkout = event => {
    let id = event.currentTarget.id
    console.log(`would delete workout with id: ${id}`)
  }

  return (
    workouts.length > 0
    ? <div>{renderWorkouts(workouts)}</div>
    : <div>Workouts</div>
  )
}

export default Workouts
