import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from '../../context/ThemeContext'
import { isEmpty } from 'lodash'
import ProgramWorkouts from './program/ProgramWorkouts'
import ScheduleDayViewer from '../programs/ScheduleDayViewer'
import TabPanel from '../controls/TabPanel'

import {
  AppBar,
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
    width:'100%',
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

  const handleClose = () => {
    props.close()
  }

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

export default ProgramTracker

// function TabPanel(props) {
//   const { children, value, index, ...other } = props

//   return (
//     <div
//       role='tabpanel'
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Container>
//           <Box p={3}>{children}</Box>
//         </Container>
//       )}
//     </div>
//   )
// }

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

const Schedule = props => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return isEmpty(props.program.schedule) ? (
    <div>No schedule defined BUTTON_TO_EDIT_SCHEDULE</div>
  ) : (
    <Container>
      <AppBar position='static'>
        <Tabs
          orientation={'horizontal'}
          variant={'scrollable'}
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          {props.program.schedule.days.map((day, index) => {
            return (
              <Tab
                label={day.name}
                {...a11yProps(index)}
                key={`${day.id}-${index}`}
              />
            )
          })}
        </Tabs>
      </AppBar>
      {props.program.schedule.days.map((day, index) => {
        return (
          <TabPanel value={value} index={0} key={`${day.id}-${index}`}>
            <ScheduleDayViewer program={props.program} day={day} key={index}/>
          </TabPanel>
        )
      })}
    </Container>
  )
}
