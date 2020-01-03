/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import SetTable from '../tables/SetTable'
import ExerciseTable from '../tables/ExerciseTable'
import { setBlock } from '../../styles/program'
import { trackerSet } from '../../styles/programTracker.styles'
import { topRight } from '../../styles/buttonStyles'
import {
  formButton,
  container,
  detailCard,
  row,
  stripe,
  basicButtonSmall
} from '../../styles/main-styles'
import { Row } from '../../styles/table'

const WorkoutTracker = props => {
  const handleCellChange = update => {
    update.workoutId = props.workout.id
    props.update(update)
  }

  const addDate = () => {
    props.addDate(props.workout.id)
  }

  const editSet = event => {
    let setId = event.target.parentNode.id
    console.log(`setId: ${setId}`)
  }

  const renderSets = workout => {
    if (workout.sets && workout.sets.length > 0) {
      return workout.sets.map(set => {
        let data = {
          days: workout.days,
          setId: set.id,
          headers: ['name', 'reps', 'weight', 'actual reps'],
          rows: [...set.exercises]
        }
        return (
          <div key={set.id} css={[Row, setBlock, trackerSet]}>
            <SetTable data={data} editSet={editSet} />
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
      <div className={'detailCard'} css={detailCard}>
        <div className={'container'} css={container}>
          <div onClick={props.done} css={topRight}>
            &times;
          </div>
          <div css={row}>{props.workout.name}</div>
          <div css={row}>{props.workout.description}</div>
        </div>

        <div css={stripe} style={{ paddingTop: '5px', paddingBottom: '5px' }} />

        <div
          data-class={'container'}
          css={container}
          style={{
            margin: '20px 25px',
            display: 'inline-block',
            maxWidth: '90%'
          }}
        >
          <div css={row}>
            <input
              type='submit'
              value='Add Day'
              css={[basicButtonSmall, { float: 'right' }]}
              onClick={addDate}
            />
          </div>
          <div style={{ display: 'block', padding: '10px 0px' }}>
            {renderSets(props.workout)}
          </div>
        </div>
        <div css={row}>
          <input
            type='submit'
            value='Save'
            css={[formButton, { float: 'right' }]}
            onClick={props.save}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default WorkoutTracker
