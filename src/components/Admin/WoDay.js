/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import TextInput from '../inputs/TextInput'
import BasicTable from '../tables/BasicTable'
import RangeSlider from '../inputs/RangeSlider'
import DateInput from '../inputs/DateInput'

import Workout from '../workouts/Workout'

import { table } from '../../styles/table'
import {
  cardNoHover,
  detailCard,
  formContainer,
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
  sectionHeader
} from '../../styles/WoDayStyles'

const sampleCardioData = {
  headers: ['type', 'duration', 'distance', 'heart rate'],
  rows: [
    {
      id: 0,
      type: 'steady state jog',
      duration: '30 min',
      distance: '',
      heartRate: '120 bpm'
    },
    {
      id: 1,
      type: 'HIIT',
      duration: '20 min',
      distance: '',
      heartRate: '150 bpm'
    }
  ]
}

const sampleWoData = {
  exercises: [
    { id: 0, name: 'dips', targets: '3x8' },
    { id: 1, name: 'chins', targets: '3x8' },
    { id: 2, name: 'squats', targets: '1x20' }
  ],
  sets: [
    {
      id: 0,
      exercises: [
        { id: 0, weight: '45', reps: '8' },
        { id: 1, weight: '15', reps: '7' },
        { id: 2, weight: '105', reps: '20' }
      ]
    },
    {
      id: 1,
      exercises: [
        { id: 0, weight: '45', reps: '8' },
        { id: 1, weight: '15', reps: '6' },
        { id: 2, weight: '0', reps: '0' }
      ]
    }
  ]
}

const WoDay = props => {
  let [startDate, setStartDate] = useState(new Date())
  let [energyRange, setEnergyRange] = useState(50)
  let [sleepRange, setSleepRange] = useState(50)
  let [weight, setWeight] = useState('')
  let [goals, setGoals] = useState('')
  let [cardioData, setCardioData] = useState(sampleCardioData)
  let [woData, setWoData] = useState(sampleWoData)

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

  // TODO: These should call up (props.handleTextChange) and state should be maintained by parent
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

  const handleCellChange = event => {
    console.log('handleCellChange')
  }

  return (
    <div css={formContainer}>
      <div css={row} style={{ marginBottom: '20px' }}>
        WoDay Test Page
      </div>
      <div css={detailCard}>
        <div css={cardNoHover}>
          {/* --- section 1: Details --------------------------------------- */}
          <div css={row} style={{ border: '1px solid #eee' }}>
            <div css={gridContainer} style={{ margin: '5px', padding: '10px' }}>
              <div css={gridDate}>
                <DateInput
                  startDate={startDate}
                  setStartDate={setStartDate}
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
                  value={goals}
                  onChange={handleTextChange}
                />
              </div>
              {/* --- MyStats --------------------------------------- */}
              <div css={gridWeight}>
                <TextInput
                  label={'Weight'}
                  name={'weight'}
                  id={'weight'}
                  value={weight}
                  placeholder={'enter weight'}
                  onChange={handleTextChange}
                />
              </div>
              <div css={gridEnergy}>
                <RangeSlider
                  label={'Energy'}
                  jssClass={{ float: 'left' }}
                  id='energyRange'
                  value={energyRange}
                  onChange={handleSliderChange}
                />
              </div>
              <div css={gridSleep}>
                <RangeSlider
                  label={'Sleep'}
                  jssClass={{ float: 'left' }}
                  id='sleepRange'
                  value={sleepRange}
                  onChange={handleSliderChange}
                />
              </div>
            </div>
          </div>
          {/* --- section 2: Cardio --------------------------------------- */}
          <div css={[row, section]}>
            <div css={sectionHeader}>Cardio</div>
            <BasicTable
              jssClass={table}
              id={0}
              deleteRow={event => console.log(event)}
              data={cardioData}
            />
          </div>
          {/* --- section 3: Weights --------------------------------------- */}
          <div css={[row, section]}>
            <div css={sectionHeader}>Weights</div>
            <Workout wo={woData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WoDay
