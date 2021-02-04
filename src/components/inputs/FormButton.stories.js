// YourComponent.stories.js

import React from 'react'
import FormButton from 'components/inputs/FormButton'

// This default export determines where your story goes in the story list
export default {
  title: 'FormButton',
  component: FormButton,
};

const Template = (args) => <FormButton {...args} />

export const FirstStory = Template.bind({});

FirstStory.args = {
  /* the args you need here will depend on your component */
  value: 'test',
  onClick: () => { alert('clicked')}
};