/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import SetTable from '../tables/SetTable'
import ExerciseTable from '../tables/ExerciseTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { setBlock } from '../../styles/program'
import {
  formButton,
  pointer,
  container,
  detailCard,
  row,
  stripe
} from '../../styles/main-styles'
import { Row } from '../../styles/table'

const WorkoutTracker = props => {
  const handleCellChange = update => {
    update.workoutId = props.workout.id
    props.update(update)
  }

  const addDate = event => {
    const setId = event.currentTarget.id
    const update = {
      setId: setId,
      workoutId: props.workout.id
    }
    props.addDate(update)
  }

  const renderSets = workout => {
    if (workout.sets && workout.sets.length > 0) {
      return workout.sets.map(set => {
        let data = {
          dates: workout.dates,
          setId: set.id,
          headers: ['name', 'reps', 'weight', 'actual reps'],
          rows: [...set.exercises]
        }
        return (
          <div
            key={set.id}
            css={[Row, setBlock]}
            style={{ minWidth: '700px', display: 'inline-block' }}
          >
            <SetTable data={data} />
            <ExerciseTable data={data} onCellChange={handleCellChange} />
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
          <div css={row}>{props.workout.name}</div>
          <div css={row}>{props.workout.description}</div>
        </div>

        <div css={stripe} style={{ paddingTop: '5px', paddingBottom: '5px' }} />
        <div css={pointer}>
          <FontAwesomeIcon alt={'add date'} icon={faPlus} onClick={addDate} />
        </div>

        <div css={container}>
          <div style={{ display: 'block', paddingBottom: '10px' }}>
            {renderSets(props.workout)}
          </div>
        </div>
        <div css={row}>
          <input
            type='submit'
            value='Save Workout'
            css={[formButton, { float: 'right' }]}
            onClick={props.save}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default WorkoutTracker
