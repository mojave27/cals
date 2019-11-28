/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { detailCard, container, stripe } from '../../styles/main-styles'
import Set from '../sets/Set'

const Workout = props => {

  const renderSets = (sets) => {
    return sets.map( set => {
      return (<Set key={set.id} set={set} />)
    })
  }

  return (
    <React.Fragment>
      <div css={detailCard}>
        <div css={container}>
          <h3>{props.workout.name}</h3>
        </div>
        <div css={stripe} />

        <div css={stripe} />
        <div css={container} style={{ backgroundColor: 'white' }}>
          <h3>
            <b>{props.workout.description}</b>
          </h3>
        </div>
        <div css={container}></div>

        <div css={container}>
          <div style={{ display: 'block', paddingBottom: '10px' }}>
            <div style={{ paddingBottom: '10px' }}>{renderSets(props.workout.sets)}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Workout
