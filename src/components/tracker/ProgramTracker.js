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
  container: { },
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
    margin: 'auto',
    // overrides padding of the box inside the panel.
    padding: '0px',
    '& .MuiBox-root': {
      padding: '10px 0px'
    }
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
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default ProgramTracker

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

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
    <Container
      classes={{ root: classes.container }}
    >
      <div className={classes.verticalTabs}>
        <Tabs
          orientation='horizontal'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          scrollButtons="auto"
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
            <ScheduleDayViewer
              program={props.program}
              day={day}
              key={index}
            />
          </TabPanel>
        )
      })}
    </Container>
  )
}
