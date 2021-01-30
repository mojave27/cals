import { cloneDeep } from 'lodash'

export const convertTemplateToActiveWorkout = woTemplate => {
  console.log(`converting workout template to active workout`)
  let newExGroups = woTemplate.exerciseGroups.map(exGroup => {
    let newExercises = exGroup.exercises.map(exercise => {
      let newExercise = cloneDeep(exercise)
      delete newExercise.type
      newExercise.weight = ''
      newExercise.reps = ''
      return newExercise
    })
    let newExGroup = {}
    newExGroup.id = exGroup.id
    newExGroup.exercises = newExercises
    return newExGroup
  })

  let sets = [
    {
      id: 0,
      exerciseGroups: newExGroups
    }
  ]
  let workout = cloneDeep(woTemplate)
  workout.sets = sets
  return workout
}
