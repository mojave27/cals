/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState, useEffect } from 'react'
import { retrieve as retrieveWorkoutDays } from '../../api/workoutsApi'
import Table from '../tables/SimpleTable'
import BlockHeader from '../BlockHeader'

import { workoutBlock, setBlock } from '../../styles/program'
import { gridContainer, gridItem } from '../../styles/gridStyles'

const WorkoutDayList = props => {
  let [workoutDays, setWorkoutDays] = useState([])

  useEffect(() => {
    fetchMyAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMyAPI = async () => {
    const response = await retrieveWorkoutDays()
    setWorkoutDays(response)
  }

  const renderWorkoutDays = workoutDays => {
    return workoutDays.map(wo => {
      return (
        <div
          key={wo.id}
          id={wo.id}
          css={[workoutBlock, gridItem]}
          style={{ marginLeft: '5px', marginBottom: '10px' }}
        >
          <BlockHeader
            item={wo}
            selectItem={props.selectWorkout}
          />
          <div>{renderSets(wo.sets)}</div>
        </div>
      )
    })
  }

  const renderSets = sets => {
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

  return (
    <React.Fragment>
      {workoutDays.length > 0 ? (
        <div css={gridContainer}>{renderWorkoutDays(workoutDays)}</div>
      ) : (
        <div>WorkoutDays</div>
      )}
    </React.Fragment>
  )
}

export default WorkoutDayList
