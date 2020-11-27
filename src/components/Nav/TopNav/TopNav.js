// eslint-disable-next-line no-unused-vars
import { useContext, useState } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import OrigNav from './OrigNav'
import AppBar from '@material-ui/core/AppBar'


const TopNav = props => {
  // const classes = useStyles()
  return (
      <AppBar position='sticky' elevation={0} style={{marginBottom:'30px'}}>
        <OrigNav {...props} />
      </AppBar>
  )
}

export default TopNav
