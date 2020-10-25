/** @jsx jsx */
import { jsx } from '@emotion/core'
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import Table from '../tables/SimpleTable'
import BlockHeader from '../BlockHeader'

import { styles as programStyles } from '../../styles/ProgramStyles'
import { styles as gridStyles } from '../../styles/GridStyles2'

const WorkoutList = props => {
  let themeContext = useContext(ThemeContext)
  let { workoutBlock, setBlock } = programStyles(themeContext.theme)
  let { gridItem } = gridStyles(themeContext.theme)

  const renderExerciseGroups = exerciseGroups => {
    return exerciseGroups.map( (exGroup, index) => {
      let data = {
        headers: ['name', 'reps'],
        rows: [...exGroup.exercises]
      }
      return (
        <div key={`${exGroup.id}-${index}`} css={setBlock}>
          <Table data={data} disabled={true} />
        </div>
      )
    })
  }

  return props.workouts.map(wo => {
    return (
      <div
        key={wo.id}
        id={wo.id}
        css={[workoutBlock, gridItem]}
        style={{ marginLeft: '5px', marginBottom: '10px' }}
      >
        <BlockHeader
          item={wo}
          deleteItem={props.deleteWorkout}
          editItem={props.editWorkout}
        />
        <div>{renderExerciseGroups(wo.exerciseGroups)}</div>
      </div>
    )
  })
}

export default WorkoutList
