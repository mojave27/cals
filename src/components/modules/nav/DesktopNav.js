import React, { useState } from 'react'
import { Link } from '@reach/router'
import { AppBar, Button, Menu, MenuItem, Toolbar } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { menuConfig } from './navMenuConfig'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ThemeMenu from 'components/modules/nav/ThemeMenu'
import { Auth } from 'aws-amplify'

import './TopNav.css'

const useStyles = makeStyles(theme => ({
  appbar: {
    padding: '0px',
    // backgroundColor: 'transparent'
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
    color: theme.palette.primary.contrastText,
  },
  popover: {
    pointerEvents: 'none',
  },
  title: {
    flexGrow: 1
  },
}))

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 40,
      horizontal: 60
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

const signOut = async () => {
  try {
    await Auth.signOut()
  } catch (error) {
    console.log('error signing out: ', error)
  }
}

const DesktopNav = props => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [activeMenu, setActiveMenu] = useState(null);


  const handleClick = event => {
    if (anchorEl !== event.currentTarget) {
      console.log(event.currentTarget)
      setAnchorEl(event.currentTarget)
      setActiveMenu(event.currentTarget.id)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setActiveMenu(null)
  }

  const renderMenuItem = (item, index) => {
    switch (item.type) {
      case 'button':
        return renderButton(item, index)
      case 'dropdown':
        return renderDropDownMenu(item, index)
      case 'functionButton':
        break
      default:
        console.log(`unknown menu item type: ${item.type}`)
    }
  }

  const renderButton = (item, index) => {
    return (
      <Button color={'inherit'} key={`${index}-${item.text}`} component={Link} to={item.link.to}>
        {item.link.text}
      </Button>
    )
  }

  const renderDropDownMenu = (dropDown, index) => {
    let menuName = dropDown.name
    return (
      <div key={index} className='dropdown'>
        <Button
          id={menuName}
          color={'inherit'}
          aria-owns={anchorEl ? menuName + "-" + index : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          // onMouseOver={handleClick}
        >
          {menuName} <ArrowDropDownIcon />
        </Button>
        <StyledMenu
          id={`${menuName}-${index}`}
          anchorEl={anchorEl}
          keepMounted
          // open={Boolean(anchorEl)}
          open={activeMenu === menuName}
          onClose={handleClose}
          MenuListProps={{ onMouseLeave: handleClose }}
        >
          {dropDown.items.map( (item, index) => {
            return <MenuItem key={`${index}-${item.text}`} onClick={handleClose} component={Link} to={item.to}>{item.text}</MenuItem>
          })}
        </StyledMenu>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: '30px' }}>
      <AppBar
        position='sticky'
        elevation={0}
        className={classes.appbar}
        style={{ marginBottom: '30px' }}
      >
        <Toolbar variant={'dense'} className={classes.toolbar}>
          {menuConfig.map((menu, index) => {
            return renderMenuItem(menu, index)
          })}
          <div className={classes.title} />
          <ThemeMenu />
          <Button color='inherit' onClick={signOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default DesktopNav
