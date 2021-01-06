import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from '../../../context/ThemeContext'
import WorkoutCard from '../../workouts/WorkoutCard'
import { isEmpty } from 'lodash'
import Spinner from '../../Spinner'
import PropTypes from 'prop-types'
import { Box, Container, Tab, Tabs } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  verticalTabs: {
    width:'100%'
  },
  tabPanel: {
    margin: 'auto',
    padding: '0px',
    '& .MuiBox-root': {
      padding: '10px 0px'
    }
  }
}))

const ProgramWorkouts = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return isEmpty(props.program) 
    ? <Spinner /> 
    : (<Container>
      <div className={classes.verticalTabs}>
      <Tabs
        orientation='horizontal'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        scrollButtons="auto"
        aria-label='workout tabs'
      >
        {props.program.workouts.map((wo, index) => {
          let name = wo.name === '' ? `workout-${index}` : wo.name
          return (
            <Tab 
              label={name} 
              {...a11yProps(index)} 
              key={`tab-${index}`} 
            />
          )
        })}
      </Tabs>
    </div>
      {props.program.workouts.map((wo, index) => {
        return (
          <TabPanel 
            className={classes.tabPanel} 
            value={value} 
            index={index} 
            key={`tabpanel-${index}`}
          >
            <WorkoutCard
              key={wo.id}
              id={wo.id}
              item={wo}
              maxWidth={'375px'}
              disabled={true}
            />
          </TabPanel>
        )
      })}
    </Container>
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
