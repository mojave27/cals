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
import ThemeContext from '../../context/ThemeContext'
import ScheduleDays from './ScheduleDays'
import ProgramContext from '../../context/ProgramContext'

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
  const theme = useContext(ThemeContext)
  const classes = useStyles(theme)
  const { open, onClose } = props
  let programContext = useContext(ProgramContext)

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
          <Button autoFocus color='inherit' onClick={handleClose}>
            done
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
        <ScheduleDays days={programContext.program.schedule.days} />
        : null
        }
      </Container>
    </Dialog>
  )
}

export default ScheduleDialog
