import React, { useState } from 'react'
import ThemeContext from './ThemeContext'
import { themes } from '../styles/colorThemes'
import Cookies from 'universal-cookie'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const getUserTheme = (mobile) => {
  const cookies = new Cookies()
  // default to woSheet if no user theme set
  if (cookies.get('wolog-theme') === undefined) {
    console.log('no cookie found, setting one with light theme')
    setUserTheme('light')
    return themes.light
  } else {
    let themeValue = cookies.get('wolog-theme')
    let activeTheme = themes[themeValue]
    activeTheme.mobile = mobile
    return activeTheme
  }
}

const setUserTheme = themeName => {
  console.log(`setting themeName: ${themeName} into cookie`)
  const cookies = new Cookies()
  cookies.set('wolog-theme', themeName, { path: '/' })
}

const ThemeProvider = props => {
  const mobile = useMediaQuery('(max-width:620px)')
  const [activeTheme, setActiveTheme] = useState(getUserTheme(mobile))

  return (
    <ThemeContext.Provider
      value={{
        theme: props.theme ? props.theme : activeTheme,
        mobile: mobile,
        changeTheme: themeName => {
          console.log(`provider changing theme to ${themeName}`)
          setUserTheme(themeName)
          setActiveTheme(themes[themeName])
        }
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
