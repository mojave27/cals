import React, { useContext } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import TopNav from './Nav/TopNav/TopNav'
import TrackerProvider from '../context/TrackerProvider'
import ProgramProvider from '../context/ProgramProvider'
import SetProvider from '../context/SetProvider'
import WoProvider from '../context/WoProvider'
import WoDayProvider from '../context/WoDayProvider'
import ThemeContext from '../context/ThemeContext'
import Routes from './Routes'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

const ThemedContent = props => {
  let context = useContext(ThemeContext)
  const currentTheme = createMuiTheme(context.theme)

  return (
    <MuiThemeProvider theme={currentTheme}>
      <TrackerProvider>
        <ProgramProvider>
          <WoProvider>
            <SetProvider>
              {/* <div style={{ backgroundColor: `${context.theme.color5.hex}` }}> */}
              <div>
                <TopNav {...props} />
                <CssBaseline />
                <div
                  style={{
                    // backgroundColor: `${context.theme.color5.hex}`,
                    height: '300vh',
                    maxWidth: `${context.mobile === true ? '100%' : '80%'}`,
                    margin: '20px auto'
                  }}
                >
                  <WoDayProvider>
                    <Routes />
                  </WoDayProvider>
                </div>
              </div>
            </SetProvider>
          </WoProvider>
        </ProgramProvider>
      </TrackerProvider>
    </MuiThemeProvider>
  )
}

export default ThemedContent
