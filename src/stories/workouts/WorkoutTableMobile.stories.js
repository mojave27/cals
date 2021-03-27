import React from 'react'
import WorkoutTableMobile from 'components/workouts/WorkoutTableMobile'
import { real_workout_1 } from 'test-data/workouts-individual'

// This default export determines where your story goes in the story list
export default {
  title: 'Workouts/WorkoutTableMobile',
  component: WorkoutTableMobile,
}

const Template = (args) => (<WorkoutTableMobile {...args} />)

export const HappyPath = Template.bind({})

HappyPath.args = {
  wo: real_workout_1
}
