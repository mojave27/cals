/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment, useContext, useState } from 'react'
import CloseButton from '../inputs/CloseButton'
import WoContext from '../../context/WoContext'
import ProgramContext from '../../context/ProgramContext'
import ThemeContext from '../../context/ThemeContext'
import { updateProgram, addProgram } from '../../api/programsApi'
import WorkoutFormDialog from '../workouts/WorkoutFormDialog'
import WorkoutListDialog from '../workouts/WorkoutListDialog'
import ProgramWorkoutDialog from './ProgramWorkoutDialog'
import { navigate } from '@reach/router'
import { gridStyles } from '../../styles/gridStyles'
import { fade, makeStyles } from '@material-ui/core/styles'
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
    backgroundColor: theme.color4.hex,
    border: `1px solid ${theme.color3.hex}`
  },
  label: {
    color: theme.color4_text.hex
  }
}))

const useStylesInput = makeStyles((theme) => ({
  root: {
    color: theme.color1_text.hex,
    border: `1px solid ${theme.color3.hex}`,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: theme.color1.hex,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.color3.hex
    },
  },
  focused: {},
}));

const ProgramForm = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  const inputClasses = useStylesInput(themeContext.theme)

  let programContext = useContext(ProgramContext)
  let woContext = useContext(WoContext)
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)
  const [showWorkoutDialog, setShowWorkoutDialog] = useState(false)
  const [showWorkoutListDialog, setShowWorkoutListDialog] = useState(false)
  let { gridContainer } = gridStyles(themeContext.theme)

  const toggleWorkoutModal = () => {
    setShowWorkoutModal(!showWorkoutModal)
  }

  const toggleWorkoutDialog = () => {
    setShowWorkoutDialog(!showWorkoutDialog)
  }
  
  const toggleWorkoutListDialog = () => {
    setShowWorkoutListDialog(!showWorkoutListDialog)
  }

  const closeAllDialogs = () => {
    setShowWorkoutDialog(false)
    setShowWorkoutModal(false)
  }

  const saveProgram = async () => {
    let program = {}
    if (typeof programContext.program.id !== 'undefined' && programContext.program.id !== '') {
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

  const saveWorkout = async workout => {
    console.log(`saveWorkout: ${workout}`)
    await programContext.addWorkout(workout)
    // toggleWorkoutModal()
    closeAllDialogs()
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
            {/* <InputLabel shrink>Count</InputLabel> */}
            <TextField
              InputProps={{ classes: inputClasses }}
              id='programName'
              label='Program Name'
              defaultValue={programContext.program.name}
              onChange={handleTextChange}
              variant='outlined'
              size='small'
            />
            <div style={{ marginTop: '10px' }} />
            <TextField
              InputProps={{ classes: inputClasses }}
              id='description'
              label='Description'
              defaultValue={programContext.program.description}
              onChange={handleTextChange}
              variant='outlined'
              size='small'
            />
            <div style={{ marginTop: '10px' }} />
            {programContext.program.workouts && programContext.program.workouts.length > 0 ? (
              <Fragment>
              <label htmlFor='workouts' className={classes.label}>Workouts</label>
              <div css={gridContainer}>
                {renderWorkouts(programContext.program.workouts)}
              </div>
              </Fragment>
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
      toggleWorkoutListDialog()
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
      <WorkoutListDialog
        open={showWorkoutListDialog}
        onClose={toggleWorkoutListDialog}
      />
      <WorkoutFormDialog open={showWorkoutDialog} onClose={toggleWorkoutDialog} saveWorkout={saveWorkout}/>
      {renderMainForm()}
    </Container>
  )
}

export default ProgramForm
