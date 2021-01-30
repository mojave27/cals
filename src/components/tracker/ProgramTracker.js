import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DayView from '../programs/DayView'
import ProgramContext from '../../context/ProgramContext'
import ThemeContext from '../../context/ThemeContext'
import TabbedContent from '../controls/TabbedContent'
import AccordionWrapper from '../accordion/AccordionWrapper'
import CloseIcon from '@material-ui/icons/Close'
import {
  Card,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import { isEmpty } from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  accordion: {
    border: `1px solid ${theme.palette.secondary.main}`
  },
  closeButton: {
    float: 'right'
  },
  bordered: {
    border: `1px solid #eee`
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
      <Card>
        <CardHeader
          action={
            <IconButton
              className={classes.closeButton}
              aria-label='Close'
              onClick={handleClose}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          }
          title={context.program.name}
          subheader={context.program.description}
        />
      </Card>

      <AccordionWrapper label={'workout list'}>
        <TabbedContent
          items={context.program.workouts}
          type={'workoutcard'}
          viewOnly={true}
        />
      </AccordionWrapper>

      <AccordionWrapper label={'schedule'}>
        {isEmpty(context.program.schedule) ? (
          <div>{'button to add schedule'}</div>
        ) : (
          <TabbedContent
            items={context.program.schedule.days}
            type={'scheduleday'}
            viewOnly={true}
          />
        )}
      </AccordionWrapper>

      {/* too wide for mobile view */}
      {/* {themeContext.theme.mobile === false ? (
        <AccordionWrapper label={'schedule - week view'}>
          {isEmpty(context.program.schedule) ? null : (
            <Table>
              <TableHead>
                <TableRow>
                  {context.program.schedule.days.map(day => {
                    return (
                      <TableCell>
                        {day.id}-{day.name}
                      </TableCell>
                    )
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {context.program.schedule.days.map(day => {
                    return (
                      <TableCell className={classes.bordered}>
                        <DayView item={day} />
                      </TableCell>
                    )
                  })}
                </TableRow>
              </TableBody>
            </Table>
          )}
        </AccordionWrapper>
      ) : null} */}
    </React.Fragment>
  )
}

export default ProgramTracker
