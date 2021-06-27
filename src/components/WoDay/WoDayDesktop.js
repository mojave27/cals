import React, { useContext, useEffect, useState } from 'react'
import { autoSaveInterval } from 'config/appConfig'
import { navigate } from '@reach/router'
import { cloneDeep, isEmpty } from 'lodash'
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
  generateNewId,
  retrieveItemById,
} from 'components/modules/common/utilties/ArrayUtils'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { cardioStarted, workoutStarted } from 'components/workouts/WorkoutUtils'
import { fade, makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    borderRadius: '2px',
    border: `1px solid ${theme.palette.grey[400]}`,
  },
  section: {
    borderRadius: '2px',
    border: `1px solid ${theme.palette.grey[300]}`,
    textAlign: 'center',
    padding: '15px',
    margin: '10px 0px',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    margin: '3px',
  },
  accordion: {
    border: `1px solid ${theme.palette.grey[300]}`,
  },
  accordionDetails: {
    backgroundColor: 'rgba(0, 0, 0, .05)',
  },
  textField: {
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[800] : '#fff',
  },
}))

const useStylesInput = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.primary.light}`,
    overflow: 'hidden',
    borderRadius: 4,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
    },
    '&$focused': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.light,
    },
  },
  focused: {},
}))

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -5,
    top: 5,
    border: `2px solid ${theme.palette.success.light}`,
    backgroundColor: theme.palette.success.light,
  },
}))(Badge)

const WoDay = (props) => {
  let [showModal, setShowModal] = useState(false)
  let [savingInProgress, setSavingInProgress] = useState(false)
  let [userTriggeredSave, setUserTriggeredSave] = useState(false)
  let [activeWo, setActiveWo] = useState(0)
  let woDayContext = useContext(WoDayContext)
  const classes = useStyles()
  const inputClasses = useStylesInput()

  useEffect(() => {
    const timer = setInterval(() => {
      autoSave()
    }, autoSaveInterval)
    // clearing interval
    return () => clearInterval(timer)
  })

  const woDayLoaded = () => {
    return true
  }

  const retrieveWorkout = async (workoutId) => {
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

  const handleTextChange = (event) => {
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

  const handleExerciseChange = (update) => {
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

  const handleLeadCellChange = (event) => {
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

  const handleSetChange = (update, index) => {
    // index is for the row
    const { exerciseId, exGroupId, name, value, rowIndex } = update
    console.log(`index: ${index}`)
    console.log(`rowIndex: ${rowIndex}`)
    console.log(`exerciseId: ${exerciseId}`)
    console.log(`exGroupId: ${exGroupId}`)
    console.log(`name: ${name}`)
    console.log(`value: ${value}`)

    // get the workout
    let woday = woDayContext.copyWoDay()
    let wo = {}

    //TODO: remove the conditional logic after updating all workouts
    if (woday.workouts !== undefined) {
      wo = woday.workouts[index]
    } else {
      wo = woday.wo
    }

    // get the exercise group from workout.exerciseGroups
    let exGroupIndex = findIndexOfId(exGroupId, wo.exerciseGroups)
    let exGroup = wo.exerciseGroups[exGroupIndex]

    // get the exercise from the exerciseGroup
    let exIndex = findIndexOfId(exerciseId, exGroup.exercises)
    let ex = exGroup.exercises[exIndex]

    // get the set from the exercise
    let set = ex.sets[rowIndex]

    // update the set's weight or reps
    set[name] = value
    woDayContext.updateWoDay(woday)
  }

  const setWeight = (weight) => {
    let woday = woDayContext.copyWoDay()
    woday.weight = weight
    woDayContext.updateWoDay(woday)
  }

  const setNotes = (notes) => {
    let woday = woDayContext.copyWoDay()
    woday.notes = notes
    woDayContext.updateWoDay(woday)
  }

  const setDate = (date) => {
    let upDate = new Date(date)
    let woday = woDayContext.copyWoDay()
    //TODO: figure out why we have to add '1' to the day for it to be accurate.
    woday.date = {
      day: upDate.getDate() + 1,
      month: upDate.getMonth(),
      year: upDate.getFullYear(),
    }
    woDayContext.updateWoDay(woday)
  }

  const setDuration = (duration) => {
    let woday = woDayContext.copyWoDay()
    woday.duration = duration
    woDayContext.updateWoDay(woday)
  }

  const setGoals = (goals) => {
    let woday = woDayContext.copyWoDay()
    woday.goals = goals
    woDayContext.updateWoDay(woday)
  }

  const setEnergyRange = (value) => {
    let woday = woDayContext.copyWoDay()
    woday.energy = value
    woDayContext.updateWoDay(woday)
  }

  const setSleepRange = (value) => {
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
      heartRate: '? bpm',
    }
    let woday = woDayContext.copyWoDay()
    woday.cardio.exercises.push(newCardioExercise)
    woDayContext.updateWoDay(woday)
  }

  const addExercise = () => {
    let woday = woDayContext.copyWoDay()

    let newExGroup = {
      id: generateNewId(woday.wo.exerciseGroups),
      exercises: [],
    }
    newExGroup.exercises.push(generateNewExercise())
    woday.wo.exerciseGroups.push(newExGroup)

    let updatedSets = addExerciseToSets(woday.wo.sets, cloneDeep(newExGroup))
    woday.wo.sets = updatedSets

    woDayContext.updateWoDay(woday)
  }

  const addExerciseToSets = (sets, exGroup) => {
    return sets.map((set) => {
      set.exerciseGroups.push(exGroup)
      return set
    })
  }

  const generateNewExercise = () => {
    return {
      id: 0,
      name: '',
      reps: 0,
      weight: 0,
    }
  }

  const chooseWorkout = async (workoutId) => {
    let updatedWoDay = woDayContext.copyWoDay()
    let workoutTemplate = await retrieveWorkout(workoutId)
    console.log(workoutId)
    let workout = convertTemplateToActiveWorkout(workoutTemplate)
    updatedWoDay.workouts[activeWo] = workout
    woDayContext.updateWoDay(updatedWoDay)
    toggleModal()
  }

  const addWorkout = () => {
    let woIndex = woDayContext.addEmptyWorkout()
    showWorkoutChooser(woIndex)
  }

  const deleteWorkout = (woIndex) => {
    woDayContext.removeWorkout(woIndex)
  }

  const showWorkoutChooser = (workoutIndex) => {
    setActiveWo(workoutIndex)
    toggleModal()
  }

  const addSet = (workoutId, exGroupId, exerciseId) => {
    let woday = woDayContext.copyWoDay()
    let wo = retrieveItemById(workoutId, woday.workouts)

    // create new set in the specified exGroup.exercise
    // get the exGroup
    let exGroup = retrieveItemById(exGroupId, wo.exerciseGroups)

    // get the exercise
    let exercise = retrieveItemById(exerciseId, exGroup.exercises)

    // add the set (use same weight as previous set, if there was a previous set)
    let newSet = {}
    newSet = copyFromPreviousSet(exercise.sets)

    exercise.sets.push(newSet)

    woDayContext.updateWoDay(woday)
    // save to DB (we want auto-save on everything... maybe)
  }

  const copyFromPreviousSet = (allSets) => {
    let previousSet = allSets[allSets.length - 1]
    let newSet = { weight: previousSet.weight, reps: '' }
    return newSet
  }

  const convertCardioForTable = () => {
    let data = {
      headers: woDayContext.woday.cardio.headers,
      rows: woDayContext.woday.cardio.exercises,
    }
    return data
  }

  const saveToDuration = (value) => {
    setDuration(value)
  }

  const doStuff = () => {
    // console.log(JSON.stringify(woDayContext.woday))
  }

  const deleteRow = (rowId) => {
    console.log(`deleting row from cardio table with id: ${rowId}`)
  }

  const hasStats = () => {
    let result = false
    if (Number(woDayContext.woday.duration) !== 0) result = true
    if (!isEmpty(woDayContext.woday.goals)) result = true
    if (!isEmpty(woDayContext.woday.weight)) result = true
    if (Number(woDayContext.woday.energy) < 10) result = true
    if (Number(woDayContext.woday.sleep) < 10) result = true
    return result
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
                <Accordion className={classes.accordion}>
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon classes={{ root: classes.expandIcon }} />
                    }
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <Typography className={classes.heading}>
                      <StyledBadge variant='dot' invisible={!hasStats()}>
                        {`Stats`}
                      </StyledBadge>
                    </Typography>
                    <br/>
                    <Typography variant='caption'>
                      <StyledBadge variant='dot' invisible={!hasStats()}>
                        {`Duration: ${woDayContext.woday.duration} - Weight: ${isEmpty(woDayContext.woday.weight) ? 0 : woDayContext.woday.weight}`}
                      </StyledBadge>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordionDetails}>
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
                              shrink: true,
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
                  </AccordionDetails>
                </Accordion>
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
                  <AccordionDetails className={classes.accordionDetails}>
                    <TextField
                      className={classes.textField}
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
                <Accordion className={classes.accordion}>
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon classes={{ root: classes.expandIcon }} />
                    }
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <Typography component={'h6'} className={classes.heading}>
                      <StyledBadge
                        variant='dot'
                        invisible={!cardioStarted(woDayContext.woday)}
                      >
                        {'Cardio'}
                      </StyledBadge>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordionDetails}>
                    <CardioTable
                      id={0}
                      data={convertCardioForTable()}
                      deleteRow={deleteRow}
                      addCardioExercise={addCardioExercise}
                      onChange={handleExerciseChange}
                    />
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid>
          </Grid>
          {/* --- section 3: Weights --------------------------------------- */}
          <Grid item xs={12} sm={12}>
            <Box className={classes.section}>
              <Grid item xs={12} sm={12}>
                <Container style={{ marginBottom: '10px' }}>
                  <Typography component={'h6'}>{'Weights'}</Typography>
                  <Button variant='outlined' onClick={addWorkout} size='small'>
                    {'Add a workout'}
                  </Button>
                </Container>
              </Grid>
              {woDayContext.woday.workouts !== undefined ? (
                <React.Fragment>
                  {woDayContext.woday.workouts.map((wo, index) => {
                    return (
                      <Grid key={index} item xs={12} sm={12}>
                        <Accordion
                          key={`${wo.name}-${index}`}
                          className={classes.accordion}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon
                                classes={{ root: classes.expandIcon }}
                              />
                            }
                            aria-controls='panel1a-content'
                            id='panel1a-header'
                          >
                              <Typography variant={'h6'}>
                                <StyledBadge
                                  variant='dot'
                                  invisible={!workoutStarted(wo)}
                                >
                                  {wo.name}
                                </StyledBadge>
                              </Typography>
                          </AccordionSummary>
                          <AccordionDetails
                            className={classes.accordionDetails}
                          >
                            <Workout
                              wo={wo}
                              addExercise={addExercise}
                              addSet={addSet}
                              showWorkoutChooser={() =>
                                showWorkoutChooser(index)
                              }
                              onChange={(event) =>
                                handleSetChange(event, index)
                              }
                              onLeadCellChange={handleLeadCellChange}
                              deleteWorkout={() => deleteWorkout(index)}
                            />
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    )
                  })}
                </React.Fragment>
              ) : (
                <Grid item xs={12} sm={12}>
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
              )}
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
