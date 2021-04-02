// YourComponent.stories.js

import React from 'react'
import WorkoutHighlightCard from 'components/workouts/WorkoutHighlightCard'
import { workout_3_exGroups } from 'test-data/workouts-individual'

export default {
  title: 'Workouts/WorkoutHighlightCard',
  component: WorkoutHighlightCard,
};

const Template = (args) => (<div style={{width:'250px'}}><WorkoutHighlightCard {...args} /></div>)

export const HappyPath = Template.bind({});
// export const HappyPathWithSelected = Template.bind({});
// export const EmptyWorkouts = Template.bind({});

const DEFAULT_ARGS = {
  onClick: () => {},
  deleteItem: () => {},
  editItem: () => {},
  copyItem: () => {},
}

HappyPath.args = {
  ...DEFAULT_ARGS,
  disabled: false,
  selected: true,
  item: workout_3_exGroups,
  key: workout_3_exGroups.id,
  id: workout_3_exGroups.id,
}

// HappyPathWithSelected.args = {
//   ...DEFAULT_ARGS,
//   workouts: workouts,
//   disabled: false,
//   selected: [ workouts[1], workouts[10], workouts[20] ]
// }

// EmptyWorkouts.args = {
//   workouts: [],
//   ...DEFAULT_ARGS
// }
