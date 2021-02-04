// YourComponent.stories.js

import React from 'react'
import WorkoutCard from '../components/workouts/WorkoutCard'
import { workout_1_exGroup, workout_4_exGroups, workout_empty, workout_extra_data, workout_no_sets  } from '../test-data/workouts-individual'

// This default export determines where your story goes in the story list
export default {
  title: 'WorkoutCard',
  component: WorkoutCard,
};

const Template = (args) => <WorkoutCard {...args} />

export const OneExGroup = Template.bind({});
export const FourExGroups = Template.bind({});
export const Empty = Template.bind({});
export const ExtraData = Template.bind({});
export const NoSets = Template.bind({});

const DEFAULT_ARGS = {
  selected: false,
  width: '250px',
  deleteItem: () => {},
  editItem: () => {},
  onClick: () => {},
}

OneExGroup.args = {
  item: workout_1_exGroup, 
  ...DEFAULT_ARGS
}

FourExGroups.args = {
  item: workout_4_exGroups,
  ...DEFAULT_ARGS
}

Empty.args = {
  item: workout_empty,
  ...DEFAULT_ARGS
}

ExtraData.args = {
  item: workout_extra_data,
  ...DEFAULT_ARGS
}

NoSets.args = {
  item: workout_no_sets,
  ...DEFAULT_ARGS
}