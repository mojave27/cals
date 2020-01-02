/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import SetTable from '../tables/SetTable'
import ExerciseTable from '../tables/ExerciseTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { setBlock } from '../../styles/program'
import { topRight } from '../../styles/buttonStyles'
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

  const addDate = () => {
    props.addDate(props.workout.id)
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
          <div onClick={props.done} css={topRight}>&times;</div>
          <div css={row}>{props.workout.name}</div>
          <div css={row}>{props.workout.description}</div>
        </div>

        <div css={stripe} style={{ paddingTop: '5px', paddingBottom: '5px' }} />

        <div css={container} style={{margin:'20px 25px', display:'inline-block'}}>
          <div style={{ display: 'block', padding: '10px 0px' }}>
            {renderSets(props.workout)}
            <FontAwesomeIcon alt={'add date'} icon={faPlus} onClick={addDate} style={{ position:'relative', top:'-15', right:'-5' }}/>
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
