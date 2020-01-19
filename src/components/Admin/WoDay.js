/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext, useEffect, useState } from 'react'
import { retrieveWoDayById } from '../../api/wodaysApi'
import WoDayContext from '../../context/WoDayContext'
import TextInput from '../inputs/TextInput'
import BasicTable from '../tables/BasicTable'
import RangeSlider from '../inputs/RangeSlider'
import DateInput from '../inputs/DateInput'
import Workout from '../workouts/Workout'

import { generateNewId } from '../ArrayUtils'
import { cloneDeep } from 'lodash'

// import { table } from '../../styles/table'
import {
  cardNoHover,
  detailCard,
  row
} from '../../styles/main-styles'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/datePicker.css'
import {
  gridContainer,
  gridDate,
  gridEnergy,
  gridGoals,
  gridSleep,
  gridWeight,
  section,
  sectionHeader,
  woTable
} from '../../styles/WoDayStyles'


const WoDay = props => {
  let context = useContext(WoDayContext)

  useEffect(() => {
    let didCancel = false
    async function fetchWoDay() {
      // change this to retrieveWoDays.  for now we just get the one woday by id.
      const response = await retrieveWoDayById(0)
      if (!didCancel) {
        console.log({response})
        context.updateWoDay(response)
        // setExercises(response)
      }
    }

    fetchWoDay()
    return () => {
      didCancel = true
    }
  }, [])

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
    <div>
      {/* <div css={row} style={{ marginBottom: '20px' }}>
        WoDay Test Page
      </div> */}
      <div css={detailCard}>
        <div css={cardNoHover}>
          {/* --- section 1: Details --------------------------------------- */}
          <div css={row} style={{ border: '1px solid #eee' }}>
            <div css={gridContainer} style={{ margin: '5px', padding: '10px' }}>
              <div css={gridDate}>
                <DateInput
                  // startDate={startDate}
                  // startDate={new Date(context.woday.date)}
                  startDate={getStartDate()}
                  setStartDate={setDate}
                  label={'Date'}
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
                />
              </div>
              <div css={gridEnergy}>
                <RangeSlider
                  label={'Energy'}
                  jssClass={{ float: 'left' }}
                  id='energyRange'
                  value={context.woday.energy}
                  onChange={handleSliderChange}
                />
              </div>
              <div css={gridSleep}>
                <RangeSlider
                  label={'Sleep'}
                  jssClass={{ float: 'left' }}
                  id='sleepRange'
                  value={context.woday.sleep}
                  onChange={handleSliderChange}
                />
              </div>
            </div>
          </div>
          {/* --- section 2: Cardio --------------------------------------- */}
          <div css={[row, section]}>
            <div css={sectionHeader}>Cardio</div>
            <BasicTable
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
            <Workout wo={context.woday.wo} addSet={addSet} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WoDay
