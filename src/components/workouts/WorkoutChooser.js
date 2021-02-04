/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext, useEffect, useState } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { retrieve as retrieveWorkouts } from '../../api/workoutsApi'
import { styles } from '../../styles/MainStyles'
import BasicSpinner from '../spinners/BasicSpinner'
import Tracker from '../tracker/Tracker'
import WorkoutCard from './WorkoutCard'
import { makeStyles } from '@material-ui/core/styles'
import { basicButton } from '../../styles/Styles'
import { Container, Grid, Paper } from '@material-ui/core'
import ArrayUtils from '../modules/common/utilties/ArrayUtils'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.color2_text.hex,
    backgroundColor: theme.color2.hex,
    margin: '3px'
  },
  basicButton: basicButton(theme)
}))

const WorkoutChooser = props => {
  let [workoutTemplates, setWorkoutTemplates] = useState([])
  let [showFromWorkouts, setShowFromWorkouts] = useState(false)
  let [showFromPrograms, setShowFromPrograms] = useState(false)
  let themeContext = useContext(ThemeContext)
  let { cardNoHover, detailCard, row, basicButton } = styles(themeContext.theme)
  const classes = useStyles(themeContext)

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

  const renderWorkouts = workouts => {
    return sortWorkouts(workouts).map(wo => {
      return (
        <Grid item xs={12} sm={4} key={wo.id}>
          <WorkoutCard
            id={wo.id}
            onClick={chooseWorkout}
            item={wo}
            selectItem={props.selectWorkout}
          />
        </Grid>
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
      <Container style={{padding:'25px'}}>
      {showFromPrograms === false && showFromWorkouts === false ? (
        <div css={detailCard}>
          <div css={cardNoHover}>
            <div css={row} style={{ border: '1px solid #eee' }}>
              <Grid container spacing={1} justify='flex-start'>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>
                    <input
                      style={{ margin: '5px' }}
                      type='button'
                      value='From Programs'
                      css={[basicButton]}
                      onClick={showWorkoutsFromPrograms}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>
                    <input
                      style={{ margin: '5px' }}
                      type='button'
                      value='From Workouts'
                      css={[basicButton]}
                      onClick={showWorkoutsFromWorkouts}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      ) : showFromWorkouts === true ? (
        workoutTemplates.length > 0 ? (
          <Grid container spacing={1} >
            {/* TODO: CAN WORKOUT LIST BE USED HERE INSTEAD? */}
            {renderWorkouts(workoutTemplates)}
          </Grid>
        ) : (
          <BasicSpinner show={true} />
        )
      ) : showFromPrograms === true ? (
        <Tracker handleWorkoutSelect={chooseWorkout} />
      ) : null}
      </Container>
  )
}

export default WorkoutChooser
