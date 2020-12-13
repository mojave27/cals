/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext, useState } from 'react'
// import { findIndexOfId } from '../ArrayUtils'
import CloseButton from '../inputs/CloseButton'
import WoContext from '../../context/WoContext'
import ProgramContext from '../../context/ProgramContext'
import ThemeContext from '../../context/ThemeContext'
import { updateProgram, addProgram } from '../../api/programsApi'
// import {
//   deleteWorkout as deleteWorkoutApi,
//   retrieveWorkoutById
// } from '../../api/workoutsApi'
import WorkoutFormDialog from '../workouts/WorkoutFormDialog'
// import WorkoutListDialog from '../workouts/WorkoutListDialog'

import ProgramWorkoutDialog from './ProgramWorkoutDialog'
import { navigate } from '@reach/router'
import { gridStyles } from '../../styles/gridStyles'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import FormButton from '../inputs/FormButton'
import WorkoutCard from '../workouts/WorkoutCard'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      width: '90%',
      height: theme.spacing(100)
    }
  },
  card: {
    minWidth: 275,
    backgroundColor: theme.color5.hex,
    border: `1px solid ${theme.color4.hex}`
  }
}))

const ProgramForm = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)

  let programContext = useContext(ProgramContext)
  let woContext = useContext(WoContext)
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  const [showWorkoutDialog, setShowWorkoutDialog] = useState(false)
  let { gridContainer } = gridStyles(themeContext.theme)

  const toggleWorkoutModal = () => {
    setShowWorkoutModal(!showWorkoutModal)
  }

  const toggleWorkoutDialog = () => {
    setShowWorkoutDialog(!showWorkoutDialog)
  }

  const saveProgram = async () => {
    let program = {}
    if (typeof programContext.program.id !== 'undefined' && programContext.program.id !== '') {
      console.log(`updating program ${JSON.stringify(programContext.program)}`)
      program = await updateProgram(programContext.program)
    } else {
      console.log(`adding program ${JSON.stringify(programContext.program)}`)
      program = await addProgram(programContext.program)
    }
    await programContext.updateProgram(program)
  }

  const addWorkout = async () => {
    await woContext.setEmptyWorkout()
    toggleWorkoutModal()
  }

  const saveWorkout = async workout => {
    console.log(`saveWorkout: ${JSON.stringify(workout)}`)
    await programContext.addWorkout(workout)
    toggleWorkoutModal()
  }

  const handleTextChange = e => {
    let { id, value } = e.target
    let updatedProgram = { ...programContext.program }
    updatedProgram[id] = value
    programContext.updateProgram(updatedProgram)
  }

  //TODO: make this do something else?
  const handleClose = async () => {
    await saveProgram()
    navigate('/program-tracker')
  }

  const renderWorkouts = workouts => {
    return workouts.map(wo => {
      console.log(`rendering workoutCard with:`)
      console.log(wo)
      return (
        <WorkoutCard
          key={wo.id}
          id={wo.id}
          item={wo}
        />
      )
    })
  }

  const renderMainForm = () => {
    return (
      <form id={'topLevelDiv'} className={classes.root} autoComplete='off'>
        <Card className={classes.card} variant='outlined'>
          <CardContent>
            <CloseButton handleClose={handleClose} />
            <div style={{ marginTop: '30px' }} />
            <TextField
              id='programName'
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
            <div style={{ marginTop: '10px' }} />
            <label htmlFor='workouts'>Workouts</label>
            {programContext.program.workouts && programContext.program.workouts.length > 0 ? (
              <div css={gridContainer}>
                {renderWorkouts(programContext.program.workouts)}
              </div>
            ) : null}
            <div style={{ marginTop: '30px' }} />
            <FormButton buttonText={'Add Workout'} onClick={addWorkout} />
            <div style={{ marginTop: '10px' }} />
            <FormButton
              type='submit'
              styleProps={{ float: 'right' }}
              buttonText={'Save Program'}
              onClick={saveProgram}
            />
          </CardContent>
        </Card>
      </form>
    )
  }

  const handleWorkoutDialogSelection = item => {
    if(item.toLowerCase() === 'choose existing') {
      console.log('existing')
      toggleWorkoutModal()
    }
    if(item.toLowerCase() === 'create new') {
      console.log('new')
      toggleWorkoutModal()
      toggleWorkoutDialog()
    }
  }

  return (
    <Container maxWidth='sm'>
      <ProgramWorkoutDialog
        saveWorkout={saveWorkout}
        open={showWorkoutModal}
        onSelect={handleWorkoutDialogSelection}
        onClose={toggleWorkoutModal}
      />
      <WorkoutFormDialog open={showWorkoutDialog} onClose={toggleWorkoutDialog} saveWorkout={saveWorkout}/>
      {renderMainForm()}
    </Container>
  )
}

export default ProgramForm
