import React, { Fragment, useContext, useState } from 'react'
import { Button } from '@material-ui/core'
import { Menu, MenuItem } from '@material-ui/core'
import ThemeContext from 'context/ThemeContext'

const ThemeMenu = props => {
  const themeContext = useContext(ThemeContext)
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

  return (
    <Fragment>
          <Button
            color='inherit'
            aria-controls='theme-menu'
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
            <MenuItem onClick={() => handleThemeSelect('light')}>light</MenuItem>
            <MenuItem onClick={() => handleThemeSelect('dark')}>dark</MenuItem>
            <MenuItem onClick={() => handleThemeSelect('sea')}>sea</MenuItem>
            <MenuItem onClick={() => handleThemeSelect('woSheet')}>woSheet</MenuItem>
            <MenuItem onClick={() => handleThemeSelect('snow')}>snow</MenuItem>
            <MenuItem onClick={() => handleThemeSelect('bakery')}>bakery</MenuItem>
            <MenuItem onClick={() => handleThemeSelect('villa')}>villa</MenuItem>
            <MenuItem onClick={() => handleThemeSelect('lake')}>lake</MenuItem>
            <MenuItem onClick={() => handleThemeSelect('book')}>book</MenuItem>
            <MenuItem onClick={() => handleThemeSelect('dina')}>dina</MenuItem>
          </Menu>
    </Fragment>
  )
}

export default ThemeMenu
