import React, { Fragment, useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import WoContext from 'context/WoContext'
import ProgramContext from 'context/ProgramContext'
import ThemeContext from 'context/ThemeContext'
import { updateProgram, addProgram } from 'api/programsApi'
import { retrieve as retrieveWorkouts } from 'api/workoutsApi'
import { generateNewId } from 'components/modules/common/utilties/ArrayUtils'
import WorkoutFormDialog from 'components/workouts/WorkoutFormDialog'
import WoListDialog from 'components/workouts/WoListDialog'
import WorkoutCard from 'components/workouts/WorkoutCard'
import FormButton from 'components/inputs/FormButton'
import ProgramWorkoutDialog from 'components/programs/ProgramWorkoutDialog'
import CardioFormDialog from 'components/programs/CardioFormDialog'
import ScheduleDialog from 'components/programs/ScheduleDialog'
import CardioCard from 'components/programs/CardioCard'
import ProgramChooser from 'components/programs/ProgramChooser'
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'

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
    border: '1px solid',
    overflowY: 'auto'
  },
  box: {
    margin: theme.mobile ? theme.spacing(1) : theme.spacing(3)
  },
}))

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
    if ( typeof programContext.program.id !== 'undefined' && programContext.program.id !== '') {
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
    toggleCardioDialog()
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
    console.log(`removing workout with id ${id}`)
    await programContext.deleteWorkoutFromProgram(id)
  }

  const renderCardio = () => {
    let cardios = programContext.program.cardio
    return cardios && cardios.length > 0 ? (
      <Fragment>
        <Typography variant={'button'} gutterBottom>
          {'Cardio'}
        </Typography>
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
        <Typography variant={'button'} gutterBottom>
          {'Workouts'}
        </Typography>
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
              <Button autoFocus onClick={saveProgram}>
                save
              </Button>
              <Button autoFocus onClick={handleClose}>
                done
              </Button>
            </Box>
            <div style={{ marginTop: '30px' }} />
            <div style={{ marginTop: '30px' }} />
            <Box className={classes.box}>
              <TextField
                id='name'
                label='Program Name'
                defaultValue={programContext.program.name}
                onChange={handleTextChange}
                variant='outlined'
                size='small'
              />
              <div style={{ marginTop: '10px' }} />
              <TextField
                id='description'
                label='Description'
                defaultValue={programContext.program.description}
                onChange={handleTextChange}
                variant='outlined'
                size='small'
              />
            </Box>
            <Divider />
            <Box className={classes.box}>
              <div style={{ marginTop: '10px' }} />
              <FormButton value={'Add Workout'} onClick={addWorkout} />
              <div style={{ marginTop: '10px' }} />
              <FormButton value={'Add Cardio'} onClick={addCardio} />
              <div style={{ marginTop: '10px' }} />
              <FormButton
                value={'Schedule'}
                onClick={toggleScheduleDialog}
              />
              <div style={{ marginTop: '30px' }} />
            </Box>
            <Divider />
              <Box className={classes.box}>
                {renderCardio()}
                {renderWorkouts()}
              </Box>
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
      <ProgramWorkoutDialog
        saveWorkout={saveWorkout}
        open={showWorkoutModal}
        onSelect={handleWorkoutDialogSelection}
        onClose={toggleWorkoutModal}
      />
      <WoListDialog
        open={showWorkoutListDialog}
        onSave={handleWorkoutListSave}
        onClose={toggleWorkoutListDialog}
        title={'Choose Workouts'}
        retrieve={retrieveWorkouts}
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
