/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import TextInput from '../inputs/TextInput'
import BasicTable from '../tables/BasicTable'
import RangeSlider from '../inputs/RangeSlider'
import DateInput from '../inputs/DateInput'

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
  gridWeight
} from '../../styles/WoDayStyles'

const Test = props => {
  let [startDate, setStartDate] = useState(new Date())
  let [energyRange, setEnergyRange] = useState(50)
  let [sleepRange, setSleepRange] = useState(50)
  let [weight, setWeight] = useState('')
  const handleTextChange = event => {
    console.log(event.target.id)
    console.log(event.target.value)
  }
  // TODO: These should call up (props.handleTextChange) and state should be maintained by parent
  const handleSliderChange = event => {
    let id = event.target.id
    let value = event.target.value
    switch (id) {
      case 'energyRange':
        console.log('energyRange update.')
        setEnergyRange(value)
        break
      case 'sleepRange':
        setSleepRange(value)
        break
      case 'moodRange':
        break
      default:
        console.log('Sorry, no match for ' + id)
    }
  }

  return (
    <div css={formContainer}>
      <div css={row} style={{ marginBottom: '20px' }}>
        WoDay Test Page
      </div>
      <div css={detailCard}>
        <div css={cardNoHover}>
          {/* --- row 1: Details --------------------------------------- */}
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
                  id={'woday-goals'}
                  placeholder={'enter goals here'}
                  onChange={handleTextChange}
                />
              </div>
              {/* --- row 1b: MeStats --------------------------------------- */}
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
          {/* --- row 2: Cardio --------------------------------------- */}
          <div
            css={row}
            style={{
              height: '150px',
              marginTop: '10px',
              width: '100%',
              border: '1px solid #eee'
            }}
          >
            <h3>Cardio</h3>
            <BasicTable jssClass={table} />
          </div>
          {/* --- row 3: Weights --------------------------------------- */}
          <div
            css={row}
            style={{
              height: '300px',
              marginTop: '10px',
              width: '100%',
              border: '1px solid #eee'
            }}
          >
            <h3>Weights</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Test
