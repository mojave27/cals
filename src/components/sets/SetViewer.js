/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useEffect, useState } from 'react'
import { retrieve } from '../../api/exercisesApi'
import Table from '../tables/SimpleTable'

import { row, col25, col75, card } from '../../styles/main-styles'

const SetViewer = props => {

  const renderExercises = exercises => {
    let data = {
      headers: ['name', 'reps'],
      rows: exercises
    }
    return (
      <div style={{maxWidth: '200px', margin: '0px auto'}}>
        <Table data={data} />
      </div>
    )
  }

  return (
    <div css={card} style={{maxWidth:'300px', margin: '0px auto'}} id={props.id} onClick={props.onClick}>
      <div css={row}>
        <div css={col25}>
          <label htmlFor='whatevs'>set {props.set.id}</label>
        </div>
        <div css={col75}>
          <div css={row}>
            {/* handle when exercises aren't loaded yet */}
            {props.set.exercises.length > 0
            ? renderExercises(props.set.exercises)
            : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetViewer
