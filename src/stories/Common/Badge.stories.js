// YourComponent.stories.js

import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Badge } from '@material-ui/core'

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -5,
    top: 5,
    border: `2px solid ${theme.palette.success.light}`,
    backgroundColor: theme.palette.success.light
  }
}))(Badge)

const BadgeExample = props => {
  return (
    <div style={{ width: '250px', height: '100px',border:'1px solid yellow',backgroundColor:'#eee' }}>
      <StyledBadge variant='dot' invisible={props.notes.length === 0}>
        {'Notes'}
      </StyledBadge>
    </div>
  )
}

// This default export determines where your story goes in the story list
export default {
  title: 'Common/BadgeExample',
  component: BadgeExample
}

const Template = args => <BadgeExample {...args} />

export const BadgeWithNotes = Template.bind({})
export const BadgeWithoutNotes = Template.bind({})

BadgeWithNotes.args = {
  notes: 'i have notes'
}

BadgeWithoutNotes.args = {
  notes: ''
}
