/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useEffect, useState } from 'react'
import retrieve from '../../api/retrieveExercises'

import {
  row,
  col25,
  col75,
  card,
} from '../../styles/main-styles'

const SetViewer = props => {
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    let didCancel = false

    async function fetchMyAPI() {
      const response = await retrieve()
      if (!didCancel) {
        // Ignore if we started fetching something else
        console.log(response)
        setExercises(response)
      }
    }

    fetchMyAPI()
    return () => {
      didCancel = true
    } // Remember if we start fetching something else
  }, [])

  const renderExercises = exercises => {
    console.log(JSON.stringify(exercises))
    return exercises.map(exercise => {
        return (
        <div
        //   id={exercise.id}
        //   key={exercise.id}
        >
          {/* name: {exercise.name} - type: {exercise.type} - id: {exercise.id} */}
        </div>
        )
    })

  }

  const inflateExercises = partialExercises => {
    return partialExercises.map(partialExercise => {
      let index = exercises.findIndex( exercise => {
        return exercise.id == partialExercise.id
      })
      let ex = exercises[index]
      return ex
    })

  }

  return (
    <div css={card}>
      <div css={row}>
        <div css={col25}>
          <label htmlFor='whatevs'>{props.set.id}</label>
        </div>
        <div css={col75}>
          <div css={row} >
            {renderExercises( inflateExercises(props.set.exercises) )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetViewer
