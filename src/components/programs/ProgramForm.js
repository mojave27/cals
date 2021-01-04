import React, { Fragment, useContext, useEffect, useState } from 'react'
import WoContext from '../../context/WoContext'
import ProgramContext from '../../context/ProgramContext'
import ThemeContext from '../../context/ThemeContext'
import { updateProgram, addProgram } from '../../api/programsApi'
import CardioFormDialog from './CardioFormDialog'
import WorkoutFormDialog from '../workouts/WorkoutFormDialog'
import WorkoutListDialog from '../workouts/WorkoutListDialog'
import ProgramWorkoutDialog from './ProgramWorkoutDialog'
import { makeStyles } from '@material-ui/core/styles'
import CardioCard from './CardioCard'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  TextField,
  Grid
} from '@material-ui/core'
import FormButton from '../inputs/FormButton'
import WorkoutCard from '../workouts/WorkoutCard'
import ScheduleDialog from './ScheduleDialog'
import { generateNewId } from '../ArrayUtils'
import ProgramChooser from './ProgramChooser'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      width: '100%',
      height: theme.spacing(100)
    }
  },
  card: {
    minWidth: 275,
    backgroundColor: theme.color4.hex,
    border: `1px solid ${theme.color3.hex}`,
    overflowY: 'auto'
  },
  box: {
    margin: theme.mobile ? theme.spacing(1) : theme.spacing(3)
  },
  label: {
    color: theme.color4_text.hex
  }
}))

