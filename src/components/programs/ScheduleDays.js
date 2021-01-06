import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TabPanel from '../controls/TabPanel'
import ThemeContext from '../../context/ThemeContext'
import ScheduleDay from './ScheduleDay'
import { Tab, Tabs } from '@material-ui/core'

const useScheduleStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  verticalTabs: {
    width: '100%'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tabPanel: {
    margin: 'auto'
  }
}))

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const ScheduleDays = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useScheduleStyles(themeContext.theme)
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.verticalTabs}>
      <Tabs
        orientation='horizontal'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        scrollButtons='auto'
        aria-label='workout tabs'
      >
        {props.days.map((day, index) => {
          let name = day.name === '' ? `workout-${index}` : day.name
          return (
            <Tab
              label={name}
              {...a11yProps(index)}
              key={`${name}-${index}`}
            />
          )
        })}
      </Tabs>
      {props.days.map((day, index) => {
        return (
          <TabPanel
            className={classes.tabPanel}
            value={value}
            index={index}
            key={`${day.name}-${index}`}
          >
            <ScheduleDay
              key={day.id}
              id={day.id}
              item={day}
              maxWidth={'375px'}
              disabled={true}
            />
          </TabPanel>
        )
      })}
    </div>
  )
}

export default ScheduleDays
