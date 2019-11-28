/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useEffect, useState } from 'react'
import retrieve from '../../api/retrieveExercises'
import Table from '../tables/Table'

import { row, col25, col75, card } from '../../styles/main-styles'

const SetViewer = props => {
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    let didCancel = false

    async function fetchMyAPI() {
      const response = await retrieve()
      if (!didCancel) {
        // Ignore if we started fetching something else
        setExercises(response)
      }
    }

    fetchMyAPI()
    return () => {
      didCancel = true
    } // Remember if we start fetching something else
  }, [])

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

  const findExerciseById = id => {
    let index = exercises.findIndex(exercise => {
      return Number(exercise.id) === Number(id)
    })
    return exercises[index]
  }

  const inflateExercises = setExercises => {
    return setExercises.map(partialExercise => {
      let fullExercise = findExerciseById(partialExercise.id)
      fullExercise.reps = partialExercise.reps
      return fullExercise
    })
  }

  return (
    <div css={card} style={{maxWidth:'300px', margin: '0px auto'}} onClick={props.onClick}>
      <div css={row}>
        <div css={col25}>
          <label htmlFor='whatevs'>set {props.set.id}</label>
        </div>
        <div css={col75}>
          <div css={row}>
            {/* handle when exercises aren't loaded yet */}
            {exercises.length > 0
            ? renderExercises(inflateExercises(props.set.exercises))
            : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetViewer
