import React, { useContext } from 'react'
import WorkoutDesktop from './WorkoutDesktop'
import WorkoutMobile from './WorkoutMobile'
import ThemeContext from '../../context/ThemeContext'

const Workout = props => {
  let context = useContext(ThemeContext)

  return (
    context.mobile === true ? <WorkoutMobile {...props} /> : <WorkoutDesktop {...props} />
  )
}

export default Workout
