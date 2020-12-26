import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TrackerContext from '../../../context/TrackerContext'
import ThemeContext from '../../../context/ThemeContext'
import WorkoutCard from '../../workouts/WorkoutCard'
import { isEmpty } from 'lodash'
import Spinner from '../../Spinner'
import PropTypes from 'prop-types'
import { Box, Tab, Tabs, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  verticalTabs: {
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex,
    width:'100%'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tab: {
    color: theme.color5_text.hex
  },
  tabPanel: {
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex,
    margin: 'auto'
  }
}))

const ProgramWorkouts = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  const [value, setValue] = useState(0)
  let context = useContext(TrackerContext)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return isEmpty(context.program) 
    ? <Spinner /> 
    : (<div className={classes.verticalTabs}>
      <Tabs
        // orientation={themeContext.theme.mobile === true ? 'horizontal' : 'vertical'}
        orientation='horizontal'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        scrollButtons="auto"
        aria-label='workout tabs'
        className={classes.tabs}
      >
        {context.program.workouts.map((wo, index) => {
          let name = wo.name === '' ? `workout-${index}` : wo.name
          return (
            <Tab className={classes.tab} label={name} {...a11yProps(index)} />
          )
        })}
      </Tabs>
      {context.program.workouts.map((wo, index) => {
        return (
          <TabPanel className={classes.tabPanel} value={value} index={index}>
            <WorkoutCard
              key={wo.id}
              id={wo.id}
              item={wo}
              maxWidth={'375px'}
              // deleteItem={props.deleteWorkout}
              // editItem={props.editWorkout}
              disabled={true}
            />
          </TabPanel>
        )
      })}
    </div>
  )
}

export default ProgramWorkouts


function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
