import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { navigate } from '@reach/router'
import { useContext, useEffect, useState } from 'react'
import { retrieveWorkoutById } from '../../api/workoutsApi'
import Modal from '../Modal'
import WoDayContext from '../../context/WoDayContext'
import TextInput from '../inputs/TextInput'
import CardioTable from '../tables/CardioTable'
import RangeSlider from '../inputs/RangeSlider'
import DateInput from '../inputs/DateInput'
import Workout from '../workouts/Workout'
import ThemeContext from '../../context/ThemeContext'
import BasicSpinner from '../spinners/BasicSpinner'
import { cloneDeep } from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import WorkoutChooser from '../workouts/WorkoutChooser'
import { findIndexOfId, generateNewId } from '../ArrayUtils'
import { styles } from '../../styles/MainStyles'
import { woDayStyles } from '../../styles/WoDayStyles'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/datePicker.css'
import StopWatch from '../Admin/StopWatch'
import { AppBar, Toolbar } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.color2_text.hex,
    backgroundColor: theme.color2.hex,
    margin: '3px'
  }
}))

const WoDay = props => {
  let [showModal, setShowModal] = useState(false)
  let [showStopWatch, setShowStopWatch] = useState(false)
  let woDayContext = useContext(WoDayContext)
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)

  let { cardNoHover, detailCard, row } = styles(themeContext.theme)

  let { section, sectionHeader, woTable } = woDayStyles(themeContext.theme)

  useEffect(() => {
    windowLoc()
    // return () => { }
  }, )

  const windowLoc = () => {
    if (typeof window !== "undefined") {
      window.onscroll = () => {
        let currentScrollPos = window.pageYOffset;
        console.log(currentScrollPos)
        let maxScroll = document.body.scrollHeight - window.innerHeight;
        // console.log(maxScroll)

        // console.log(currentScrollPos/maxScroll)
        
        if ( (currentScrollPos/maxScroll) > .10) {
          setShowStopWatch(true)
        }else{
          setShowStopWatch(false)
        }
        // if (currentScrollPos > 0 && currentScrollPos < maxScroll) {
        //   this.setState({ opacity: "0" })
        //   // console.log(currentScrollPos)
        // } else {
        //   this.setState({ opacity: "1" })
        // }
      }
    }
  }

  const woDayLoaded = () => {
    return true
  }

  const retrieveWorkout = async workoutId => {
    let workout = await retrieveWorkoutById(workoutId)
    console.log(workout)
    return workout
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const done = () => {
    setShowModal(false)
  }

  const home = () => {
    navigate('/')
  }

  const saveWoDay = async () => {
    // saves the woday which is held by woDayContext - which should be this one :)
    await woDayContext.saveWoDay()
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
    console.log(update)
    let woday = woDayContext.copyWoDay()
    let idParts = update.id.split('-')
    let rowId = idParts[0]
    let index = findIndexOfId(rowId, woday.cardio.exercises)
    let exercise = woday.cardio.exercises[index]
    console.log(exercise)
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

  const setDate = async jsDate => {
    let woday = woDayContext.copyWoDay()
    woday.date = {
      day: jsDate.getDate(),
      month: jsDate.getMonth(),
      year: jsDate.getFullYear()
    }
    await woDayContext.updateWoDay(woday)
  }

  const getStartDate = () => {
    let date = woDayContext.woday.date
    let startDate = new Date(date.year, date.month, date.day)
    return startDate
  }

  const handleSliderChange = event => {
    let id = event.target.id
    let value = Number(event.target.value)
    switch (id) {
      case 'energyRange':
        console.log('energyRange update.')
        setEnergyRange(value)
        break
      case 'sleepRange':
        setSleepRange(value)
        break
      default:
        console.log('Sorry, no match for ' + id)
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

  const convertTemplateToActiveWorkout = woTemplate => {
    console.log(`converting workout template to active workout`)
    let newExGroups = woTemplate.exerciseGroups.map(exGroup => {
      let newExercises = exGroup.exercises.map(exercise => {
        let newExercise = cloneDeep(exercise)
        delete newExercise.type
        newExercise.weight = ''
        newExercise.reps = ''
        return newExercise
      })
      let newExGroup = {}
      newExGroup.id = exGroup.id
      newExGroup.exercises = newExercises
      return newExGroup
    })

    let sets = [
      {
        id: 0,
        exerciseGroups: newExGroups
      }
    ]
    let workout = cloneDeep(woTemplate)
    workout.sets = sets
    return workout
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

  const startTimer = () => {
    setShowStopWatch(!showStopWatch)
  }

  return (
    <React.Fragment>
      <Modal showModal={showModal} handleClose={toggleModal}>
        <WorkoutChooser done={done} chooseWorkout={chooseWorkout} />
      </Modal>
      <div>
        {showStopWatch === true ? (
          <AppBar position='sticky'>
            <Toolbar>
              <StopWatch />
              <Button
                    style={{ margin: '3px' }}
                    variant='contained'
                    size='small'
                    onClick={saveWoDay}
                  >
                    {'Save'}
                  </Button>>
            </Toolbar>
          </AppBar>
        ) : null}
        {woDayLoaded() ? (
          <div css={detailCard}>
            <div id={'cardNoHover'} css={cardNoHover}>
              <Grid
                container
                direction='row'
                justify='flex-end'
                alignItems='center'
                spacing={1}
              >
                <Grid item xs={6} sm={3}>
                  <Button
                    style={{ margin: '3px' }}
                    variant='contained'
                    size='small'
                    onClick={saveWoDay}
                  >
                    {'Save'}
                  </Button>
                  <Button
                    style={{ margin: '3px' }}
                    variant='contained'
                    size='small'
                    onClick={home}
                  >
                    {'Close'}
                  </Button>
                </Grid>
              </Grid>
              {/* </div> */}
              {/* --- section 1: Details --------------------------------------- */}
              <div
                css={row}
                style={{
                  marginTop: '10px',
                  padding: '10px',
                  border: '1px solid #eee'
                }}
              >
                <Grid container spacing={1} justify='flex-start'>
                  <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                      <DateInput
                        startDate={getStartDate()}
                        setStartDate={setDate}
                        label={'Date'}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                      <TextInput
                        label={'Duration'}
                        name={'duration'}
                        id={'duration'}
                        placeholder={'workout duration...'}
                        value={woDayContext.woday.duration}
                        onChange={handleTextChange}
                        styles={{ width: '50%' }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                      <TextInput
                        label={'Goals'}
                        name={'goals'}
                        id={'goals'}
                        placeholder={'enter goals here'}
                        value={woDayContext.woday.goals}
                        onChange={handleTextChange}
                        styles={{ width: '100%' }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                      <TextInput
                        label={'Weight'}
                        name={'weight'}
                        id={'weight'}
                        value={woDayContext.woday.weight}
                        placeholder={'enter weight'}
                        onChange={handleTextChange}
                        styles={{ width: '100%' }}
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
                        theme={woDayContext.theme}
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
              </div>
              {/* --- section 2: Cardio --------------------------------------- */}
              <div css={[row, section]}>
                <div css={sectionHeader}>Cardio</div>
                <CardioTable
                  jssClass={[woTable]}
                  id={0}
                  data={convertCardioForTable()}
                  deleteRow={event => console.log(event)}
                  addCardioExercise={addCardioExercise}
                  onChange={handleExerciseChange}
                />
              </div>
              {/* --- section -: stop watch ------------------------------------ */}
              {showStopWatch === true ? 
              null
              :
              <div css={[row, section]}>
                {/* <StopWatch onClick={startTimer} /> */}
                <div
                  className='Stopwatch-display'
                  style={{ fontSize: '3.5em' }}
                >
                  {'00:00:00'}<span style={{ fontSize: '0.5em' }}>:00</span>
                </div>
                <Button
                  size='small'
                  onClick={startTimer}
                  variant='contained'
                >
                  {'Start'}
                </Button>
              </div>
            }
              {/* --- section 3: Weights --------------------------------------- */}
              <div css={[row, section]}>
                <div css={sectionHeader}>Weights</div>
                <Workout
                  wo={woDayContext.woday.wo}
                  addExercise={addExercise}
                  addSet={addSet}
                  showWorkoutChooser={showWorkoutChooser}
                  onChange={handleSetChange}
                  onLeadCellChange={handleLeadCellChange}
                />
              </div>
            </div>
          </div>
        ) : (
          <BasicSpinner show={true} />
        )}
      </div>
    </React.Fragment>
  )
}

export default WoDay
