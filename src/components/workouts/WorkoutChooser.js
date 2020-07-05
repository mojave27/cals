/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { retrieve as retrieveWorkouts } from '../../api/workoutsApi'
import Table from '../tables/SimpleTableThemed'
import BlockHeader from '../BlockHeader'
import { styles as programStyles } from '../../styles/ProgramStyles'
import { styles as gridStyles } from '../../styles/GridStyles2'

const WorkoutChooser = props => {
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
    const response = await retrieveWorkouts()
    console.log({response})
    setWorkoutTemplates([...response])
    // woContext.updateWorkouts(response)
  }

  const chooseWorkout = workoutId => {
    console.log(workoutId)
    props.chooseWorkout(workoutId)
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
          onClick={ (e) => {chooseWorkout(wo.id)} }
        >
          <BlockHeader
            item={wo}
            selectItem={props.selectWorkout}
            onClick={ (e) => {chooseWorkout(wo.id)} }
          />
          <div>{renderSets(wo.exerciseGroups)}</div>
        </div>
      )
    })
  }

  const renderSets = exGroups => {
    return exGroups.map(exGroup => {
      let data = {
        headers: ['name', 'reps'],
        rows: [...exGroup.exercises]
      }
      return (
        <div key={exGroup.id} css={setBlock}>
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

export default WorkoutChooser
