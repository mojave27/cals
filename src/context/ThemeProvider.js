import React from 'react'
import ThemeContext from './ThemeContext'
import { themes } from '../styles/main-styles'
import Cookies from 'universal-cookie'

const getUserTheme = () => {
  const cookies = new Cookies()
  // default to woSheet if no user theme set
  if (cookies.get('wolog-theme') === undefined) {
    console.log('no cookie found, setting one with woSheet theme')
    setUserTheme('woSheet')
    return themes.woSheet
  } else {
    let themeValue = cookies.get('wolog-theme')
    console.log(`themeValue ${themeValue}`)
    return themes[themeValue]
  }
}

const setUserTheme = themeName => {
  console.log(`setting themeName: ${themeName} into cookie`)
  const cookies = new Cookies()
  cookies.set('wolog-theme', themeName, { path: '/' })
}

class ThemeProvider extends React.Component {
  state = {
    activeTheme: getUserTheme()
  }

  render() {
    return (
      <ThemeContext.Provider
        value={{
          theme: this.state.activeTheme,
          changeTheme: themeName => {
            console.log(`provider changing theme to ${themeName}`)
            // console.log(themes[themeName])
            setUserTheme(themeName)
            this.setState({ activeTheme: themes[themeName] })
          }
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeProvider
