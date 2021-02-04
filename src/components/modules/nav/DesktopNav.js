import React, { useContext, useState } from 'react'
import { Link } from '@reach/router'
import { AppBar, Button, Menu, MenuItem, Popover, Toolbar, Typography } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { menuConfig } from './navMenuConfig'
import ThemeContext from 'context/ThemeContext'

import './TopNav.css'

const useStyles = makeStyles(theme => ({
  // root: {
  //   flexGrow: 1
  // },
  appbar: {
    padding: '0px'
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
    color: theme.palette.primary.contrastText
  },
  popover: {
    pointerEvents: 'none',
  },
  // menuButton: {
  //   marginRight: theme.spacing(2)
  // },
  // title: {
  //   flexGrow: 1
  // },
  // list: {
  //   width: 250
  // },
  // nested: {
  //   paddingLeft: theme.spacing(4)
  // },
  // drawerHeader: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   padding: theme.spacing(0, 1),
  //   justifyContent: 'flex-end'
  // }
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
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

const DesktopNav = props => {
  const [display, setDisplay] = useState({})
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const open = Boolean(anchorEl)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    console.log('handleClose')
    setAnchorEl(null)
  }

  // const handleClick = event => {
  //   toggleDisplay(event, 'none')
  // }
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  // const mouseEnter = event => {
  //   console.log(`%c mouse enter`,'border:1px solid cyan; color:cyan')
  //   // setAnchorEl(event.currentTarget)
  // }

  // const mouseLeave = event => {
  //   console.log(`%c mouse leave`,'border:1px solid pink; color:pink')
  //   // setAnchorEl(null)
  // }

  // const mouseOver = event => {
  //   console.log(`%c mouse over`,'border:1px solid lime; color:lime')
  //   setAnchorEl(event.currentTarget)
  // }

  // const mouseOut = event => {
  //   console.log(`%c mouse out`,'border:1px solid red; color:red')
  //   setAnchorEl(null)
  // }

  const renderMenuItem = (item, index) => {
    switch (item.type) {
      case 'button':
        return renderButton(item, index)
      case 'dropdown':
        return renderDropDownMenu(item, index)
      case 'functionButton':
        break
      default:
        console.log('unknown menu item type')
    }
  }

  const renderButton = (item, index) => {
    return (
      <Button key={`${index}-${item.text}`} component={Link} to={item.link.to}>
        {item.link.text}
      </Button>
    )
  }

  const renderDropDownMenu = (dropDown, index) => {
    let menuName = dropDown.name
    return (
      <div key={index} className='dropdown'>
        <Button
          menu-name={menuName}
          color={'inherit'}
          className='dropbtn'
          // onClick={handleClick}
          // onMouseOver={mouseOver}
          // onMouseEnter={mouseEnter}
          // onMouseOut={mouseOut}
          // onMouseLeave={mouseLeave}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          {menuName}
        </Button>
        <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleClose}
        disableRestoreFocus
      >
          <Typography>I use Popover.</Typography>
          {/* {dropDown.items.map( (item, index) => { */}
            {/* return <MenuItem key={`${index}-${item.text}`} onClick={handleClose} component={Link} to={item.to}>{item.text}</MenuItem> */}
          {/* })} */}
      </Popover>
        {/* <StyledMenu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{ onMouseLeave: handleClose }}
        >
          {dropDown.items.map( (item, index) => {
            return <MenuItem key={`${index}-${item.text}`} onClick={handleClose} component={Link} to={item.to}>{item.text}</MenuItem>
          })}
        </StyledMenu> */}
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
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default DesktopNav
