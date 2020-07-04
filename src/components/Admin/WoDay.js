import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext, useEffect, useState } from 'react'
import { retrieveWoDayById, updateWoDay } from '../../api/wodaysApi'
import Modal from '../Modal'
import WoDayContext from '../../context/WoDayContext'
import TextInput from '../inputs/TextInput'
import CardioTable from '../tables/CardioTable'
import RangeSlider from '../inputs/RangeSlider'
import DateInput from '../inputs/DateInput'
import Workout from '../workouts/Workout'
import ThemeContext from '../../context/ThemeContext'

import WorkoutChooser from '../workouts/WorkoutChooser'

import { findIndexOfId, generateNewId } from '../ArrayUtils'

import { styles } from '../../styles/MainStyles'
import { woDayStyles } from '../../styles/WoDayStyles'

import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/datePicker.css'

const WoDay = props => {
  let [showModal, setShowModal] = useState(false)
  let context = useContext(WoDayContext)
  let themeContext = useContext(ThemeContext)

  useEffect(() => {
    let didCancel = false
    async function fetchWoDay() {
      // change this to retrieveWoDays.  for now we just get the one woday by id.
      const response = await retrieveWoDayById(0)
      if (!didCancel) {
        // console.log({ response })
        context.updateWoDay(response)
      }
    }

    fetchWoDay()
    return () => {
      didCancel = true
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

  const toggleModal = () => {
    setShowModal(!showModal)
  }
  
  const done = () => {
    setShowModal(false)
  }

  const saveWoDay = async () => {
    await updateWoDay(context.woday)
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

  const handleLeadCellChange = event => {
    let value = event.target.value
    let name = event.target.name
    let exerciseId = event.target.parentNode.parentNode.id

    let woday = context.copyWoDay()
    let exIndex = findIndexOfId(exerciseId, woday.wo.exercises)
    let ex = woday.wo.exercises[exIndex]

    ex[name] = value
    context.updateWoDay(woday)
  }

  const handleSetChange = event => {
    let exerciseId = event.target.parentNode.parentNode.id
    let setId = event.target.dataset.setid
    let name = event.target.name
    let value = event.target.value

    console.log(
      `exId: ${exerciseId}, setId: ${setId}, name: ${name}, value: ${value}`
    )

    let woday = context.copyWoDay()
    let wo = woday.wo

    // find set
    let setIndex = findIndexOfId(setId, wo.sets)
    let set = wo.sets[setIndex]
    console.log(set)

    // find exercise
    let exIndex = findIndexOfId(exerciseId, set.exercises)
    console.log(`exIndex: ${exIndex}`)
    let ex = set.exercises[exIndex]
    console.log(ex)

    // update weight or reps
    ex[name] = value

    // console.log(woday)
    // console.log(context.woday)

    context.updateWoDay(woday)
  }

  const setWeight = weight => {
    let woday = context.copyWoDay()
    woday.weight = weight
    context.updateWoDay(woday)
  }

  const setGoals = goals => {
    let woday = context.copyWoDay()
    woday.goals = goals
    context.updateWoDay(woday)
  }

  const setEnergyRange = value => {
    let woday = context.copyWoDay()
    woday.energy = value
    context.updateWoDay(woday)
  }

  const setSleepRange = value => {
    let woday = context.copyWoDay()
    woday.sleep = value
    context.updateWoDay(woday)
  }

  const setDate = async jsDate => {
    let woday = context.copyWoDay()
    woday.date = {
      day: jsDate.getDate(),
      month: jsDate.getMonth(),
      year: jsDate.getFullYear()
    }
    await context.updateWoDay(woday)
  }

  const getStartDate = () => {
    let date = context.woday.date
    let startDate = new Date(date.year, date.month, date.day)
    console.log(startDate)
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

  const addExercise = () => {
    let woday = context.copyWoDay()

    let newExercise = generateNewExercise(woday.wo.exercises)
    woday.wo.exercises.push(newExercise)

    let updatedSets = addExerciseToSets(woday.wo.sets, newExercise.id)
    woday.wo.sets = updatedSets

    context.updateWoDay(woday)
  }

  const addExerciseToSets = (sets, exId) => {
    return sets.map(set => {
      let ex = { id: exId, weight: '', reps: '' }
      set.exercises.push(ex)
      return set
    })
  }

  const generateNewExercise = exercises => {
    return {
      id: generateNewId(exercises),
      name: '',
      targets: ''
    }
  }

  const chooseWorkout = () => {
    // user chooses workout - place new workout into context.woday.wo
    // alert('choose a workout')
    toggleModal()
  }

  const addSet = () => {
    let woday = context.copyWoDay()
    let wo = woday.wo

    // create new set, add each exercise id, and set weights reps to empty
    let newSet = {
      id: generateNewId(wo.sets),
      exercises: wo.exercises.map(ex => {
        return {
          id: ex.id,
          weight: '',
          reps: ''
        }
      })
    }
    wo.sets.push(newSet)

    context.updateWoDay(woday)
    // save to DB (we want auto-save on everything... maybe)
  }

  const convertCardioForTable = () => {
    let data = {
      headers: context.woday.cardio.headers,
      rows: context.woday.cardio.exercises
    }
    return data
  }

  return (
    // <div css={formContainer}>
    <React.Fragment>
      <Modal showModal={showModal} handleClose={toggleModal}>
        <WorkoutChooser done={done} />
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
                    value={context.woday.goals}
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
                    value={context.woday.weight}
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
                    value={context.woday.energy}
                    onChange={handleSliderChange}
                    theme={context.theme}
                  />
                </div>
                <div css={gridSleep}>
                  <RangeSlider
                    label={'Sleep'}
                    min={0}
                    max={10}
                    jssClass={{ float: 'left' }}
                    id='sleepRange'
                    value={context.woday.sleep}
                    onChange={handleSliderChange}
                    theme={context.theme}
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
                deleteRow={event => console.log(event)}
                // data={context.woday.cardio}
                data={convertCardioForTable()}
              />
            </div>
            {/* --- section 3: Weights --------------------------------------- */}
            <div css={[row, section]}>
              <div css={sectionHeader}>Weights</div>
              <Workout
                wo={context.woday.wo}
                addExercise={addExercise}
                addSet={addSet}
                chooseWorkout={chooseWorkout}
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
