import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Collapse,
  Divider,
  Drawer,
  Button,
  IconButton
} from '@material-ui/core'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Menu, MenuItem } from '@material-ui/core'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import LockIcon from '@material-ui/icons/Lock'
import AssignmentIcon from '@material-ui/icons/Assignment'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import EditIcon from '@material-ui/icons/Edit'
import ListAltIcon from '@material-ui/icons/ListAlt'
import ThemeContext from '../../../context/ThemeContext'
import { menuConfig } from './navMenuConfig'
import { Link as RouterLink } from '@reach/router'
import { Auth } from 'aws-amplify'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  toolbar: {
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex,
    borderBottom: `1px solid ${theme.color3.hex}`
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  paper: {
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end'
  },
  icon: {
    color: theme.color5_text.hex
  },
  divider: {
    backgroundColor: theme.color4.hex
  }
}))

const icon = iconName => {
  if (iconName.toLowerCase() === 'home') {
    return <HomeIcon fontSize={'small'} />
  }
  if (iconName.toLowerCase() === 'assignment') {
    return <AssignmentIcon fontSize={'small'} />
  }
  if (iconName.toLowerCase() === 'trendingup') {
    return <TrendingUpIcon fontSize={'small'} />
  }
  if (iconName.toLowerCase() === 'edit') {
    return <EditIcon fontSize={'small'} />
  }
  if (iconName.toLowerCase() === 'listalt') {
    return <ListAltIcon fontSize={'small'} />
  }
  if (iconName.toLowerCase() === 'lock') {
    return <LockIcon fontSize={'small'} />
  }
}

const TopNav = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  // const [expandSection, setExpandSection] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [expandSection, setExpandSection] = React.useState({})

  /* MENU LOGIC **************************************/
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleThemeSelect = themeName => {
    handleClose()
    themeContext.changeTheme(themeName)
  }
  /* *********************************************** */

  useEffect(() => {
    function setupForMenu() {
      let sections = {}
      menuConfig.forEach(item => {
        sections[item.name] = false
      })
      setExpandSection(sections)
    }
    setupForMenu()
    return () => {}
  }, [])

  const signOut = async () => {
    try {
      await Auth.signOut()
    } catch (error) {
      console.log('error signing out: ', error)
    }
  }

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const handleClick = name => {
    let updatedExpandSection = {}
    // set all to false - so any currently expanded sections will collapse
    for (const section of Object.entries(expandSection)) {
      updatedExpandSection[section] = false
    }
    updatedExpandSection[name] = !expandSection[name]

    setExpandSection(updatedExpandSection)
  }

  const sideNavItems = () => (
    <div className={classes.list} role='presentation'>
      {/* eslint-disable-next-line */}
      {menuConfig.map((item, index) => {
        if (item.type === 'divider') {
          return (
            <Divider
              classes={{ root: classes.divider }}
              key={`${item.name}-${index}`}
            />
          )
        }
        if (item.type === 'button') {
          return (
            <List key={`${item.name}-${index}`}>
              <ListItem
                button
                key={item.name}
                component={RouterLink}
                to={item.link.to}
                onClick={handleDrawerClose}
              >
                <ListItemIcon classes={{ root: classes.icon }}>
                  {item.icon ? icon(item.icon) : '-'}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </List>
          )
        }
        if (item.type === 'functionButton') {
          //TODO: implement
          return null
        }
        if (item.type === 'dropdown') {
          return (
            <React.Fragment key={`${item.name}-${index}`}>
              <ListItem
                id={item.name}
                button
                onClick={() => handleClick(item.name)}
              >
                <ListItemIcon classes={{ root: classes.icon }}>
                  {item.icon ? icon(item.icon) : '-'}
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {expandSection[item.name] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={expandSection[item.name]}
                timeout='auto'
                unmountOnExit
              >
                <List component='div' disablePadding>
                  {item.items.map((subitem, index) => {
                    return (
                      <ListItem
                        button
                        key={`${subitem.name}-${index}`}
                        className={classes.nested}
                        component={RouterLink}
                        to={subitem.to}
                        onClick={handleDrawerClose}
                      >
                        <ListItemIcon classes={{ root: classes.icon }}>
                          {subitem.icon ? icon(subitem.icon) : <div>{''}</div>}
                        </ListItemIcon>
                        <ListItemText primary={subitem.text} />
                      </ListItem>
                    )
                  })}
                </List>
              </Collapse>
            </React.Fragment>
          )
        }
      })}
    </div>
  )

  return (
    <div className={classes.root}>
      <AppBar position='sticky' elevation={0} style={{ marginBottom: '30px' }}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            wo-log
          </Typography>
          {/* ************************************** */}
          <Button
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleMenuClick}
          >
            Theme
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleThemeSelect('snow')}>Light</MenuItem>
            <MenuItem onClick={() => handleThemeSelect('woSheet')}>Medium</MenuItem>
            <MenuItem onClick={() => handleThemeSelect('vader')}>Dark</MenuItem>
          </Menu>
          {/* ************************************** */}
          <Button color='inherit' onClick={signOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor={'left'}
        open={drawerOpen}
        variant={'persistent'}
        onClose={handleDrawerClose}
        classes={{ paper: classes.paper }}
      >
        <div className={classes.drawerHeader}>
          <IconButton
            classes={{ root: classes.icon }}
            onClick={handleDrawerClose}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider classes={{ root: classes.divider }} />
        {sideNavItems()}
      </Drawer>
    </div>
  )
}

export default TopNav
