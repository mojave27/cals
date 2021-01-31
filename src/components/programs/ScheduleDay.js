import React, { useContext, useState } from 'react'
import { convertTemplateToActiveWorkout } from '../workouts/workoutTemplateConverter'
import ThemeContext from '../../context/ThemeContext'
import ProgramContext from '../../context/ProgramContext'
import WoDayContext from '../../context/WoDayContext'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Container,
  Grid,
  Typography
} from '@material-ui/core'
import CardioCard from './CardioCard'
import WoListDialog from '../workouts/WoListDialog'
import WorkoutCard from '../workouts/WorkoutCard'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { makeStyles } from '@material-ui/core/styles'
import { retrieveItemById } from '../modules/common/utilties/ArrayUtils'
import { retrieve } from '../../api/workoutsApi'
import FormButton from '../inputs/FormButton'
import { navigate } from '@reach/router';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    margin: 'auto'
  },
  container: {
    marginBottom: '10px'
  },
  th: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    textAlign: 'left'
  },
  thLeft: {
    width: '70%'
  },
  td: {
    textAlign: 'left'
  },
  tdLeft: {
    width: '70%'
  },
  cardHeader: {
    padding: '6px 16px 0px 16px'
  },
  cardContent: {
    padding: '5px',
    margin: '0px'
  }
}))

const ScheduleDay = props => {
  let programContext = useContext(ProgramContext)
  let woDayContext = useContext(WoDayContext)
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)

  const [showWorkoutList, setShowWorkoutList] = useState(false)
  const [showCardioList, setShowCardioList] = useState(false)

  const handleClick = () => {
    if (props.onClick) props.onClick(props.id)
  }

  const editItem = id => {
    if (props.editItem) props.editItem(id)
  }

  const deleteItem = id => {
    if (props.deleteItem) props.deleteItem(id)
  }

  const addWeightsRoutine = () => {
    console.log('add weights workout clicked')
    toggleWorkoutList()
  }

  const addCardio = () => {
    console.log('add weights workout clicked')
    toggleCardioList()
  }

  const toggleWorkoutList = () => {
    setShowWorkoutList(!showWorkoutList)
  }

  const toggleCardioList = () => {
    setShowCardioList(!showCardioList)
  }

  const handleWorkoutListSave = workouts => {
    let dayId = props.item.id
    let workoutIds = workouts.map(wo => wo.id)
    programContext.addWorkoutsToSchedule(dayId, workoutIds)
  }

  const handleCardioListSelect = cardioRoutines => {
    let dayId = props.item.id
    let cardioIds = cardioRoutines.map(cardio => cardio.id)
    programContext.addCardioRoutinesToSchedule(dayId, cardioIds)
  }

  const launchWoDay = async id => {
    let cardio = []
    let workouts = []
    props.item.routine.cardio.forEach(id => {
      let cardioEx = programContext.program.cardio.find(ex => ex.id == id)
      cardioEx.type = cardioEx.name
      cardio.push(cardioEx)
    })
    props.item.routine.workouts.forEach(id => {
      let wo = programContext.program.workouts.find(ex => ex.id == id)
      workouts.push(wo)
    })
    await woDayContext.setEmptyWoDay() 
    let woday = woDayContext.copyWoDay()
    woday.cardio.exercises = cardio
    let newWo = convertTemplateToActiveWorkout(workouts[0])
    woday.wo = newWo
    woDayContext.updateWoDay(woday)
    navigate("/woday")  
  }

  const renderCardioForDay = id => {
    let day = retrieveItemById(id, programContext.program.schedule.days)
    return day.routine.cardio && day.routine.cardio.length > 0 ? (
      <React.Fragment>
        <Typography variant={'h5'} gutterBottom>
          {'Cardio'}
        </Typography>
        {day.routine.cardio.map(cardioId => {
          let cardioRoutine = retrieveItemById(
            cardioId,
            programContext.program.cardio
          )
          return <CardioCard data={[cardioRoutine]} key={cardioRoutine.id} />
        })}
      </React.Fragment>
    ) : null
  }

  const renderWorkoutsForDay = id => {
    let day = retrieveItemById(id, programContext.program.schedule.days)
    // return (
    return day.routine.workouts && day.routine.workouts.length > 0 ? (
      <React.Fragment>
        <Typography variant={'h5'} gutterBottom>
          {'Weights'}
        </Typography>
        {day.routine.workouts.map(workoutId => {
          let wo = retrieveItemById(workoutId, programContext.program.workouts)
          return (
            <WorkoutCard disabled={true} item={wo} id={wo.id} key={wo.id} />
          )
        })}
      </React.Fragment>
    ) : null
  }

  return (
    <React.Fragment>
      <WoListDialog
        title={'Choose Workout(s)'}
        open={showWorkoutList}
        onClose={toggleWorkoutList}
        items={programContext.program.workouts}
        onSave={handleWorkoutListSave}
        retrieve={retrieve}
      />
      <WoListDialog
        title={'Choose Cardio Routine(s)'}
        open={showCardioList}
        onClose={toggleCardioList}
        items={programContext.program.cardio}
        onSave={handleCardioListSelect}
        // TODO: fix this so we don't need to pass in a mock function.
        retrieve={() => []}
      />
      <Container>
        <Grid container direction={'row'} justify={'center'} alignItems={'flex-start'}>
          {props.disabled === true ? (
          <Grid item>
            <Box style={{ padding: '10px' }}>
              <FormButton
                value={'do it'}
                onClick={() => launchWoDay(props.item.id)}
              />
            </Box>
          </Grid>) : null}
          <Grid item xs={12} sm={6}>
            <Card
              className={classes.root}
              style={{ maxWidth: props.maxWidth }}
              variant='outlined'
              onClick={handleClick}
              key={props.id}
            >
              <CardHeader
                className={classes.cardHeader}
                // title={props.item.name}
                titleTypographyProps={{ variant: 'h6' }}
                action={
                  props.disabled === false ? (
                    <React.Fragment>
                      <IconButton
                        aria-label='Edit'
                        onClick={() => editItem(props.item.id)}
                      >
                        <EditIcon color='inherit' fontSize='small' />
                      </IconButton>
                      <IconButton
                        aria-label='Delete'
                        onClick={() => deleteItem(props.item.id)}
                      >
                        <DeleteForeverIcon color='inherit' fontSize='small' />
                      </IconButton>
                    </React.Fragment>
                  ) : null
                }
              />
              {props.disabled ? null : (
                <CardActions disableSpacing>
                  <Button variant='outlined' onClick={addWeightsRoutine}>
                    {'Add Weights'}
                  </Button>
                  <Button variant='outlined' onClick={addCardio}>
                    {'Add Cardio'}
                  </Button>
                </CardActions>
              )}
              <CardContent className={classes.cardContent}>
                <Box style={{ padding: '10px' }}>
                  {renderCardioForDay(props.item.id)}
                </Box>
                <Box style={{ padding: '10px' }}>
                  {renderWorkoutsForDay(props.item.id)}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default ScheduleDay
