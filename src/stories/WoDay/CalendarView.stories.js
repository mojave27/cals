import React from 'react'
import CalendarView from 'components/WoDay/CalendarView'
import { one_month_wodays } from 'test-data/woday-test-data'

// This default export determines where your story goes in the story list
export default {
  title: 'WoDay/CalendarView',
  component: CalendarView,
}

const Template = (args) => (<CalendarView {...args} />)

export const HappyPath = Template.bind({})

HappyPath.args = {
  items: one_month_wodays,
  onSelect: () => {}
}
