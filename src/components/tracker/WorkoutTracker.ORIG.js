/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import WorkoutTable from '../tables/WorkoutTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { setBlock } from '../../styles/program'
import {
  pointer,
  container,
  detailCard,
  row,
  stripe
} from '../../styles/main-styles'
import { Row, Column } from '../../styles/table'

const WorkoutTracker = props => {
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
    props.update(update)
  }

  const handleRowClick = event => {
    let id = event.currentTarget.id
    console.log(id)
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
          <div key={set.id} css={[Row, setBlock]}>
            <WorkoutTable
              disabled={true}
              data={data}
              onClick={handleRowClick}
              onCellChange={handleCellChange}
            />
            <div css={[Column, pointer]}>
              <FontAwesomeIcon
                alt={'add date'}
                id={set.id}
                style={{ marginLeft: '10px', float: 'right' }}
                icon={faPlus}
                onClick={addDate}
              />
            </div>
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

        <div css={container}>
          <div style={{ display: 'block', paddingBottom: '10px' }}>
            {renderSets(props.workout)}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default WorkoutTracker
