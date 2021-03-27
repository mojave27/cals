import React from 'react'
import WoDay from 'components/WoDay/WoDay'
import WoDayProvider from 'context/WoDayProvider'

// This default export determines where your story goes in the story list
export default {
  title: 'WoDay/WoDay',
  component: WoDay,
}

const Template = (args) => (<WoDayProvider><WoDay {...args} /></WoDayProvider>)

export const HappyPath = Template.bind({})

HappyPath.args = {}
