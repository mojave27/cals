import React, { useContext, useState } from 'react'
import SetDialog from './SetDialog'
import {
  findIndexOfId,
  retrieveItemById,
  updateItemById,
  generateNewId
} from '../modules/common/utilties/ArrayUtils'
import ExerciseGroupTable from '../tables/ExerciseGroupTable'
import WoContext from '../../context/WoContext'
import SetContext from '../../context/SetContext'
import FormButton from '../inputs/FormButton'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  box: {
    margin: theme.mobile ? theme.spacing(1) : theme.spacing(3)
  },
  container: {
    marginBottom: '10px'
  },
  th: {
    textAlign: 'left'
  },
  thLeft: {
    width: '70%'
  },
  td: {
    textAlign: 'left'
  },
  tdLeft: {
    width: '70%'
  },
  cardHeader: {
    padding: '6px 16px 0px 16px'
  },
  cardContent: {
    padding: '8px 16px 0px 16px',
    backgroundColor: theme.palette.background.default
  }
}))

const WorkoutForm = props => {
  const [showExerciseGroupDialog, setShowExerciseGroupDialog] = useState(false)
  let woContext = useContext(WoContext)
  let setContext = useContext(SetContext)
  const isMobile = useMediaQuery('(max-width:768px)')
  /* eslint-disable-next-line */
  const classes = useStyles()

  const toggleSetDialog = () => {
    setShowExerciseGroupDialog(!showExerciseGroupDialog)
  }

  const editSet = id => {
    let index = findIndexOfId(id, woContext.workout.exerciseGroups)
    setContext.updateSet(woContext.workout.exerciseGroups[index])
    toggleSetDialog()
  }

  const showSetCard = () => {
    setContext.clearSet()
    toggleSetDialog()
  }

  const handleTextChange = event => {
    let { id, value } = event.target
    let updatedWorkout = { ...woContext.workout }
    updatedWorkout[id] = value
    woContext.updateWorkout(updatedWorkout)
  }

  // add/update exercise group in workout context
  const addExerciseGroupToWorkout = exGroup => {
    if (typeof exGroup.id === 'undefined') {
      addSetToWorkout(exGroup)
    } else {
      updateSetInWorkout(exGroup)
    }
  }

  const addSetToWorkout = exGroup => {
    exGroup = setExGroupId(exGroup)
    let updatedWorkout = { ...woContext.workout }
    updatedWorkout.exerciseGroups.push(exGroup)
    woContext.updateWorkout(updatedWorkout)
    setShowExerciseGroupDialog(false)
  }

  const updateSetInWorkout = exGroup => {
    let updatedWorkout = { ...woContext.workout }
    let index = findIndexOfId(exGroup.id, updatedWorkout.exerciseGroups)
    updatedWorkout.exerciseGroups[index] = exGroup
    woContext.updateWorkout(updatedWorkout)
    setShowExerciseGroupDialog(false)
  }

  const setExGroupId = exGroup => {
    if (typeof exGroup.id === 'undefined') {
      console.log(`exGroup id is undefined`)
      let newId = generateNewId(woContext.workout.exerciseGroups)
      exGroup.id = newId
    }
    return exGroup
  }

  const handleRowClick = event => {
    let id = event.currentTarget.id
    console.log(id)
  }

  // lots of changes going on here...
  const handleSetChange = update => {
    let set = { ...retrieveItemById(update.setId, woContext.workout.exerciseGroups) }

    // find exercise with matching id
    let targetExercise = { ...retrieveItemById(update.id, set.exercises) }

    // update the appropriate value (based on name field - which will be either 'name' or 'reps')
    //   set that value to update.value
    targetExercise[update.name] = update.value

    // update set
    let updatedExerciseList = updateItemById(
      targetExercise,
      update.id,
      set.exercises
    )
    set.exercises = updatedExerciseList

    let updatedSetList = updateItemById(
      set,
      update.setId,
      woContext.workout.sets
    )

    //update context
    woContext.updateExerciseGroupsForWorkout(updatedSetList)
  }

  const deleteExercise = id => {
    console.log(id)
  }

  const deleteSet = id => {
    let exGroups = woContext.workout.exerciseGroups
    // throw up confirmation modal
    // find set in woContext.workout.sets
    let index = findIndexOfId(id, exGroups)
    if (index > -1) {
      // delete the set
      exGroups.splice(index, 1)
      woContext.updateExerciseGroupsForWorkout(exGroups)
      // updateWorkout(woContext.workout)
    } else {
      console.log(
        `set with id ${id} not found in woContext.workout.exerciseGroups`
      )
    }
  }

  const renderSets = exGroups => {
    if (exGroups && exGroups.length > 0) {
      return exGroups.map(exGroup => {
        let data = {
          setId: exGroup.id,
          headers: ['name', 'reps'],
          rows: [...exGroup.exercises]
        }
        return (
          <ExerciseGroupTable
            key={exGroup.id}
            disabled={true}
            data={data}
            handleSetChange={handleSetChange}
            onClick={handleRowClick}
            deleteRow={deleteExercise}
            deleteItem={deleteSet}
            editItem={editSet}
          />
        )
      })
    } else {
      return null
    }
  }

  return (
    <React.Fragment>
      <Box style={{ margin: 'auto', width: isMobile ? '100%' : '60%' }}>
          <Card className={classes.root} variant='outlined'>
            <CardContent className={classes.cardContent}>
              {/* <Box style={{ textAlign: 'right' }}>
                <FormButton value={'Save Workout'} onClick={saveWorkout} />
              </Box> */}
              <Box className={classes.box}>
                <Grid container justify='flex-start' spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      style={{ float: 'left' }}
                      id='name'
                      label='Workout Name'
                      defaultValue={
                        woContext.workout.name ? woContext.workout.name : ''
                      }
                      onChange={handleTextChange}
                      variant='outlined'
                      size='small'
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      style={{ float: 'left', width: '80%' }}
                      id='description'
                      label='Workout Description'
                      defaultValue={
                        woContext.workout.description
                          ? woContext.workout.description
                          : ''
                      }
                      onChange={handleTextChange}
                      variant='outlined'
                      size='small'
                    />
                  </Grid>
                </Grid>
              </Box>
              <Divider />

              <Box className={classes.box}>
                <div style={{ display: 'block', paddingBottom: '10px' }}>
                  <Grid container justify='center' spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography paragraph={true} variant={'h6'}>
                        Exercise Groups
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormButton value={'Add Set'} onClick={showSetCard} />
                    </Grid>
                  </Grid>
                  <div style={{ margin: '0px 0px 20px 0px' }} />
                  {renderSets(woContext.workout.exerciseGroups)}

                  <div style={{ marginTop: '25px', marginBottom: '25px' }} />

                  <SetDialog
                    open={showExerciseGroupDialog}
                    onSave={addExerciseGroupToWorkout}
                    onClose={toggleSetDialog}
                  />
                </div>
              </Box>
            </CardContent>
          </Card>
        </Box>
    </React.Fragment>
  )
}

export default WorkoutForm
