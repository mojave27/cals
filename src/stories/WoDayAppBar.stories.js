// YourComponent.stories.js

import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import WoDayAppBar from 'components/WoDay/WoDayAppBar'



// This default export determines where your story goes in the story list
export default {
  title: 'WoDayAppBar',
  component: WoDayAppBar
}

const Template = args => <WoDayAppBar {...args} />

export const HappyPath = Template.bind({})

HappyPath.args = {
  onSave:  () => {},
  onClose: () => {},
}
