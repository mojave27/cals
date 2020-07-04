/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { retrieveWorkoutTemplates } from '../../api/workoutsApi'
import Table from '../tables/SimpleTableThemed'
import BlockHeader from '../BlockHeader'


import { styles as programStyles } from '../../styles/ProgramStyles'
// import { gridContainer, gridItem } from '../../styles/gridStyles'
import { styles as gridStyles } from '../../styles/GridStyles2'

const WorkoutList = props => {
  let [ workoutTemplates, setWorkoutTemplates ] = useState([])
  // let woContext = useContext(WoContext)
  let themeContext = useContext(ThemeContext)
  let { workoutBlock, setBlock } = programStyles(themeContext.theme)
  let { gridContainer, gridItem } = gridStyles(themeContext.theme)

  useEffect(() => {
    fetchMyAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMyAPI = async () => {
    const response = await retrieveWorkoutTemplates()
    console.log({response})
    setWorkoutTemplates([...response])
    // woContext.updateWorkouts(response)
  }

  const renderWorkouts = workouts => {
    console.log('rendering workouts...')
    return workouts.map(wo => {
      // console.log('wo.................')
      // console.log({wo})
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
      {workoutTemplates.length > 0 ? (
        <div css={gridContainer} >{renderWorkouts(workoutTemplates)}</div>
      ) : (
        <div>Workouts</div>
      )}
    </React.Fragment>
  )
}

export default WorkoutList
