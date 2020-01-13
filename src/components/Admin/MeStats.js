/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useState } from 'react'
import TextInput from '../inputs/TextInput'
import RangeSlider from '../inputs/RangeSlider'
import { meStatsContainer, sliderContainer } from '../../styles/WoDayStyles'

const MeStats = props => {
  // TODO: These should maintained by parent
  let [energyRange, setEnergyRange] = useState(50)
  let [sleepRange, setSleepRange] = useState(50)
  let [weight, setWeight] = useState('')

  // TODO: These should call up (props.handleTextChange) and state should be maintained by parent
  const handleTextChange = event => {
    let id = event.target.id
    let value = event.target.value
    switch (id) {
      case 'weight':
        setWeight(value)
        break
      default:
        console.log('Sorry, no match for ' + id)
    }
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
        <div css={meStatsContainer}>
          <div style={{ borderRadius:'3px',width:'30%', backgroundColor:'#eee' }}>
            <TextInput
              label={'Weight'}
              name={'weight'}
              id={'weight'}
              value={weight}
              placeholder={'enter weight'}
              onChange={handleTextChange}
            />
          </div>
          <div css={sliderContainer}>
            <RangeSlider
              label={'Energy'}
              jssClass={{ float: 'left' }}
              id='energyRange'
              value={energyRange}
              onChange={handleSliderChange}
            />
          </div>
          <div css={sliderContainer}>
            <RangeSlider
              label={'Sleep'}
              jssClass={{ float: 'left' }}
              id='sleepRange'
              value={sleepRange}
              onChange={handleSliderChange}
            />
          </div>
        </div>
  )
}

export default MeStats
