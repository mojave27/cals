/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import TextInput from '../inputs/TextInput'
import MeStats from './MeStats'
import DatePicker from 'react-datepicker'
import BasicTable from '../tables/BasicTable'
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
  gridGoals,
  gridMeStats
} from '../../styles/WoDayStyles'

const Test = props => {
  let [startDate, setStartDate] = useState(new Date())
  const handleTextChange = event => {
    console.log(event.target.id)
    console.log(event.target.value)
  }

  return (
    <div css={formContainer}>
      <div css={row} style={{ marginBottom: '20px' }}>
        WoDay Test Page
      </div>
      <div css={detailCard}>
        <div css={cardNoHover}>
          {/* --- row 1: Details --------------------------------------- */}
          {/* <div css={row} style={{ border: '1px solid cyan' }}> */}
          <div css={row} style={{border:'1px solid #eee'}}>
            <div css={gridContainer}>
              <div css={gridGoals}>
                <TextInput
                  label={'Goals'}
                  name={'goals'}
                  id={'woday-goals'}
                  placeholder={'enter goals here'}
                  onChange={handleTextChange}
                />
              </div>
              <div css={gridDate} style={{ lineHeight: '28px' }}>
                <label
                  style={{
                    display: 'inline-block',
                    fontWeight: '700'
                  }}
                >
                  Date
                </label>
                <div
                  style={{
                    textAlign: 'left',
                    marginBottom: '15px',
                    float: 'right'
                  }}
                >
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                  />
                </div>
              </div>
              <div
                css={gridMeStats}
                style={{
                  padding: '5px',
                  marginBottom: '10px'
                }}
              >
                <MeStats />
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
