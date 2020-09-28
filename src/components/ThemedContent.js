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

const ThemedContent = () => {
  let context = useContext(ThemeContext)

  return (
    <TrackerProvider>
      <ProgramProvider>
        <WoProvider>
          <SetProvider>
            <div style={{ backgroundColor: `${context.theme.color5.hex}` }}>
              <TopNav />
              <CssBaseline />
              <div
                style={{
                  backgroundColor: `${context.theme.color5.hex}`,
                  height: '300vh',
                  maxWidth: '80%',
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
  )
}

export default ThemedContent
