// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Link } from '@reach/router'
import { menuConfig } from './topNavMenuConfig'
import ThemeContext from '../../../context/ThemeContext'

const OrigNav = props => {
  let [display, setDisplay] = useState({})
  let context = useContext(ThemeContext)

  let styles = {
    navbar: {
      overflow: 'hidden',
      backgroundColor: context.theme.color5.hex,
      borderBottom: `solid 1px ${context.theme.color3.hex}`,
      fontFamily: 'Arial',
      fontSize: '14px'
    },
    dropdown: {
      float: 'left',
      overflow: 'hidden'
    },
    dropbtn: {
      border: 'none',
      outline: 'none',
      padding: '14px 16px;',
      backgroundColor: 'inherit',
      color: context.theme.color5_text.hex,
      fontSize: '14px',
      fontFamily: 'inherit',
      margin: '0',
      '&:hover': {
        backgroundColor: context.theme.color4.hex
      }
    },
    dropdownContent: {
      display: 'none',
      position: 'absolute',
      backgroundColor: context.theme.color2.hex,
      color: context.theme.color2_text.hex,
      minWidth: '160px',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      zIndex: '1',
      /* Links inside the dropdown */
      '& a': {
        float: 'none',
        color: context.theme.color5.hex,
        padding: '12px 16px',
        textDecoration: 'none',
        display: 'block',
        textAlign: 'left'
      },
      /* Add background color to dropdown links on hover */
      '& a:hover': {
        backgroundColor: context.theme.color4.hex,
        color: context.theme.color4_text.hex,
        border: `1px solid ${context.theme.color2.rgba(0.75)}`
      }
    }
  }

  const handleClick = event => {
    toggleDisplay(event, 'none')
  }

  const mouseOver = event => {
    toggleDisplay(event, 'block')
  }

  const mouseOut = event => {
    toggleDisplay(event, 'none')
  }

  const toggleDisplay = (event, displayType) => {
    const menuName = event.target.getAttribute('menu-name')
    let newDisplay = { ...display }
    newDisplay[menuName] = displayType
    setDisplay(newDisplay)
  }

  const renderMenu = (menuConfig, index) => {
    if (menuConfig.type === 'button') {
      return renderButton(menuConfig, index)
    }
    if (menuConfig.type === 'dropdown') {
      return renderDropDownMenu(menuConfig, index)
    }
  }

  const renderButton = (menuConfig, index) => {
    let menuName = menuConfig.name
    return (
      <div key={index} css={styles.dropdown}>
        <Link to={menuConfig.link.to}>
          <button
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}
            menu-name={menuName}
            css={styles.dropbtn}
          >
            {menuName}
          </button>
        </Link>
      </div>
    )
  }

  const renderDropDownMenu = (menuConfig, index) => {
    let menuName = menuConfig.name
    return (
      <div key={index} css={styles.dropdown}>
        <button
          onMouseOver={mouseOver}
          onMouseOut={mouseOut}
          menu-name={menuName}
          css={styles.dropbtn}
        >
          {menuName}
          <i className='fa fa-caret-down' />
        </button>
        <div
          style={{ display: display[menuName] }}
          menu-name={menuName}
          onClick={handleClick}
          onMouseOver={mouseOver}
          onMouseOut={mouseOut}
          css={styles.dropdownContent}
        >
          {menuConfig.items.map((menuItem, index) => {
            return (
              <Link key={index} menu-name={menuName} to={menuItem.to}>
                {menuItem.text}
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div css={styles.navbar}>
        {menuConfig.map((menu, index) => {
          return renderMenu(menu, index)
        })}
      </div>
    </div>
  )
}

export default OrigNav