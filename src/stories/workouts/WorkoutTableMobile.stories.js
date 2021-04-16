import React from 'react'
import WorkoutTableMobile from 'components/workouts/WorkoutTableMobile'
import { real_workout_1, real_workout_2 } from 'test-data/workouts-individual'

// This default export determines where your story goes in the story list
export default {
  title: 'Workouts/WorkoutTableMobile',
  component: WorkoutTableMobile,
}

const Template = (args) => (<WorkoutTableMobile {...args} />)

export const HappyPath = Template.bind({})
export const WithExerciseNotes = Template.bind({})

HappyPath.args = {
  wo: real_workout_1
}

WithExerciseNotes.args = {
  wo: real_workout_2
}
