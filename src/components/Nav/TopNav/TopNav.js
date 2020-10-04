// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
// import { useContext, useState } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// import { Link } from '@reach/router'
// import { menuConfig } from './topNavMenuConfig'
// import ThemeContext from '../../../context/ThemeContext'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#fff'
  }
}))

const TopNav = props => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    console.log(event.currentTarget)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='fixed' elevation={0}>
      <Toolbar variant='dense'>
        <div>
          <Button
            className={classes.menuButton}
            aria-controls='home-button'
            aria-haspopup='true'
            onClick={handleClick}
          >
            home
          </Button>
          <Button
            className={classes.menuButton}
            aria-controls='tracker-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            trackers
          </Button>
          <Menu
            elevation={0}
            className={classes.menuButton}
            id='tracker-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>program</MenuItem>
            <MenuItem onClick={handleClose}>woday</MenuItem>
          </Menu>
          <Button
            className={classes.menuButton}
            aria-controls='manage-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            manage
          </Button>
          <Menu
            elevation={0}
            className={classes.menuButton}
            id='manage-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>workouts</MenuItem>
            <MenuItem onClick={handleClose}>exercises</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TopNav
