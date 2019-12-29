/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useEffect } from 'react'
import WoContext from '../../context/WoContext'
import { retrieve as retrieveWorkouts } from '../../api/workoutsApi'
import Table from '../tables/SimpleTable'
import BlockHeader from '../BlockHeader'

import { workoutBlock, setBlock } from '../../styles/program'
import { gridContainer, gridItem } from '../../styles/gridStyles'

const WorkoutList = props => {
  let woContext = useContext(WoContext)

  useEffect(() => {
    fetchMyAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMyAPI = async () => {
    const response = await retrieveWorkouts()
    woContext.updateWorkouts(response)
  }

  const renderWorkouts = workouts => {
    console.log('rendering workouts...')
    return workouts.map(wo => {
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
      {woContext.workouts.length > 0 ? (
        <div css={gridContainer}>{renderWorkouts(woContext.workouts)}</div>
      ) : (
        <div>Workouts</div>
      )}
    </React.Fragment>
  )
}

export default WorkoutList
