// import React from 'react'
// import { cardioExerciseStarted } from 'components/workouts/WorkoutUtils'
import { cloneDeep } from 'lodash'

// const cardioBadge = ({ item }) => {
//   return cardioName(item)
// }

// const cardioName = (item) => {
//   let length = item.cardio ? item.cardio.exercises.length : 0
//   if (Number(length) === 0) return ''

//   let names = []
//   item.cardio.exercises.forEach((ex, index) => {
//     if (cardioExerciseStarted(ex)) {
//       names.push(
//         <font key={`${ex.type}-${index}`}>
//           {ex.type}
//           <br />
//         </font>
//       )
//     } else {
//       names.push(
//         <font color='pink' key={ex.type}>
//           {`${ex.type}`}
//           <br />
//         </font>
//       )
//     }
//   })
//   return names
// }

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const convertExistingWodayToNew = (woday) => {
  let newWoday = cloneDeep(woday)
  // update id
  newWoday.id = ''
  // update date
  let dt = new Date()
  newWoday.date.year = dt.getFullYear()
  newWoday.date.month = dt.getMonth()
  newWoday.date.day = dt.getDate()

  // update stats
  newWoday.weight = ''
  newWoday.goals = ''
  newWoday.duration = ''
  newWoday.energy = 10
  newWoday.sleep = 10

  // update notes
  newWoday.notes = `\n\n-------------------------\nPrevious Notes:\n${woday.notes}`

  // copy workouts for reference?
  // ... nah - cuz this won't help with non-copied wodays

  // update cardio
  if (
    typeof woday.cardio.exercises !== 'undefined' &&
    woday.cardio.exercises.length > 0
  ) {
    newWoday.cardio.exercises = woday.cardio.exercises.map((ex) => {
      let newEx = cloneDeep(ex)
      newEx.duration = ''
      newEx.distance = ''
      newEx.heartRate = ''
      return newEx
    })
  }

  // update workout reps
  let updatedWorkouts = woday.workouts.map((wo) => {
    let updatedExGroups = wo.exerciseGroups.map((exGroup) => {
      let updatedExercises = exGroup.exercises.map((ex) => {
        if (typeof ex.sets != 'undefined' && ex.sets.length > 0) {
          ex.sets.forEach((set) => {
            set.reps = ''
          })
        }
        return ex
      })
      exGroup.exercises = updatedExercises
      return exGroup
    })
    wo.exerciseGroups = updatedExGroups
    return wo
  })
  newWoday.workouts = updatedWorkouts

  return newWoday
}
