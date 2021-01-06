import React, { useContext, useState } from 'react'
import ThemeContext from '../../context/ThemeContext'
import WorkoutCard from '../workouts/WorkoutCard'
import ScheduleDay from '../programs/ScheduleDay'
import TabPanel from '../controls/TabPanel'
import Spinner from '../Spinner'
import PropTypes from 'prop-types'
import { Container, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isEmpty } from 'lodash'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

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

const TabbedContent = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const renderItem = (itemType, item) => {
    switch (itemType.toLowerCase()) {
      case 'workoutcard':
        return <WorkoutCard 
        key={item.id}
        id={item.id}
        item={item}
        maxWidth={'375px'}
        disabled={props.viewOnly}
        />

      case 'scheduleday':
        return <ScheduleDay 
        key={item.id}
        id={item.id}
        item={item}
        maxWidth={'375px'}
        disabled={props.viewOnly}
        />

      default:
        return <div className="no_item_type" />
    }
  }

  return isEmpty(props.items) 
    ? <Spinner /> 
    : (<Container>
      <div className={classes.verticalTabs}>
      <Tabs
        orientation='horizontal'
        variant='scrollable'
        value={value}
        onChange={handleChange}
        scrollButtons="auto"
        aria-label='tabs'
      >
        {props.items.map((item, index) => {
          let name = item.name === '' ? `item-${index}` : item.name
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
      {props.items.map((item, index) => {
        return (
          <TabPanel 
            className={classes.tabPanel} 
            value={value} 
            index={index} 
            key={`tabpanel-${index}`}
          >
            {renderItem(props.type, item)}
          </TabPanel>
        )
      })}
    </Container>
  )
}

TabbedContent.propTypes = {
  items: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  viewOnly: PropTypes.bool
}

TabbedContent.defaultProps = {
  viewOnly: true
}

export default TabbedContent

