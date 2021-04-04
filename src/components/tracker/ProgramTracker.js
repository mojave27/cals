import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import DayView from 'components/programs/DayView'
import ProgramContext from 'context/ProgramContext'
import TabbedContent from 'components/controls/TabbedContent'
import AccordionWrapper from '../accordion/AccordionWrapper'
import CloseIcon from '@material-ui/icons/Close'
import {
  Card,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core'
import { isEmpty } from 'lodash'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  accordion: {
    border: `1px solid ${theme.palette.secondary.main}`,
  },
  closeButton: {
    float: 'right',
  },
  bordered: {
    border: `1px solid #eee`,
  }
}))

const ProgramTracker = (props) => {
  const classes = useStyles()
  let context = useContext(ProgramContext)
  const isMobile = useMediaQuery('(max-width:768px)');

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
      {isMobile === false ? (
        <AccordionWrapper label={'schedule - week view'}>
          {isEmpty(context.program.schedule) ? null : (
            <div style={{maxWidth:'900px', border: '1px solid red', overflow:'scroll', margin:'auto'}}>
            <Table>
              <TableHead>
                <TableRow>
                  {context.program.schedule.days.map((day) => {
                    return (
                      <TableCell key={`${day.id}-headerCell`}>
                        {day.name}
                      </TableCell>
                    )
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {context.program.schedule.days.map((day) => {
                    return (
                      <TableCell key={day.id} className={classes.bordered}>
                        <DayView item={day} />
                      </TableCell>
                    )
                  })}
                </TableRow>
              </TableBody>
            </Table></div>
          )}
        </AccordionWrapper>
      ) : null}
    </React.Fragment>
  )
}

export default ProgramTracker
