import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Container,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import ThemeContext from '../../context/ThemeContext'
import ScheduleDay from './ScheduleDay'

import { Box, Tab, Tabs } from '@material-ui/core'
import ProgramContext from '../../context/ProgramContext'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  conatiner: {
    padding: '10px'
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const ScheduleDialog = props => {
  const theme = useContext(ThemeContext)
  const classes = useStyles(theme)
  const { open, onClose, saveWorkout } = props
  let programContext = useContext(ProgramContext)

  const handleSave = workout => {
    saveWorkout(workout)
  }

  const handleClose = () => {
    onClose()
  }

  const addDay = async () => {
    console.log('%cAdding Day', 'color:lime;background:#333')
    await programContext.addDayToSchedule()
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {'Schedule'}
          </Typography>
          <Button autoFocus color='inherit' onClick={handleSave}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{marginTop:'30px'}} />
      <Container maxWidth='sm' className={classes.container}>
        {/* Add a day to the schedule */}
        <Button variant='outlined' onClick={addDay}>
          Add Day
        </Button>
        {/* show the 'form' for the 'day' */}
        {programContext.program.schedule ?
        <ScheduleDays />
        : null
        }
      </Container>
    </Dialog>
  )
}

export default ScheduleDialog

// **********************************************************************************************************************
// **********************************************************************************************************************

const useScheduleStyles = makeStyles(theme => ({
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

const ScheduleDays = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useScheduleStyles(themeContext.theme)
  const [value, setValue] = useState(0)
  let programContext = useContext(ProgramContext)

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
        scrollButtons="auto"
        aria-label='workout tabs'
        className={classes.tabs}
      >
        {programContext.program.schedule.days.map((day, index) => {
          let name = day.name === '' ? `workout-${index}` : day.name
          return (
            <Tab className={classes.tab} label={name} {...a11yProps(index)} key={`${name}-${index}`}/>
          )
        })}
      </Tabs>
      {programContext.program.schedule.days.map((day, index) => {
        return (
          <TabPanel className={classes.tabPanel} value={value} index={index} key={`${day.name}-${index}`}>
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

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired
// }

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}