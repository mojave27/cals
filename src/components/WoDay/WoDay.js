import React, { useContext, useEffect, useState } from 'react'
import { autoSaveInterval } from 'config/appConfig'
import { navigate } from '@reach/router'
import { cloneDeep } from 'lodash'
import 'react-datepicker/dist/react-datepicker.css'
import 'styles/datePicker.css'
import { retrieveWorkoutById } from 'api/workoutsApi'
import { convertTemplateToActiveWorkout } from 'components/workouts/workoutTemplateConverter'
import Modal from 'components/modules/common/components/Modal'
import WoDayContext from 'context/WoDayContext'
import CardioTable from 'components/tables/CardioTable'
import RangeSlider from 'components/inputs/RangeSlider'
import Workout from 'components/workouts/Workout'
import BasicSpinner from 'components/spinners/BasicSpinner'
import WorkoutChooser from 'components/workouts/WorkoutChooser'
import WoDayAppBar from 'components/WoDay/WoDayAppBar'
import {
  findIndexOfId,
  generateNewId
} from 'components/modules/common/utilties/ArrayUtils'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { fade, makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    borderRadius: '2px',
    border: `1px solid ${theme.palette.grey[400]}`
  },
  section: {
    borderRadius: '2px',
    border: `1px solid ${theme.palette.grey[300]}`,
    textAlign: 'center',
    padding: '15px',
    margin: '10px 0px'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    margin: '3px'
  },
  accordion: {
    // backgroundColor: theme.color2.hex,
    // color: theme.color2_text.hex,
    border: `1px solid ${theme.palette.grey[300]}`
  }
}))

const useStylesInput = makeStyles(theme => ({
  root: {
    // color: theme.color1_text.hex,
    border: `1px solid ${theme.palette.primary.light}`,
    overflow: 'hidden',
    borderRadius: 4,
    // backgroundColor: theme.color1.hex,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      // backgroundColor: '#eee'
    },
    '&$focused': {
      // backgroundColor: '#eee',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.light
    }
  },
  focused: {}
}))

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -5,
    top: 5,
    border: `2px solid ${theme.palette.success.light}`,
    backgroundColor: theme.palette.success.light
  }
}))(Badge)

