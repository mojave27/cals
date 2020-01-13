/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import Select from '../inputs/Select'
import RangeSlider from '../inputs/RangeSlider'
import { } from '../../styles/WoDayStyles'

const MeStats = props => {
  let [energyRange, setEnergyRange] = useState(50)
  let [sleepRange, setSleepRange] = useState(50)

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
    // console.log(`id: ${event.target.id}`)
    // console.log(`id: ${event.target.value}`)
  }

  return (
    <div>
      <div >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <label style={{ fontWeight: '700', float:'left',width: '12%' }}>Weight</label>
          <Select jssClass={{ float: 'left' }} options={[...Array(350).keys()]} />
          <div  style={{ width: '30%' }}>
            <label
              style={{
                float: 'left',
                display: 'inline-block',
                fontWeight: '700',
                width: '20%'
              }}
            >
              Energy
            </label>
            <RangeSlider
              jssClass={{float: 'left'}}
              id='energyRange'
              value={energyRange}
              onChange={handleSliderChange}
            />
          </div>
          <div style={{ width: '30%' }}>
            <label
              style={{
                float: 'left',
                display: 'inline-block',
                fontWeight: '700',
                width: '20%'
              }}
            >
              Sleep
            </label>
            <RangeSlider
              jssClass={{float: 'left'}}
              id='sleepRange'
              value={sleepRange}
              onChange={handleSliderChange}
            />
          </div>
        </div>
      </div>
      {/* <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          border: '1px solid green',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div css={meSleep} style={{ width: '50%' }}>
          sleep
        </div>
        <div css={meMood} style={{ width: '50%' }}>
          mood
        </div>
      </div> */}
    </div>
  )
}

export default MeStats
