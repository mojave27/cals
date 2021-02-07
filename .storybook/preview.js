import React from 'react'
import ThemeProvider from '../src/context/ThemeProvider'
import { themes } from '../src/styles/colorThemes'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}

// const currentTheme = createMuiTheme(themes.light)
// const currentTheme = createMuiTheme(themes.medium)
// const currentTheme = createMuiTheme(themes.woSheet)
const currentTheme = createMuiTheme(themes.dark)

export const decorators = [
  Story => (
    <ThemeProvider>
      <MuiThemeProvider theme={currentTheme}>
        <Story />
      </MuiThemeProvider>
    </ThemeProvider>
  )
]
