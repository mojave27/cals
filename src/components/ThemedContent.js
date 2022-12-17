import React, { useContext } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
// import TopNav from './Nav/TopNav/TopNav'
import TopNav from 'components/modules/nav/TopNav'
// import TrackerProvider from '../context/TrackerProvider'
// import ProgramProvider from '../context/ProgramProvider'
// import SetProvider from '../context/SetProvider'
// import WoProvider from '../context/WoProvider'
// import WoDayProvider from '../context/WoDayProvider'
import ThemeContext from '../context/ThemeContext'
import Routes from './Routes'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

const ThemedContent = (props) => {
  let context = useContext(ThemeContext)
  const currentTheme = createMuiTheme(context.theme)

  return (
    <MuiThemeProvider theme={currentTheme}>
      <div>
        <CssBaseline />
        <TopNav {...props} />
        <div
          style={{
            height: '300vh',
            maxWidth: `${context.mobile === true ? '100%' : '80%'}`,
            margin: '20px auto',
          }}
        >
          {/* <WoDayProvider> */}
            <Routes {...props} />
          {/* </WoDayProvider> */}
        </div>
      </div>
    </MuiThemeProvider>
  )
}

export default ThemedContent
