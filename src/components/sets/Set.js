/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import { detailCard, container, stripe, promo, warn } from '../../styles/theme'
import ExerciseList from './ExerciseList'

const Set = props => {
  return (
    <React.Fragment>
    <div css={detailCard} style={{margin:'20px'}}>
    <div css={stripe} />
    <div css={container} >
      <ExerciseList exercises={props.set.exercises} />
    </div>
  </div>
  </React.Fragment>
  )
}

export default Set
