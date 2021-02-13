import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Button,
  Container,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import ProgramContext from '../../context/ProgramContext'
import TabbedContent from '../controls/TabbedContent'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
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
  const classes = useStyles()
  let programContext = useContext(ProgramContext)

  const handleClose = () => {
    if (props.onClose) props.onClose()
  }

  // const handleSave = () => {
  //   if (props.onSave) props.onSave()
  // }

  const addDay = async () => {
    console.log('%cAdding Day', 'color:lime;background:#333')
    await programContext.addDayToSchedule()
  }

  return (
    <Dialog
      fullScreen
      open={props.open}
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
          {/* <Button autoFocus color='inherit' onClick={handleSave}>
            save
          </Button> */}
          <Button autoFocus color='inherit' onClick={handleClose}>
            done
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '30px' }} />
      <Container maxWidth='sm' className={classes.container}>
        {/* Add a day to the schedule */}
        <Button variant='outlined' onClick={addDay}>
          Add Day
        </Button>
        {/* show the 'form' for the 'day' */}
        {programContext.program.schedule ? (
          <TabbedContent
            items={programContext.program.schedule.days}
            type={'ScheduleDay'}
            viewOnly={false}
          />
        ) : null}
      </Container>
    </Dialog>
  )
}

export default ScheduleDialog
