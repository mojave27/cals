// YourComponent.stories.js

import React from 'react'
import WorkoutList from '../components/workouts/WorkoutList'
import { workouts } from '../test-data/workouts-all'

// This default export determines where your story goes in the story list
export default {
  title: 'WorkoutList',
  component: WorkoutList,
};

const Template = (args) => <WorkoutList {...args} />

export const HappyPath = Template.bind({});
export const HappyPathWithSelected = Template.bind({});
export const EmptyWorkouts = Template.bind({});

const DEFAULT_ARGS = {
  selected: [],
  disabled: true,
  deleteWorkout: () => {},
  editWorkout: () => {},
  onClick: () => {},
}

HappyPath.args = {
  workouts: workouts,
  ...DEFAULT_ARGS
}

HappyPathWithSelected.args = {
  ...DEFAULT_ARGS,
  workouts: workouts,
  disabled: false,
  selected: [ workouts[1], workouts[10], workouts[20] ]
}

EmptyWorkouts.args = {
  workouts: [],
  ...DEFAULT_ARGS
}
