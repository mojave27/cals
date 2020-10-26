// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import SignOut from '../../Auth/SignOut'
import { Link as RouterLink } from '@reach/router'
import AdminMenu from './AdminMenu'
import CalcsMenu from './CalcsMenu'
import ManageMenu from './ManageMenu'
import ProgressMenu from './ProgressMenu'
import TrackerMenu from './TrackerMenu'

// import Button from '@material-ui/core/Button';

import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const NewNav = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Toolbar variant='dense'>
        <Button color='inherit' component={RouterLink} to='/'>
          Home
        </Button>
        <TrackerMenu />
        <ProgressMenu />
        <ManageMenu />
        <CalcsMenu />
        <AdminMenu />
        <Typography variant='h6' className={classes.title}>
        </Typography>
        <SignOut />
      </Toolbar>
    </div>
  )
}

export default NewNav
