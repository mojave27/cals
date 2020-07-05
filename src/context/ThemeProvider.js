import React from 'react'
import ThemeContext from './ThemeContext'
import { themes } from '../styles/main-styles'

class ThemeProvider extends React.Component {
    state = {
        activeTheme: themes.woSheet
    }
    

    render() {
        return (
            <ThemeContext.Provider value={{
                theme: this.state.activeTheme,
                changeTheme: themeName => {
                    console.log(`provider changing theme to ${themeName}`)
                    console.log(themes[themeName])
                    this.setState({ activeTheme: themes[themeName] })
                },
            }}>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }

}

export default ThemeProvider