/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { retrieve as retrieveWorkouts } from '../../api/workoutsApi'
import { styles as gridStyles } from '../../styles/GridStyles2'
import { styles } from '../../styles/MainStyles'
import BasicSpinner from '../spinners/BasicSpinner'
import Tracker from '../tracker/Tracker'
import WorkoutCard from './WorkoutCard'

const WorkoutChooser = props => {
  let [workoutTemplates, setWorkoutTemplates] = useState([])
  let [showFromWorkouts, setShowFromWorkouts] = useState(false)
  let [showFromPrograms, setShowFromPrograms] = useState(false)
  let themeContext = useContext(ThemeContext)
  let { gridContainer } = gridStyles(themeContext.theme)
  let { cardNoHover, detailCard, row, basicButton } = styles(themeContext.theme)

  useEffect(() => {
    fetchMyAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMyAPI = async () => {
    const response = await retrieveWorkouts()
    setWorkoutTemplates([...response])
  }

  const chooseWorkout = workoutId => {
    console.log(workoutId)
    props.chooseWorkout(workoutId)
  }

  const renderWorkouts = workouts => {
    return workouts.map(wo => {
      return (
        <WorkoutCard
          key={wo.id}
          id={wo.id}
          onClick={chooseWorkout}
          item={wo}
          selectItem={props.selectWorkout}
        />
      )
    })
  }

  const showWorkoutsFromPrograms = () => {
    setShowFromPrograms(true)
  }

  const showWorkoutsFromWorkouts = () => {
    setShowFromWorkouts(true)
  }

  return (
    <React.Fragment>
      {showFromPrograms === false && showFromWorkouts === false ? (
        <div css={detailCard}>
          <div css={cardNoHover}>
            <div css={row} style={{ border: '1px solid #eee' }}>
              <input
                style={{ margin: '5px' }}
                type='button'
                value='From Programs'
                css={[basicButton]}
                onClick={showWorkoutsFromPrograms}
              />
              <input
                style={{ margin: '5px' }}
                type='button'
                value='From Workouts'
                css={[basicButton]}
                onClick={showWorkoutsFromWorkouts}
              />
            </div>
          </div>
        </div>
      ) : showFromWorkouts === true ? (
        workoutTemplates.length > 0 ? (
          <div css={gridContainer}>{renderWorkouts(workoutTemplates)}</div>
        ) : (
          <BasicSpinner show={true} />
        )
      ) : showFromPrograms === true ? (
        <Tracker handleWorkoutSelect={chooseWorkout} />
      ) : null}
    </React.Fragment>
  )
}

export default WorkoutChooser