const WoDay = props => {
  let [showModal, setShowModal] = useState(false)
  let [savingInProgress, setSavingInProgress] = useState(false)
  let [userTriggeredSave, setUserTriggeredSave] = useState(false)
  let woDayContext = useContext(WoDayContext)
  const classes = useStyles()
  const inputClasses = useStylesInput()

  useEffect(() => {
    const timer = setInterval(() => {
      autoSave()
    }, autoSaveInterval);
               // clearing interval
    return () => clearInterval(timer);
  });

  const woDayLoaded = () => {
    return true
  }

  const retrieveWorkout = async workoutId => {
    let workout = await retrieveWorkoutById(workoutId)
    return workout
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const done = () => {
    setShowModal(false)
    window.scrollTo(0, 0)
  }

  const home = () => {
    navigate('/')
  }

  const autoSave = () => {
    if (userTriggeredSave && savingInProgress === false) {
      console.log(`auto saving woday: ${Date.now()}`)
      saveWoDay()
    }
  }

  const saveWoDay = async () => {
    // saves the woday which is held by woDayContext - which should be this one :)
    setUserTriggeredSave(true)
    setSavingInProgress(true)
    await woDayContext.saveWoDay()
    setSavingInProgress(false)
  }

  const handleTextChange = event => {
    let id = event.target.id
    let value = event.target.value
    switch (id) {
      case 'duration':
        setDuration(value)
        break
      case 'weight':
        setWeight(value)
        break
      case 'goals':
        setGoals(value)
        break
      case 'notes':
        setNotes(value)
        break
      case 'date':
        setDate(value)
        break
      default:
        console.log('Sorry, no match for ' + id)
    }
  }

  const handleExerciseChange = update => {
    // {
    // id: id,  <-- will be row-column (e.g. 1-2)
    // name: name, <-- will be property name
    // value: value <-- will be value to change to
    // }
    let woday = woDayContext.copyWoDay()
    let idParts = update.id.split('-')
    let rowId = idParts[0]
    let index = findIndexOfId(rowId, woday.cardio.exercises)
    let exercise = woday.cardio.exercises[index]
    exercise[update.name] = update.value
    woDayContext.updateWoDay(woday)
  }

  const handleLeadCellChange = event => {
    let value = event.target.value
    let name = event.target.name
    let exerciseId = event.target.parentNode.parentNode.id
    let exGroupId = event.target.dataset.exgroupid
    let woday = woDayContext.copyWoDay()
    let exGroupIndex = findIndexOfId(exGroupId, woday.wo.exerciseGroups)
    let exIndex = findIndexOfId(
      exerciseId,
      woday.wo.exerciseGroups[exGroupIndex].exercises
    )
    let ex = woday.wo.exerciseGroups[exGroupIndex].exercises[exIndex]

    ex[name] = value
    woDayContext.updateWoDay(woday)
  }

  const handleSetChange = event => {
    let exerciseId = event.target.dataset.exerciseid
    let setId = event.target.dataset.setid
    let exGroupId = event.target.dataset.exgroupid
    let name = event.target.name
    let value = event.target.value
    let woday = woDayContext.copyWoDay()
    let wo = woday.wo

    // find set
    let setIndex = findIndexOfId(setId, wo.sets)
    let set = wo.sets[setIndex]

    // find exercise
    let exGroupIndex = findIndexOfId(exGroupId, set.exerciseGroups)
    let exIndex = findIndexOfId(
      exerciseId,
      set.exerciseGroups[exGroupIndex].exercises
    )
    let ex = set.exerciseGroups[exGroupIndex].exercises[exIndex]

    // update weight or reps
    ex[name] = value

    woDayContext.updateWoDay(woday)
  }

  const setWeight = weight => {
    let woday = woDayContext.copyWoDay()
    woday.weight = weight
    woDayContext.updateWoDay(woday)
  }

  const setNotes = notes => {
    let woday = woDayContext.copyWoDay()
    woday.notes = notes
    woDayContext.updateWoDay(woday)
  }

  const setDate = date => {
    let upDate = new Date(date)
    let woday = woDayContext.copyWoDay()
    //TODO: figure out why we have to add '1' to the day for it to be accurate.
    woday.date = {
      day: upDate.getDate() + 1,
      month: upDate.getMonth(),
      year: upDate.getFullYear()
    }
    woDayContext.updateWoDay(woday)
  }

  const setDuration = duration => {
    let woday = woDayContext.copyWoDay()
    woday.duration = duration
    woDayContext.updateWoDay(woday)
  }

  const setGoals = goals => {
    let woday = woDayContext.copyWoDay()
    woday.goals = goals
    woDayContext.updateWoDay(woday)
  }

  const setEnergyRange = value => {
    let woday = woDayContext.copyWoDay()
    woday.energy = value
    woDayContext.updateWoDay(woday)
  }

  const setSleepRange = value => {
    let woday = woDayContext.copyWoDay()
    woday.sleep = value
    woDayContext.updateWoDay(woday)
  }

  const getStartDate = () => {
    let date = woDayContext.woday.date
    let startDate = new Date(date.year, date.month, date.day)
    let month =
      startDate.getMonth() + 1 < 10
        ? `0${startDate.getMonth() + 1}`
        : startDate.getMonth() + 1
    let day =
      startDate.getDate() < 10 ? `0${startDate.getDate()}` : startDate.getDate()
    let dateString = `${startDate.getFullYear()}-${month}-${day}`
    return dateString
  }

  const handleSliderChange = (event, value) => {
    let id = event.target.id
    switch (id) {
      case 'energyRange':
        // console.log('energyRange update.')
        setEnergyRange(value)
        break
      case 'sleepRange':
        // console.log('sleepRange update.')
        setSleepRange(value)
        break
      default:
        console.log('Sorry, no match for ' + event)
    }
  }

  const addCardioExercise = () => {
    let newCardioExercise = {
      id: generateNewId(woDayContext.woday.cardio.exercises),
      type: '',
      duration: '',
      distance: '',
      heartRate: '? bpm'
    }
    let woday = woDayContext.copyWoDay()
    woday.cardio.exercises.push(newCardioExercise)
    woDayContext.updateWoDay(woday)
  }

  const addExercise = () => {
    let woday = woDayContext.copyWoDay()

    let newExGroup = {
      id: generateNewId(woday.wo.exerciseGroups),
      exercises: []
    }
    newExGroup.exercises.push(generateNewExercise())
    woday.wo.exerciseGroups.push(newExGroup)

    let updatedSets = addExerciseToSets(woday.wo.sets, cloneDeep(newExGroup))
    woday.wo.sets = updatedSets

    woDayContext.updateWoDay(woday)
  }

  const addExerciseToSets = (sets, exGroup) => {
    return sets.map(set => {
      set.exerciseGroups.push(exGroup)
      return set
    })
  }

  const generateNewExercise = () => {
    return {
      id: 0,
      name: '',
      reps: 0,
      weight: 0
    }
  }

  const chooseWorkout = async workoutId => {
    let updatedWoDay = woDayContext.copyWoDay()
    let workoutTemplate = await retrieveWorkout(workoutId)
    console.log(workoutId)
    console.log(workoutTemplate)
    let workout = convertTemplateToActiveWorkout(workoutTemplate)
    updatedWoDay.wo = workout
    woDayContext.updateWoDay(updatedWoDay)
    toggleModal()
  }

  const showWorkoutChooser = () => {
    toggleModal()
  }

  const addSet = () => {
    let woday = woDayContext.copyWoDay()
    let wo = woday.wo

    // create new set and exercise groups, add each exercise id, and set weights reps to empty
    // TODO: set the weights to same as previous set, if there was a previous set

    let newSetId = generateNewId(wo.sets)
    let newSet = {}
    if (newSetId > 0) {
      newSet = copyFromPreviousSet(wo.sets, newSetId)
      newSet.id = newSetId
    } else {
      newSet = {
        id: generateNewId(wo.sets),
        exerciseGroups: wo.exerciseGroups.map(exGroup => {
          let newExGroup = {}
          newExGroup.id = exGroup.id
          newExGroup.exercises = exGroup.exercises.map(ex => {
            return {
              id: ex.id,
              weight: '',
              reps: ''
            }
          })
          return newExGroup
        })
      }
    }
    wo.sets.push(newSet)

    woDayContext.updateWoDay(woday)
    // save to DB (we want auto-save on everything... maybe)
  }

  const copyFromPreviousSet = allSets => {
    // get previous set
    let previousSet = allSets[allSets.length - 1]
    let newSet = cloneDeep(previousSet)
    // clear the reps from newSet
    let newExGroups = newSet.exerciseGroups.map(exGroup => {
      let newExGroup = {
        id: exGroup.id,
        exercises: exGroup.exercises.map(ex => {
          return {
            id: ex.id,
            weight: ex.weight,
            reps: ''
          }
        })
      }
      return newExGroup
    })
    newSet.exerciseGroups = newExGroups
    return newSet
  }

  const convertCardioForTable = () => {
    let data = {
      headers: woDayContext.woday.cardio.headers,
      rows: woDayContext.woday.cardio.exercises
    }
    return data
  }

  const saveToDuration = value => {
    setDuration(value)
  }

  const doStuff = () => {
    // console.log(JSON.stringify(woDayContext.woday))
  }

  return (
    <React.Fragment>
      <Modal showModal={showModal} handleClose={toggleModal}>
        <WorkoutChooser done={done} chooseWorkout={chooseWorkout} />
      </Modal>
      {doStuff()}
      <WoDayAppBar
        onSave={saveWoDay}
        onClose={home}
        onSaveToDuration={saveToDuration}
      />
      {woDayLoaded() ? (
        <Container className={classes.container}>
          <Grid container justify='flex-start'>
            <Grid item xs={12} sm={12}>
              <Box className={classes.section}>
                <Grid container spacing={1} justify='flex-start'>
                  <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                      <TextField
                        id='date'
                        label='Date'
                        type='date'
                        defaultValue={getStartDate()}
                        onChange={handleTextChange}
                        className={classes.textField}
                        variant={'outlined'}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                      <TextField
                        InputProps={{ classes: inputClasses }}
                        id={'duration'}
                        name={'duration'}
                        label={'Duration'}
                        value={woDayContext.woday.duration}
                        onChange={handleTextChange}
                        variant='outlined'
                        size='small'
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                      <TextField
                        InputProps={{ classes: inputClasses }}
                        id={'goals'}
                        name={'goals'}
                        label={'Goals'}
                        defaultValue={woDayContext.woday.goals}
                        onChange={handleTextChange}
                        variant='outlined'
                        size='small'
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                      <TextField
                        InputProps={{ classes: inputClasses }}
                        id={'weight'}
                        name={'weight'}
                        label={'Weight'}
                        defaultValue={woDayContext.woday.weight}
                        onChange={handleTextChange}
                        variant='outlined'
                        size='small'
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                      <RangeSlider
                        label={'Energy'}
                        id='energyRange'
                        min={0}
                        max={10}
                        value={woDayContext.woday.energy}
                        onChange={handleSliderChange}
                        // theme={woDayContext.theme}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                      <RangeSlider
                        label={'Sleep'}
                        id='sleepRange'
                        min={0}
                        max={10}
                        value={woDayContext.woday.sleep}
                        onChange={handleSliderChange}
                        theme={woDayContext.theme}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              {/* --- section: NOTES ------------------------------------------ */}
              <Box className={classes.section}>
                <Accordion className={classes.accordion}>
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon classes={{ root: classes.expandIcon }} />
                    }
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <Typography className={classes.heading}>
                      <StyledBadge
                        variant='dot'
                        invisible={woDayContext.woday.notes.length === 0}
                      >
                        {'Notes'}
                      </StyledBadge>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      id='notes'
                      label='Multiline'
                      fullWidth
                      multiline
                      rows={4}
                      defaultValue={woDayContext.woday.notes}
                      onChange={handleTextChange}
                      variant='outlined'
                    />
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              {/* --- section 2: Cardio --------------------------------------- */}
              <Box className={classes.section}>
                <Typography component={'h6'}>{'Cardio'}</Typography>
                <CardioTable
                  id={0}
                  data={convertCardioForTable()}
                  deleteRow={event => console.log(event)}
                  addCardioExercise={addCardioExercise}
                  onChange={handleExerciseChange}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            {/* --- section 3: Weights --------------------------------------- */}
            <Box className={classes.section}>
              <Typography component={'h6'}>{'Weights'}</Typography>
              <Workout
                wo={woDayContext.woday.wo}
                addExercise={addExercise}
                addSet={addSet}
                showWorkoutChooser={showWorkoutChooser}
                onChange={handleSetChange}
                onLeadCellChange={handleLeadCellChange}
              />
            </Box>
          </Grid>
        </Container>
      ) : (
        <BasicSpinner show={true} />
      )}
    </React.Fragment>
  )
}

export default WoDay
