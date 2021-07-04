import { cloneDeep } from 'lodash'

export const convertTemplateToActiveWorkout = woTemplate => {
  console.log(`converting workout template to active workout`)

  let newExGroups = woTemplate.exerciseGroups.map(exGroup => {
    let newExercises = exGroup.exercises.map(exercise => {
      let newExercise = cloneDeep(exercise)
      newExercise.sets = [{weight: '', reps: ''}]
      return newExercise
    })

    let newExGroup = {}
    newExGroup.id = exGroup.id
    newExGroup.exercises = newExercises
    return newExGroup
  })

  woTemplate.exerciseGroups = newExGroups
  let workout = cloneDeep(woTemplate)
  return workout
}
