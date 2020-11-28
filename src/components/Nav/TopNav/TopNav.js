import React, { useContext, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import LockIcon from '@material-ui/icons/Lock'
import AssignmentIcon from '@material-ui/icons/Assignment'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import EditIcon from '@material-ui/icons/Edit'
import ListAltIcon from '@material-ui/icons/ListAlt'
import ThemeContext from '../../../context/ThemeContext'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { menuConfig } from './navMenuConfig'
import { Link as RouterLink } from '@reach/router'

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
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-end'
  }
}))

const icon = iconName => {
  if( iconName.toLowerCase() === 'home' ) {
    return (<HomeIcon fontSize={'small'} />)
  }
  if( iconName.toLowerCase() === 'assignment' ) {
    return (<AssignmentIcon fontSize={'small'} />)
  }
  if( iconName.toLowerCase() === 'trendingup' ) {
    return (<TrendingUpIcon fontSize={'small'} />)
  }
  if( iconName.toLowerCase() === 'edit' ) {
    return (<EditIcon fontSize={'small'} />)
  }
  if( iconName.toLowerCase() === 'listalt' ) {
    return (<ListAltIcon fontSize={'small'} />)
  }
  if( iconName.toLowerCase() === 'lock' ) {
    return (<LockIcon fontSize={'small'} />)
  }
}

const TopNav = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  const [expandSection, setExpandSection] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const handleClick = () => {
    setExpandSection(!expandSection)
  }

  const sideNavItems = () => (
    <div
      className={classes.list}
      role='presentation'
    >
      {/* eslint-disable-next-line */}
      {menuConfig.map(item => {
        if (item.type === 'divider') {
          return (<Divider />)
        }
        if (item.type === 'button') {
          return (
            <List>
              <ListItem button key={item.name} component={RouterLink} to={item.link.to}>
                <ListItemIcon>
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
            <React.Fragment>
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  {item.icon ? icon(item.icon) : '-'}
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {expandSection ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={expandSection} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {item.items.map(subitem => {
                    return (
                      <ListItem button key={subitem.name} className={classes.nested} component={RouterLink} to={subitem.to}>
                        <ListItemIcon>
                          {subitem.icon ? icon(subitem.icon) : '' }
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
          >
            <MenuIcon onClick={handleDrawerOpen} />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            wo-log
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor={'left'}
        open={drawerOpen}
        variant={'persistent'}
        onClose={handleDrawerClose}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {sideNavItems()}
      </Drawer>
    </div>
  )
}

export default TopNav
