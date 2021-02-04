import React from 'react'
import ProgramForm from '../components/programs/ProgramForm'
import { workouts } from '../test-data/workouts-all'
import ProgramProvider from '../context/ProgramProvider'

export default {
  title: 'ProgramForm',
  component: ProgramForm,
  decorators: [story => <ProgramProvider>{story()}</ProgramProvider>]
};

const Template = (args) => <ProgramForm {...args} />

export const NewProgram = Template.bind({});

const DEFAULT_ARGS = {
  selectWorkout: () => {}
}

NewProgram.args = {
  workouts: workouts,
  ...DEFAULT_ARGS
}
