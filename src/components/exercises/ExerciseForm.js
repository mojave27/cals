import React, { useState } from 'react'
import BasicSpinner from '../spinners/BasicSpinner'
import TextInput from '../inputs/TextInput'
import Select from '../inputs/Select.mui'
import FormButton from '../inputs/FormButton'
import { EXERCISE_TYPES } from '../../constants'
import { addExercise } from '../../api/exercisesApi'
import { Box, Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const options = [
  EXERCISE_TYPES.COMPOUND,
  EXERCISE_TYPES.ISOLATION
]

const ExerciseForm = props => {
  const [exerciseName, setExerciseName] = useState('')
  const [exerciseType, setExerciseType] = useState('')
  const [showSpinner, setShowSpinner] = useState(false)
  const isMobile = useMediaQuery('(max-width:768px)');

  const addExerciseToDb = async () => {
    setShowSpinner(true)
    const exercise = {
      name: exerciseName,
      reps: '',
      type: exerciseType,
      id: ''
    }
    addExercise(exercise).then(response => {
      setShowSpinner(false)
      props.done()
    })
  }

  const handleSelectType = e => {
    let value = e.target.value
    setExerciseType(value)
  }

  const handleTextChange = e => {
    let { id, value } = e.target
    switch (id) {
      case 'exerciseName':
        setExerciseName(value)
        break
      case 'exerciseType':
        setExerciseType(value)
        break
      default:
        console.log(`no match for ${id}`)
    }
  }

  return (
    <React.Fragment>
    <BasicSpinner show={showSpinner} />
    <Box style={{ width: isMobile ? '80%' : '20%', padding:'15px', margin: 'auto', textAlign: 'center' }}>
      <Grid container justify={'center'} alignItems={'center'} spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography paragraph={true} variant={'h6'}>
            Add Exercise
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextInput
            id='exerciseName'
            name='Exercise Name'
            data={exerciseName}
            onChange={handleTextChange}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Select value={exerciseType} options={options} onChange={handleSelectType} label={'Type'} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormButton value={'Submit'} onClick={addExerciseToDb} />
        </Grid>
      </Grid>
    </Box>
    </React.Fragment>
  )
}

export default ExerciseForm
