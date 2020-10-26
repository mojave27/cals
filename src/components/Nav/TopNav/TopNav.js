// eslint-disable-next-line no-unused-vars
import { useContext, useState } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { makeStyles } from '@material-ui/core/styles'
// import OrigNav from './OrigNav'
import NewNav from './NewNav'
import AppBar from '@material-ui/core/AppBar'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}))

const TopNav = props => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position='sticky' elevation={0} style={{ marginBottom: '30px' }}>
        <NewNav />
      </AppBar>
    </div>
  )
}

export default TopNav
