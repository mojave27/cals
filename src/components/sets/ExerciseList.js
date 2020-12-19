/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

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
