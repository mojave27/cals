// YourComponent.stories.js

import React from 'react'
import { withReactContext } from 'storybook-react-context';
import WoDay from 'components/WoDay/WoDay'
import { context } from 'test-data/woday-context-for-test'


// This default export determines where your story goes in the story list
export default {
  title: 'WoDay',
  component: WoDay
}

const Template = args => <WoDay {...args} />

Template.decorators = [withReactContext({
  initialState: context
})];

Template.parameters.initialState = {
  initialState: {
    text: 'Initial #2',
  },
};

export const HappyPath = Template.bind({})

HappyPath.args = {
  onSave:  () => {},
  onClose: () => {},
}
