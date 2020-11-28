/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext, useState } from 'react'
import { findIndexOfId } from '../ArrayUtils'
import CloseButton from '../inputs/CloseButton'
import WoContext from '../../context/WoContext'
import ProgramContext from '../../context/ProgramContext'
import { workoutBlock, blockHeader, setBlock } from '../../styles/program'
import { updateProgram, addProgram } from '../../api/programsApi'
import {
  deleteWorkout as deleteWorkoutApi,
  retrieveWorkoutById
} from '../../api/workoutsApi'
import Table from '../tables/SimpleTable'
import Modal from '../Modal'
import WorkoutForm from '../workouts/WorkoutForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { isUndefined } from 'lodash'
import { navigate } from '@reach/router'
import ThemeContext from '../../context/ThemeContext'
import { gridStyles } from '../../styles/gridStyles'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import FormButton from '../inputs/FormButton'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      // margin: theme.spacing(1),
      // width: theme.spacing(100),
      // height: theme.spacing(16)
      width: '90%',
      height: theme.spacing(100)
      // border: `1px solid ${theme.color1.hex}`
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
  let { gridContainer, gridItem } = gridStyles(themeContext.theme)

  const saveProgram = async () => {
    if (typeof programContext.program.id !== 'undefined') {
      console.log(`updating program ${JSON.stringify(programContext.program)}`)
      await updateProgram(programContext.program)
    } else {
      console.log(`adding program ${JSON.stringify(programContext.program)}`)
      await addProgram(programContext.program)
    }
  }

  const addWorkout = async () => {
    await woContext.setEmptyWorkout()
    toggleWorkoutModal()
  }

  const saveWorkout = async workout => {
    await woContext.saveWorkoutInWorkoutsList(workout)
    toggleWorkoutModal()
  }

  // const saveWorkout = workout => {
  //   let updatedProgram = { ...programContext.program }
  //   let index = findIndexOfId(workout.id, updatedProgram.workouts)
  //   if (index > -1) {
  //     let workouts = updateItemById(
  //       workout,
  //       workout.id,
  //       updatedProgram.workouts
  //     )
  //     updatedProgram.workouts = workouts
  //   } else {
  //     updatedProgram.workouts.push(workout)
  //   }
  //   programContext.updateProgram(updatedProgram)
  //   // saveProgram()
  // }

  const editWorkout = async event => {
    let id = event.currentTarget.id
    console.log(`[PROGRAM FORM] editWorkout with id ${id}`)
    let workout = await retrieveWorkoutById(id)
    console.log(`workout: ${JSON.stringify(workout)}`)
    await woContext.updateWorkout(workout)
    toggleWorkoutModal()
  }

  const deleteWorkout = event => {
    let id = event.currentTarget.id
    console.log(`deleting workout with id: ${id}`)
    deleteWorkoutApi(id)
    removeWorkoutFromProgramInContext(id)
  }

  const removeWorkoutFromProgramInContext = workoutId => {
    let program = programContext.program
    let workouts = program.workouts
    let indexOfWorkout = findIndexOfId(workoutId, workouts)
    workouts.splice(indexOfWorkout, 1)
    program.workouts = workouts
    programContext.updateProgram(program)
  }

  const handleTextChange = e => {
    let { id, value } = e.target
    let updatedProgram = { ...programContext.program }
    updatedProgram[id] = value
    programContext.updateProgram(updatedProgram)
  }

  const toggleWorkoutModal = () => {
    setShowWorkoutModal(!showWorkoutModal)
  }

  const handleClose = () => {
    navigate('/programs')
  }

  const renderWorkouts = workouts => {
    return programContext.program.workouts.map(wo => {
      return (
        <div
          key={`${wo.id}-${Math.random()}`}
          id={wo.id}
          css={[workoutBlock, gridItem]}
          style={{ marginLeft: '5px' }}
        >
          <div css={blockHeader}>
            {wo.name}
            <FontAwesomeIcon
              alt={'remove workout from program'}
              id={wo.id}
              style={{ marginLeft: '10px', float: 'right' }}
              icon={faTrashAlt}
              onClick={deleteWorkout}
            />
            <FontAwesomeIcon
              alt={'edit workout'}
              id={wo.id}
              style={{ marginLeft: '10px', float: 'right' }}
              icon={faEdit}
              onClick={editWorkout}
            />
          </div>
          <div>{renderSets(wo.sets)}</div>
        </div>
      )
    })
  }

  const renderSets = sets => {
    if (sets && sets.length > 0) {
      return sets.map(set => {
        let data = {
          headers: ['name', 'reps'],
          rows: [...set.exercises]
        }
        return (
          <div key={set.id} css={setBlock}>
            <Table data={data} disabled={true} />
          </div>
        )
      })
    } else {
      return null
    }
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
              defaultValue={
                isUndefined(programContext.program.name)
                  ? 'program name...'
                  : programContext.program.name
              }
              onChange={handleTextChange}
              variant='outlined'
              size='small'
            />
            <div style={{ marginTop: '10px' }} />
            <TextField
              id='description'
              label='Description'
              defaultValue={
                isUndefined(programContext.program.name)
                  ? 'program description...'
                  : programContext.program.description
              }
              onChange={handleTextChange}
              variant='outlined'
              size='small'
            />
            <div style={{ marginTop: '10px' }} />
            <label htmlFor='workouts'>Workouts</label>
            {programContext.program.workouts &&
            programContext.program.workouts.length > 0 ? (
              <div css={gridContainer}>
                {renderWorkouts(programContext.program.workouts)}
              </div>
            ) : null}
            <div style={{ marginTop: '30px' }} />
            <FormButton
              buttonText={'Add Workout'}
              onClick={addWorkout}
            />
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

  return (
    <Container maxWidth='sm'>
      <Modal showModal={showWorkoutModal} handleClose={toggleWorkoutModal}>
        <WorkoutForm saveWorkout={saveWorkout} />
      </Modal>
      {renderMainForm()}
    </Container>
  )
}

export default ProgramForm
