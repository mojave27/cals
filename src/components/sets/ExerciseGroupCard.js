/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext, useEffect, useState } from 'react'
import { findIndexOfId, sortByStringProperty } from '../ArrayUtils'
import { retrieve } from '../../api/exercisesApi'
import { updateSet } from '../../api/setsApi'
import SetContext from '../../context/SetContext'
import FormButton from '../inputs/FormButton'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import { formInput } from '../../styles/main-styles'
import ExercisesTable from '../exercises/ExercisesTable'
import ThemeContext from '../../context/ThemeContext'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme, styles) => ({
  root: { flexGrow: 1 },
  card: {
    minWidth: '250px',
    margin: 'auto',
    padding: '15px'
  }
}))

// TODO: disconnect this from SetContext and just have it manage the set(s) locally, and save/update
//       to the parent component via props
const ExerciseGroupCard = props => {
  // let themeContext = useContext(ThemeContext)
  // const classes = useStyles(themeContext.theme)
  let setContext = useContext(SetContext)
  const [allExercises, setAllExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([])
  const [showExerciseList, setShowExerciseList] = useState(false)

  useEffect(() => {
    async function fetchData() {
      let exercises = await retrieve()
      setAllExercises(sortByName(exercises))
    }

    fetchData()
    return () => {}
  }, [])

  const sortByName = exercises => {
    let ignoreCase = true
    return sortByStringProperty(exercises, 'name', ignoreCase)
  }

  const handleRepsChange = event => {
    event.stopPropagation()
    let { id, value } = event.target
    let exercisesForSet = [...setContext.set.exercises]
    let index = exercisesForSet.findIndex(
      exercise => exercise.id === id
    )
    exercisesForSet[index].reps = value
    setContext.updateExercisesForSet(exercisesForSet)
  }

  const selectExercise = event => {
    let id = event.target.id
    let updatedSelectedExercises = [...selectedExercises]
    let allExercisesId = findIndexOfId(id, allExercises)
    updatedSelectedExercises.push(allExercises[allExercisesId])
    setSelectedExercises(updatedSelectedExercises)
  }

  const addExercisesToSet = async () => {
    let tempSelectedExercises = [...selectedExercises]
    let modifiedSelectedExercises = tempSelectedExercises.map(exercise => {
      exercise.reps = ''
      return exercise
    })

    let exercisesForSet = [
      ...setContext.set.exercises,
      ...modifiedSelectedExercises
    ]

    await setContext.updateExercisesForSet(exercisesForSet)
    setShowExerciseList(false)
  }

  const toggleModal = () => {
    let newShowExerciseList = !showExerciseList
    setShowExerciseList(newShowExerciseList)
  }

  const deleteExercise = id => {
    let exercises = setContext.set.exercises
    let index = findIndexOfId(id, exercises)
    if (index > -1) {
      exercises.splice(index, 1)
      setContext.updateExercisesForSet(exercises)
      updateSet(setContext.set)
    }
  }

  const editExercise = event => {
    console.log(event.currentTarget.id)
  }

  const saveSet = async () => {
    if (props.saveSet) {
      props.saveSet(setContext.set)
    }
  }

  return showExerciseList ? (
    <ExerciseList
      onSelect={selectExercise}
      onSave={addExercisesToSet}
      onClose={toggleModal}
      exercises={allExercises}
      selectedExercises={selectedExercises}
    />
  ) : (
    <ExerciseGroup
      onAdd={toggleModal}
      onChange={handleRepsChange}
      onDelete={deleteExercise}
      onEdit={editExercise}
      onSave={saveSet}
      selectedExercises={selectedExercises}
    />
  )
}

export default ExerciseGroupCard

const ExerciseGroup = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  const setContext = useContext(SetContext)

  const renderExercisesForSet = exercises => {
    return (
      <Grid container spacing={1} direction={'column'} >
      {exercises.map(exercise => {
      return (
        <Grid item xs={12} sm={4} key={exercise.id}>
          <Card variant='outlined' className={classes.card}>
            <CardHeader
              title={exercise.name}
              subheader={exercise.type ? exercise.type : ' '}
              styles={{ borderBottom: '1px solid red' }}
              action={
                <Tooltip title='Delete'>
                  <IconButton aria-label='delete' onClick={() => props.onDelete(exercise.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              }
            />
            <CardContent>
              <input
                css={[formInput, { width: '100px' }]}
                type='text'
                id={exercise.id}
                name='exerciseReps'
                value={exercise.reps}
                placeholder='exercise reps..'
                onChange={props.onChange}
              />
            </CardContent>
          </Card>
      </Grid>
      )}
    )}
    </Grid>
    )
  }

  return (
    <Box
      style={{
        margin: '30px auto'
      }}
    >
      <Grid
        className={classes.root}
        container
        justify='center'
        direction='column'
        alignItems='center'
        spacing={1}
      >
        <Grid item xs={12} sm={12}>
          <Typography variant='h6'>exercises for set</Typography>
        </Grid>
        <Grid item>
          <Grid container className={classes.root} direction='row' spacing={1}>
            <Grid item>
              <FormButton
                value='Add Exercise(s)'
                variant='contained'
                onClick={props.onAdd}
              />
            </Grid>
            <Grid item>
              <FormButton value='Save Set' onClick={props.onSave} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          {renderExercisesForSet(setContext.set.exercises)}
        </Grid>
      </Grid>
    </Box>
  )
}

const ExerciseList = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)

  const renderAllExercises = exercises => {
    return <ExercisesTable data={exercises} onSelect={props.onSelect} />
  }

  return (
    <Box
      style={{
        width: themeContext.theme.mobile ? '100%' : '60%',
        margin: '30px auto'
      }}
    >
      <Grid
        className={classes.root}
        container
        justify='center'
        direction='column'
        alignItems='center'
        spacing={1}
      >
        <Grid item>
          <Grid container className={classes.root} direction='row' spacing={1}>
            <Grid item>
              <FormButton
                variant='contained'
                onClick={props.onSave}
                value={'Save to Set'}
              />
            </Grid>
            <Grid item>
              <FormButton
                variant='contained'
                onClick={props.onClose}
                value={'Cancel'}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          {renderAllExercises(props.exercises)}
        </Grid>
      </Grid>
    </Box>
  )
}
