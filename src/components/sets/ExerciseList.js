/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import { detailCard, container, stripe, promo, warn } from '../../styles/theme'

const ExercistList = props => {

  const renderExercises = exercises => {
    return exercises.map( exercise => {
      return (<div>{exercise.name} | {exercise.reps}</div>)
    })
  }

  return (
  <React.Fragment>
    test
    {renderExercises(props.exercises)}
  </React.Fragment>
  )
}

export default ExercistList
