// YourComponent.stories.js

import React from 'react'
import DesktopNav from 'components/modules/nav/DesktopNav'

// This default export determines where your story goes in the story list
export default {
  title: 'DesktopNav',
  component: DesktopNav,
};

const Template = (args) => <DesktopNav {...args} />

export const Standard = Template.bind({});

Standard.args = { }
