/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import WorkoutTable from '../tables/WorkoutTable'
import { setBlock } from '../../styles/program'
import {
  basics,
  col25,
  col75,
  container,
  detailCard,
  row,
  stripe
} from '../../styles/main-styles'

const WorkoutDay = props => {

  const saveWorkout = async () => {

  }

  const handleCellChange = event => {
    let { id, value, name } = event.target
    // create the update object
    let update = {
      id: id,
      name: name,
      value: value
    }
    console.log(`id: ${id}, name: ${name}, value: ${value}`)
    // call update callback
     props.update( update )
  }

  const handleRowClick = event => {
    let id = event.currentTarget.id
    console.log(id)
  }

  const renderSets = sets => {
    if (sets && sets.length > 0) {
      return sets.map(set => {
        let data = {
          setId: set.id,
          headers: ['name', 'reps', 'weight', 'actual reps'],
          rows: [...set.exercises]
        }
        return (
          <div key={set.id} css={setBlock}>
            <WorkoutTable
              disabled={true}
              data={data}
              onClick={handleRowClick}
              onCellChange={handleCellChange}
            />
          </div>
        )
      })
    } else {
      return null
    }
  }

  return (
    <React.Fragment>
      <div css={detailCard}>
        <div css={container}>
          <div css={row}>
            <div css={col25}>
              <label htmlFor='workoutName'>Workout Name</label>
            </div>
            <div css={[col75,basics]} style={{borderTop:'none'}}>
             {props.workout.name}
            </div>
          </div>
          <div css={row}>
            <div css={col25}>
              <label htmlFor='workoutDescription'>Workout Description</label>
            </div>
            <div css={[col75,basics]} style={{borderTop:'none'}}>
                {props.workout.description}
            </div>
          </div>
        </div>

        <div css={stripe} style={{marginTop:'10px', marginBottom:'5px'}} />

        <div css={container}>
          <div style={{ display: 'block', paddingBottom: '10px' }}>
            {/* <div style={{ paddingBottom: '10px' }}>Sets</div> */}
            {renderSets(props.workout.sets)}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default WorkoutDay
