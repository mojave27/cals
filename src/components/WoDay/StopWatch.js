/** @jsx jsx */
import { jsx } from '@emotion/core'
// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { styles } from '../../styles/MainStyles'

const StopWatch = props => {
  // let context = useContext(ThemeContext)
  // let { basicButtonSmall } = styles(context.theme)

  let timerRef = null
  let seconds  = '00'
  let minutes  = '00'
  let hours    = '00'

  const startTimer = () => {
    timer()
  }

  const stopTimer = () => {
    clearInterval(timerRef)
  }

  const clearTimer = () => {
    stopTimer()
    seconds  = '00'
    minutes  = '00'
    hours    = '00'
    document.getElementById('timer').innerHTML = `${hours}:${minutes}:${seconds}`
  }

  const updateTime = current => {
    let updated = (Number(current) + 1).toString()
    if (updated < 10) updated = `0${updated}`
    if (updated === '60') updated = '00'
    return updated
  }

  const updateHours = (hours, minutes, seconds) => {
    let updatedHours = hours
    if (minutes === '59' && seconds === '59') {
      updatedHours = (Number(hours) + 1).toString()
    }
    if (updatedHours < 10 && updatedHours.substring(0, 1) !== '0') {
      updatedHours = `0${updatedHours}`
    }
    return updatedHours
  }

  const timer = () => {
    timerRef = setInterval(function() {
      hours = updateHours(hours, minutes, seconds)
      seconds = updateTime(seconds)
      minutes = seconds === '00' ? updateTime(minutes) : minutes
      document.getElementById(
        'timer'
      ).innerHTML = `${hours}:${minutes}:${seconds}`
    }, 1000)
  }

  return (
    <div>
      <h3 id='timer'>{'00:00:00'}</h3>
      <Button
        onClick={startTimer}
        text={'start'}
      />
      <Button
        onClick={stopTimer}
        text={'stop'}
      />
      <Button
        onClick={clearTimer}
        text={'reset'}
      />
    </div>
  )
}

export default StopWatch


const Button = props => {
  let context = useContext(ThemeContext)
  let { basicButtonSmall } = styles(context.theme)
  return (
    <input
      style={{ margin: '5px' }}
      type='button'
      value={props.text}
      css={basicButtonSmall}
      onClick={props.onClick}
    />
  )
}
