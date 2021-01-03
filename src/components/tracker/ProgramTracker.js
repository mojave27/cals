<<<<<<< HEAD
import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TrackerContext from '../../context/TrackerContext'
import ThemeContext from '../../context/ThemeContext'
import { isEmpty } from 'lodash'
import ProgramWorkouts from './program/ProgramWorkouts'

import PropTypes from 'prop-types'
import {
  AppBar,
  Card,
  CardHeader,
  Box,
  IconButton,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import AccordionWrapper from '../accordion/AccordionWrapper'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  accordion: {
    backgroundColor: theme.color2.hex,
    color: theme.color2_text.hex,
    border: `1px solid ${theme.color3.hex}`
  },
  card: {
    backgroundColor: theme.color4.hex,
    color: theme.color4_text.hex
  },
  cardHeader: {
    color: theme.color4_text.hex
  },
  verticalTabs: {
    flexGrow: 1,
    display: 'flex',
    height: 224
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  closeButton: {
    float: 'right'
  }
}))

const ProgramTracker = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  let context = useContext(TrackerContext)

  // const addTab = async () => {
  //   console.log('add tab')
  //   let id = generateNewId(context.program.workouts)
  //   let newWorkout = {
  //     id: id,
  //     name: '',
  //     description: '',
  //     sets: [],
  //     days: []
  //   }
  //   await context.updateNewWorkout(newWorkout)
  // }
=======
import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from '../../context/ThemeContext'
import { isEmpty } from 'lodash'
import ProgramWorkouts from './program/ProgramWorkouts'
import ScheduleDayViewer from '../programs/ScheduleDayViewer'
import TabPanel from '../controls/TabPanel'
import {
  Card,
  CardHeader,
  Container,
  IconButton,
  Tab,
  Tabs
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import AccordionWrapper from '../accordion/AccordionWrapper'
import ProgramContext from '../../context/ProgramContext'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  accordion: {
    backgroundColor: theme.color2.hex,
    color: theme.color2_text.hex,
    border: `1px solid ${theme.color3.hex}`
  },
  card: {
    backgroundColor: theme.color4.hex,
    color: theme.color4_text.hex
  },
  cardHeader: {
    color: theme.color4_text.hex
  },
  verticalTabs: {
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex,
    width: '100%'
  },
  tab: {
    color: theme.color5_text.hex
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tabPanel: {
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex,
    margin: 'auto'
  },
  closeButton: {
    float: 'right'
  }
}))

const ProgramTracker = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  let context = useContext(ProgramContext)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleClose = () => {
    props.close()
  }

  return isEmpty(context.program) ? null : (
    <div id={context.program.id}>
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton
              className={classes.closeButton}
              aria-label='Close'
              onClick={handleClose}
            >
              <CloseIcon
                style={{ color: themeContext.theme.color4_text.hex }}
                fontSize='small'
              />
            </IconButton>
          }
          title={context.program.name}
          subheader={context.program.description}
        />
      </Card>

      <AccordionWrapper label={'workout list'}>
        <ProgramWorkouts program={context.program} />
      </AccordionWrapper>

      <AccordionWrapper label={'schedule'}>
        <Schedule program={context.program} />
      </AccordionWrapper>
    </div>
  )
}
>>>>>>> master

export default ProgramTracker

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

<<<<<<< HEAD
  // const printProgram = program => {
  //   console.log(JSON.stringify(program))
  // }

  return isEmpty(context.program) ? null : (
    <div id={context.program.id}>
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton
              className={classes.closeButton}
              aria-label='Close'
              onClick={handleClose}
            >
              <CloseIcon style={{ color: themeContext.theme.color4_text.hex }} fontSize='small' />
            </IconButton>
          }
          subheaderTypographyProps={{ color: themeContext.theme.color4_text.hex }}
          title={context.program.name}
          subheader={context.program.description}
        />
      </Card>

      <AccordionWrapper label={'workout list'}>
        <ProgramWorkouts />
      </AccordionWrapper>

      <AccordionWrapper label={'schedule'}>
        <Schedule program={context.program} />
      </AccordionWrapper>
    </div>
  )
}

export default ProgramTracker

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

const Schedule = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return isEmpty(props.program.schedule) 
    ? <div>No schedule defined BUTTON_TO_EDIT_SCHEDULE</div> 
    : (<div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          <Tab label='Item One' {...a11yProps(0)} />
          <Tab label='Item Two' {...a11yProps(1)} />
          <Tab label='Item Three' {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One - {props.program.name}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>)
}
=======
const Schedule = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return isEmpty(props.program.schedule) ? (
    <div>No schedule defined BUTTON_TO_EDIT_SCHEDULE</div>
  ) : (
    <Container>
      <div className={classes.verticalTabs}>
        <Tabs
          orientation={'horizontal'}
          variant={'scrollable'}
          value={value}
          onChange={handleChange}
          scrollButtons='auto'
          aria-label='schedule tabs'
          className={classes.tabs}
        >
          {props.program.schedule.days.map((day, index) => {
            return (
              <Tab
                className={classes.tab}
                label={day.name}
                {...a11yProps(index)}
                key={`${day.id}-${index}`}
              />
            )
          })}
        </Tabs>
      </div>
      {props.program.schedule.days.map((day, index) => {
        return (
          <TabPanel
            className={classes.tabPanel}
            value={value}
            index={index}
            key={`${day.id}-${index}`}
          >
            <ScheduleDayViewer program={props.program} day={day} key={index} />
          </TabPanel>
        )
      })}
    </Container>
  )
}
>>>>>>> master
