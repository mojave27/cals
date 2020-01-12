/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import TextInput from '../inputs/TextInput'
import DatePicker from 'react-datepicker'

import {
  cardNoHover,
  col10,
  col20,
  col70,
  detailCard,
  formContainer,
  row
} from '../../styles/main-styles'
import 'react-datepicker/dist/react-datepicker.css'
import '../../styles/datePicker.css'

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
          <div css={row}>
            <div css={col10} style={{ lineHeight: '28px' }}>
              <label
                style={{
                  display: 'inline-block',
                  float: 'right',
                  paddingRight: '30px',
                  fontWeight: '700'
                }}
              >
                Date
              </label>
            </div>
            <div
              css={col20}
              style={{ textAlign: 'left', marginBottom: '15px' }}
            >
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>
            <div css={col70}>
              <TextInput
                label={'Goals'}
                name={'goals'}
                id={'woday-goals'}
                placeholder={'enter goals here'}
                onChange={handleTextChange}
              />
            </div>
            <div
              css={col70}
              style={{
                padding: '5px',
                height: '100px',
                textAlign: 'left',
                marginBottom: '15px',
                border: '1px solid #eee'
              }}
            >
              weight,
              <br />
              energy,
              <br />
              sleep,
              <br />
              mood
            </div>
          </div>
          <div
            css={row}
            style={{
              height: '150px',
              marginTop: '10px',
              width: '100%',
              border: '1px solid #eee'
            }}
          >
            cardio section
          </div>
          <div
            css={row}
            style={{
              height: '300px',
              marginTop: '10px',
              width: '100%',
              border: '1px solid #eee'
            }}
          >
            weights section
          </div>
        </div>
      </div>
    </div>
  )
}

export default Test