const useInputStyles = makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.color5_text.rgba(0.5)}`,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: theme.color5.hex,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: theme.color5.rgba(0.5)
    },
    '& label': {
      color: theme.color5_text.hex
    },
    '&$focused': {
      color: theme.color5_text.hex,
      backgroundColor: theme.color5.rgba(0.5),
      borderColor: theme.color5_text.hex
    }
  },
  focused: {}
}))

const ThemedTextField = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useInputStyles(themeContext.theme)

  return (
    <TextField
      InputProps={{ classes, disableUnderline: true }}
      InputLabelProps={{
        style: { color: `${themeContext.theme.color5_text.rgba(0.5)}` }
      }}
      {...props}
    />
  )
}

const ProgramForm = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)

  let programContext = useContext(ProgramContext)
  let woContext = useContext(WoContext)
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [showWorkoutDialog, setShowWorkoutDialog] = useState(false)
  const [showCardioDialog, setShowCardioDialog] = useState(false)
  const [showWorkoutListDialog, setShowWorkoutListDialog] = useState(false)
  const [showProgramChooser, setShowProgramChooser] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const toggleWorkoutModal = () => {
    setShowWorkoutModal(!showWorkoutModal)
  }

  const toggleWorkoutDialog = () => {
    setShowWorkoutDialog(!showWorkoutDialog)
  }

  const toggleCardioDialog = () => {
    setShowCardioDialog(!showCardioDialog)
  }

  const toggleScheduleDialog = () => {
    setShowScheduleDialog(!showScheduleDialog)
  }

  const toggleWorkoutListDialog = () => {
    setShowWorkoutListDialog(!showWorkoutListDialog)
  }

  const toggleProgramChooser = () => {
    setShowProgramChooser(!showProgramChooser)
  }

  const closeAllDialogs = () => {
    setShowWorkoutDialog(false)
    setShowWorkoutModal(false)
  }

  const saveProgram = async () => {
    let program = {}
    if (
      typeof programContext.program.id !== 'undefined' &&
      programContext.program.id !== ''
    ) {
      program = await updateProgram(programContext.program)
    } else {
      program = await addProgram(programContext.program)
    }
    await programContext.updateProgram(program)
  }

  const addWorkout = async () => {
    await woContext.setEmptyWorkout()
    toggleWorkoutModal()
  }

  const addCardio = async () => {
    // await woContext.setEmptyWorkout()
    toggleCardioDialog()
    // console.log('%cpretending to add cardio', 'color:#fff; background-color:navy')
  }

  const saveWorkout = async workout => {
    console.log(`saveWorkout: ${workout}`)
    await programContext.addWorkout(workout)
    closeAllDialogs()
  }

  const saveCardio = async cardio => {
    console.log(`saveCardio: ${JSON.stringify(cardio)}`)
    const id = generateNewId(programContext.program.cardio)
    cardio.id = id
    await programContext.addCardio(cardio)
    closeAllDialogs()
  }

  const handleTextChange = e => {
    let { id, value } = e.target
    let updatedProgram = { ...programContext.program }
    updatedProgram[id] = value
    programContext.updateProgram(updatedProgram)
  }

  const handleClose = async () => {
    programContext.clearProgram()
    setShowProgramChooser(true)
  }

  const deleteItem = async id => {
    //remove workout from program in context.
    console.log(`pretending to remove workout with id ${id}`)
  }

  const renderCardio = () => {
    let cardios = programContext.program.cardio
    return cardios && cardios.length > 0 ? (
      <Fragment>
        <label htmlFor='workouts' className={classes.label}>
          Cardio
        </label>
        <Grid container spacing={1} justify='flex-start'>
          {programContext.program.cardio.map(cardioRoutine => {
            return (
              <Grid item xs={12} sm={12} key={cardioRoutine.id}>
                <CardioCard data={[cardioRoutine]} />
              </Grid>
            )
          })}
        </Grid>
      </Fragment>
    ) : null
  }

  const renderWorkouts = () => {
    let workouts = programContext.program.workouts
    return workouts && workouts.length > 0 ? (
      <Fragment>
        <label htmlFor='workouts' className={classes.label}>
          Workouts
        </label>
        <Grid container spacing={1} justify='flex-start'>
          {workouts.map(wo => {
            return (
              <Grid item xs={12} sm={4} key={wo.id}>
                <WorkoutCard
                  id={wo.id}
                  item={wo}
                  selectItem={props.selectWorkout}
                  deleteItem={deleteItem}
                  disabled={false}
                />
              </Grid>
            )
          })}
        </Grid>
      </Fragment>
    ) : null
  }

  const renderMainForm = () => {
    return (
      <form id={'topLevelDiv'} className={classes.root} autoComplete='off'>
        <Card className={classes.card} variant='outlined'>
          <CardContent>
            <Box style={{ textAlign: 'right' }}>
              <Button
                style={{ float: 'left' }}
                autoFocus
                color='inherit'
                onClick={handleClose}
              >
                cancel
              </Button>
              <Button autoFocus color='inherit' onClick={saveProgram}>
                save
              </Button>
              <Button autoFocus color='inherit' onClick={handleClose}>
                done
              </Button>
            </Box>
            <div style={{ marginTop: '30px' }} />
            <div style={{ marginTop: '30px' }} />
            <Box className={classes.box}>
              <ThemedTextField
                id='name'
                label='Program Name'
                defaultValue={programContext.program.name}
                onChange={handleTextChange}
                variant='filled'
                size='small'
              />
              <div style={{ marginTop: '10px' }} />
              <ThemedTextField
                id='description'
                label='Description'
                defaultValue={programContext.program.description}
                onChange={handleTextChange}
                variant='filled'
                size='small'
              />
            </Box>
            <Divider />
            <Box className={classes.box}>
              <div style={{ marginTop: '10px' }} />
              <FormButton buttonText={'Add Workout'} onClick={addWorkout} />
              <div style={{ marginTop: '10px' }} />
              <FormButton buttonText={'Add Cardio'} onClick={addCardio} />
              <div style={{ marginTop: '10px' }} />
              <FormButton
                buttonText={'Schedule'}
                onClick={toggleScheduleDialog}
              />
              <div style={{ marginTop: '30px' }} />
            </Box>
            <Divider />
            {/* <Container className={classes.cardContent}> */}
              <Box className={classes.box}>
                {renderCardio()}
                {renderWorkouts()}
              </Box>
            {/* </Container> */}
          </CardContent>
        </Card>
      </form>
    )
  }

  const handleWorkoutDialogSelection = item => {
    if (item.toLowerCase() === 'choose existing') {
      console.log('existing')
      toggleWorkoutModal()
      toggleWorkoutListDialog()
    }
    if (item.toLowerCase() === 'create new') {
      console.log('new')
      toggleWorkoutModal()
      toggleWorkoutDialog()
    }
  }

  const handleWorkoutListSave = async workouts => {
    await programContext.addWorkouts(workouts)
  }

  return (
    <Container maxWidth='sm'>
      {/* < */}
      <ProgramWorkoutDialog
        saveWorkout={saveWorkout}
        open={showWorkoutModal}
        onSelect={handleWorkoutDialogSelection}
        onClose={toggleWorkoutModal}
      />
      <WorkoutListDialog
        open={showWorkoutListDialog}
        onSave={handleWorkoutListSave}
        onClose={toggleWorkoutListDialog}
      />
      <WorkoutFormDialog
        open={showWorkoutDialog}
        onClose={toggleWorkoutDialog}
        saveWorkout={saveWorkout}
      />
      <CardioFormDialog
        open={showCardioDialog}
        onClose={toggleCardioDialog}
        saveWorkout={saveCardio}
      />
      <ScheduleDialog
        open={showScheduleDialog}
        onClose={toggleScheduleDialog}
        saveWorkout={saveWorkout}
      />
      {showProgramChooser ? (
        <ProgramChooser onClose={toggleProgramChooser} />
      ) : (
        renderMainForm()
      )}
    </Container>
  )
}

export default ProgramForm
