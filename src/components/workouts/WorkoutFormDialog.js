import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import WoContext from 'context/WoContext'
import ThemeContext from 'context/ThemeContext'
import WorkoutForm from 'components/workouts/WorkoutForm'
import { addWorkout, updateWorkout } from 'api/workoutsApi'
import WorkoutCard from './WorkoutCard'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'sticky',
    background: theme.color4.hex,
    color: theme.color4_text.hex
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const WorkoutFormDialog = (props) => {
  const woContext = useContext(WoContext)
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)
  const { open, onClose } = props

  const handleSave = async () => {
    let response = {}
    if (woContext.workout.id) {
      response = await updateWorkout(woContext.workout)
    } else {
      response = await addWorkout(woContext.workout)
    }
    // update context because addWorkout will have added an id
    await woContext.updateWorkout(response)

    if (props.saveWorkout) {
      props.saveWorkout(response)
    }
  }

  const handleClose = () => {
    onClose()
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
            {props.dialogTitle !== '' ? props.dialogTitle : 'Workout Editor'}
          </Typography>
          {props.view ? null
          :(
            <Button autoFocus color='inherit' onClick={handleSave}>
              save
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {props.view ? (
        <WorkoutCard item={woContext.workout} width={'250px'} disabled={true} />
      ) : (
        <WorkoutForm saveWorkout={handleSave} />
      )}
    </Dialog>
  )
}

WorkoutFormDialog.propTypes = {
  dialogTitle: PropTypes.string,
}

WorkoutFormDialog.defaultProps = {
  dialogTitle: 'Workout Editor',
}

export default WorkoutFormDialog
