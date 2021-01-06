import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import ThemeContext from '../../context/ThemeContext'
import { AppBar, Box, Container, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import WorkoutList from '../workouts/WorkoutList'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  verticalTabs: {
    flexGrow: 1,
    display: 'flex',
    height: 224
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  accordion: {
    border: `1px solid ${theme.palette.secondary.main}`
  },
  closeButton: {
    float: 'right'
  }
}))

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const RoutineChooser = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          <Tab label='Workouts' {...a11yProps(0)} />
          <Tab label='Cardio' {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        {'Choose Workout(s)'}
        <WorkoutList workouts={props.workouts} onClick={props.onWorkoutSelect} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {'Choose Workout(s)'}
        {/* <CardioList
          open={true}
          cardio={props.cardio}
          onSelect={props.onCardioSelect}
        /> */}
      </TabPanel>
    </div>
  )
}

export default RoutineChooser

const TabPanel = props => {
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
        <Container>
        <Box p={3}>
          {children}
        </Box>
        </Container>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}