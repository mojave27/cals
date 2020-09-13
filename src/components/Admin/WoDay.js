import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext, useEffect, useState } from 'react'
import { retrieveWoDayById } from '../../api/wodaysApi'
import { retrieveWorkoutById } from '../../api/workoutsApi'
import Modal from '../Modal'
import WoDayContext from '../../context/WoDayContext'
import TextInput from '../inputs/TextInput'
import CardioTable from '../tables/CardioTable'
import RangeSlider from '../inputs/RangeSlider'
import DateInput from '../inputs/DateInput'
import Workout from '../workouts/Workout'
import ThemeContext from '../../context/ThemeContext'
import { cloneDeep } from 'lodash'

import WorkoutChooser from '../workouts/WorkoutChooser'

import { findIndexOfId, generateNewId } from '../ArrayUtils'

import { styles } from '../../styles/MainStyles'
import { woDayStyles } from '../../styles/WoDayStyles'

import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/datePicker.css'

const WoDay = props => {
  let [showModal, setShowModal] = useState(false)
  let woDayContext = useContext(WoDayContext)
  let themeContext = useContext(ThemeContext)

  useEffect(() => {
    console.log(`is new?: ${props.location.state.new}`)
    if (props.location.state.new) {
      woDayContext.setEmptyWoDay()
    } else {
      let didCancel = false
      async function fetchWoDay() {
        const response = await retrieveWoDayById(0)
        if (!didCancel) {
          woDayContext.updateWoDay(response)
        }
      }

      fetchWoDay()
      return () => {
        didCancel = true
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let { cardNoHover, detailCard, row, basicButton } = styles(themeContext.theme)

  let {
    gridContainer,
    gridDate,
    gridEnergy,
    gridGoals,
    gridSleep,
    gridWeight,
    section,
    sectionHeader,
    woTable
  } = woDayStyles(themeContext.theme)

  const retrieveWorkout = async workoutId => {
    let workout = await retrieveWorkoutById(workoutId)
    return workout
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const done = () => {
    setShowModal(false)
  }

  const saveWoDay = async () => {
    // saves the woday which is held by woDayContext - which should be this one :)
    await woDayContext.saveWoDay()
  }

  const handleTextChange = event => {
    let id = event.target.id
    let value = event.target.value
    switch (id) {
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
    let woday = woDayContext.copyWoDay()
    let idParts = update.id.split('-')
    let rowId = idParts[0]
    let index = findIndexOfId(rowId, woday.cardio.exercises)
    let exercise = { ...woday.cardio.exercises[index] }
    console.log({ exercise })
    console.log({ update })

    // use update object to update exercise
  }

  const handleLeadCellChange = event => {
    let value = event.target.value
    let name = event.target.name
    let exerciseId = event.target.parentNode.parentNode.id
    let exGroupId = event.target.dataset.exgroupid

    console.log(
      `value: ${value}, name: ${name}, exGroupId: ${exGroupId}, exerciseId: ${exerciseId}`
    )

    let woday = woDayContext.copyWoDay()
    console.log({ woday })
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
    let exerciseId = event.target.parentNode.parentNode.id
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

    // console.log(woday)
    // console.log(context.woday)

    woDayContext.updateWoDay(woday)
  }

  const setWeight = weight => {
    let woday = woDayContext.copyWoDay()
    woday.weight = weight
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
      id: 0,
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
        newExercise.weight = 0
        newExercise.reps = 0
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

    console.log('woday before')
    console.log({ woday })

    // create new set and exercise groups, add each exercise id, and set weights reps to empty
    // TODO: set the weights to same as previous set, if there was a previous set

    // let newSetId = generateNewId(wo.sets)
    // if (newSetId > 0) {
    //   let newSet = copyFromPreviousSet(wo.sets)
    //   newSet.id = newSetId
    // } else {

      let newSet = {
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
    // }
    wo.sets.push(newSet)

    woDayContext.updateWoDay(woday)
    // save to DB (we want auto-save on everything... maybe)
  }

  const copyFromPreviousSet = (allSets) => {
      // get previous set
      let previousSet = allSets[allSets.length - 1]
      let newSet = cloneDeep(previousSet)
      // clear the reps from newSet
      let newExGroups = newSet.exerciseGroups.map(exGroup => {
      let newExGroup = {
        exercises: exGroup.exercises.map(ex => {
        return {
          id: ex.id,
          weight: '',
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

  return (
    // <div css={formContainer}>
    <React.Fragment>
      <Modal showModal={showModal} handleClose={toggleModal}>
        <WorkoutChooser done={done} chooseWorkout={chooseWorkout} />
      </Modal>
      <div>
        {/* <div css={row} style={{ marginBottom: '20px' }}>
        WoDay Test Page
      </div> */}
        <div css={detailCard}>
          <div css={cardNoHover}>
            {/* --- section 1: Details --------------------------------------- */}
            <div css={row} style={{ border: '1px solid #eee' }}>
              <div
                css={gridContainer}
                style={{ margin: '5px', padding: '10px' }}
              >
                <div css={gridDate}>
                  <DateInput
                    // startDate={startDate}
                    // startDate={new Date(context.woday.date)}
                    startDate={getStartDate()}
                    setStartDate={setDate}
                    label={'Date'}
                  />
                  <input
                    style={{ margin: '5px', float: 'right' }}
                    type='button'
                    value='Save'
                    // css={[basicButton, { float: 'right' }]}
                    css={[basicButton, { float: 'right' }]}
                    onClick={saveWoDay}
                  />
                </div>
                <div
                  css={gridGoals}
                  style={{ borderRadius: '3px', width: '50%' }}
                >
                  <TextInput
                    label={'Goals'}
                    name={'goals'}
                    id={'goals'}
                    placeholder={'enter goals here'}
                    value={woDayContext.woday.goals}
                    onChange={handleTextChange}
                    styles={{ width: '300px' }}
                  />
                </div>
                {/* --- MyStats --------------------------------------- */}
                <div css={gridWeight}>
                  <TextInput
                    label={'Weight'}
                    name={'weight'}
                    id={'weight'}
                    value={woDayContext.woday.weight}
                    placeholder={'enter weight'}
                    onChange={handleTextChange}
                    styles={{ width: '100px' }}
                  />
                </div>
                <div css={gridEnergy}>
                  <RangeSlider
                    label={'Energy'}
                    min={0}
                    max={10}
                    jssClass={{ float: 'left' }}
                    id='energyRange'
                    value={woDayContext.woday.energy}
                    onChange={handleSliderChange}
                    theme={woDayContext.theme}
                  />
                </div>
                <div css={gridSleep}>
                  <RangeSlider
                    label={'Sleep'}
                    min={0}
                    max={10}
                    jssClass={{ float: 'left' }}
                    id='sleepRange'
                    value={woDayContext.woday.sleep}
                    onChange={handleSliderChange}
                    theme={woDayContext.theme}
                  />
                </div>
              </div>
            </div>
            {/* --- section 2: Cardio --------------------------------------- */}
            <div css={[row, section]}>
              <div css={sectionHeader}>Cardio</div>
              <CardioTable
                jssClass={[woTable]}
                id={0}
                // data={context.woday.cardio}
                data={convertCardioForTable()}
                deleteRow={event => console.log(event)}
                addCardioExercise={addCardioExercise}
                onChange={handleExerciseChange}
              />
            </div>
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
      </div>
    </React.Fragment>
  )
}

export default WoDay
