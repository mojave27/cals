import React, { useEffect, useState } from 'react'
import { retrieve as retrieveWorkouts } from 'api/workoutsApi'
// import Tracker from 'components/tracker/Tracker'
import BasicSpinner from 'components/spinners/BasicSpinner'
import WoList from 'components/workouts/WoList'
// import ContainedButton from 'components/modules/common/inputs/ContainedButton'
import { Container, Grid } from '@material-ui/core'
import ArrayUtils from 'components/modules/common/utilties/ArrayUtils'

const WorkoutChooser = props => {
  let [workoutTemplates, setWorkoutTemplates] = useState([])
  // let [showFromWorkouts, setShowFromWorkouts] = useState(false)
  // let [showFromPrograms, setShowFromPrograms] = useState(false)
  let [selected, setSelected] = useState([])
  let [showSpinner, setShowSpinner] = useState(false)

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

  const sortWorkouts = workouts => {
    return ArrayUtils.sortByStringProperty(workouts, 'name', true)
  }

  const selectWorkout = workoutId => {
    setShowSpinner(true)
    setSelected(prevState => {
      return [...prevState, workoutId]
    })
    chooseWorkout(workoutId)
  }

  // const showWorkoutsFromPrograms = () => {
  //   setShowFromPrograms(true)
  // }

  // const showWorkoutsFromWorkouts = () => {
  //   setShowFromWorkouts(true)
  // }

  return (
    <Container style={{ padding: '25px' }}>
      {/* {showFromPrograms === false && showFromWorkouts === false ? (
        <div
          style={{
            textAlign: 'center',
            border: '1px solid #eee',
            padding: '10px 0px',
            margin: 'auto',
            width: '30%'
          }}
        >
          <Grid container spacing={1} justify='flex-start'>
            <Grid item xs={12} sm={12}>
              <ContainedButton
                onClick={showWorkoutsFromPrograms}
                value={'From Programs'}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ContainedButton
                onClick={showWorkoutsFromWorkouts}
                value={'From Workouts'}
              />
            </Grid>
          </Grid>
        </div>
      ) : showFromWorkouts === true ? ( */}
        {workoutTemplates.length > 0 ? (
          <Grid container spacing={1}>
            {showSpinner ? (
              <BasicSpinner show={true} />
            ) : (
              <WoList
                selected={selected}
                items={sortWorkouts(workoutTemplates)}
                onClick={selectWorkout}
              />
            )}
          </Grid>
        ) : (
          <BasicSpinner show={true} />
        )}
       {/* ) : showFromPrograms === true ? (
         <Tracker handleWorkoutSelect={chooseWorkout} />
       ) : null} */}
    </Container>
  )
}

export default WorkoutChooser
