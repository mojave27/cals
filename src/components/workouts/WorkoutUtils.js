import React from 'react'
import { isEmpty } from 'lodash'

export const cardioBadge = ({ item }) => {
  return cardioName(item)
}

export const cardioName = (item) => {
  let length = item.cardio ? item.cardio.exercises.length : 0
  if (Number(length) === 0) return ''

  let names = []
  item.cardio.exercises.forEach((ex) => {
    if (cardioStarted(ex)) {
      names.push(
        <font key={ex.type}>
          {ex.type}
          <br />
        </font>
      )
    } else {
      names.push(
        <font color='pink' key={ex.type}>
          {`${ex.type}`}
          <br />
        </font>
      )
    }
  })
  return names
}

// item is typically a woday object
export const cardioStarted = (item) => {
  let isCardioStarted = false
  if (hasCardio(item) === false) return false
  item.cardio.exercises.forEach(ex => {
    console.log(JSON.stringify(ex))
    console.log(ex.duration.length)
    console.log(ex.distance.length)
    if (ex.duration.length > 0) isCardioStarted = true
    if (ex.distance.length > 0) isCardioStarted = true
  })
  console.log(`isCardioStarted: ${isCardioStarted}`)
  return isCardioStarted
}

export const hasCardio = item => {
  if (item.cardio === undefined) return false
  let exercises = item.cardio.exercises ?? []
  return exercises.length > 0 ? true : false
}

export const hasWorkout = item => {
  if (item.wo === undefined && item.workouts.length === 0)
    return false

  if (item.wo !== undefined) {
    if (item.wo.exerciseGroups === undefined) return false
    if (
      item.wo.exerciseGroups &&
      item.wo.exerciseGroups[0].exercises.length === 0
    ) {
      return false
    }
    return true
  }
  return true
}

export const workoutName = (item) => {
  if (item.wo !== undefined) return item.wo.name

  let names = []
  if (isEmpty(item.workouts) || item.workouts.length === 0) return 'none'
  item.workouts.forEach((wo) => {
    if (workoutStarted(wo)) {
      names.push(
        <font key={wo.name}>
          {wo.name}
          <br />
        </font>
      )
    } else {
      names.push(
        <font color='pink' key={wo.name}>
          {`${wo.name}`}
          <br />
        </font>
      )
    }
  })
  return names
}

export const workoutStarted = wo => {
  let isStarted = false
  wo.exerciseGroups.forEach(exGroup => {
    exGroup.exercises.forEach(ex => {
      ex.sets.forEach(set => {
        if (!isEmpty(set.reps) && Number(set.reps) !== 0) isStarted = true
      })
    })
  })
  return isStarted
}
