// YourComponent.stories.js

import React from 'react'
import Modal from 'components/modules/common/components/Modal'

// This default export determines where your story goes in the story list
export default {
  title: 'Common/Modal',
  component: Modal,
};

const Template = (args) => <Modal {...args} >{'test'}</Modal>;

export const FirstStory = Template.bind({});

FirstStory.args = {
  /* the args you need here will depend on your component */
};