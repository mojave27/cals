import React, { useContext, useState } from 'react'
import ThemeContext from '../../context/ThemeContext'
import ProgramContext from '../../context/ProgramContext'
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Container
} from '@material-ui/core'
import CardioCard from './CardioCard'
// import CardioListDialog from '../workouts/CardioListDialog'
import WoListDialog from '../workouts/WoListDialog'
import WorkoutCard from '../workouts/WorkoutCard'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { makeStyles } from '@material-ui/core/styles'
import { retrieveItemById } from '../ArrayUtils'
import { retrieve } from '../../api/workoutsApi'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    margin: 'auto'
  },
  container: {
    marginBottom: '10px'
  },
  table: {
    backgroundColor: theme.color4.hex
  },
  th: {
    backgroundColor: theme.color3.hex,
    color: theme.color3_text.hex,
    textAlign: 'left'
  },
  thLeft: {
    width: '70%'
  },
  td: {
    textAlign: 'left',
    color: theme.color4_text.hex
  },
  tdLeft: {
    width: '70%'
  },
  cardHeader: {
    padding: '6px 16px 0px 16px'
  },
  cardContent: {
    padding: '8px 16px 0px 16px'
  }
}))

const ScheduleDay = props => {
  let programContext = useContext(ProgramContext)
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
    let workoutIds = workouts.map( wo => wo.id)
    programContext.addWorkoutsToSchedule(dayId, workoutIds)
  }

  const handleCardioListSelect = cardioRoutines => {
    let dayId = props.item.id
    let cardioIds = cardioRoutines.map( cardio => cardio.id)
    programContext.addCardioRoutinesToSchedule(dayId, cardioIds)
  }

  const renderCardioForDay = id => {
    let day = retrieveItemById(id, programContext.program.schedule.days)
    return (
      <Container>
        {day.routine.cardio.map(cardioId => {
          let cardioRoutine = retrieveItemById(
            cardioId,
            programContext.program.cardio
          )
          return (
            // <CardioCard disabled={true} item={cardio} id={cardio.id} key={cardio.id} />
            <CardioCard data={[cardioRoutine]} key={cardioRoutine.id} />
          )
        })}
      </Container>
    )
  }

  const renderWorkoutsForDay = id => {
    let day = retrieveItemById(id, programContext.program.schedule.days)
    return (
      <Container>
        {day.routine.workouts.map(workoutId => {
          let wo = retrieveItemById(workoutId, programContext.program.workouts)
          return (
            <WorkoutCard disabled={true} item={wo} id={wo.id} key={wo.id} />
          )
        })}
      </Container>
    )
  }

  return (
    <React.Fragment>
      <WoListDialog
        open={showWorkoutList}
        onClose={toggleWorkoutList}
        items={programContext.program.workouts}
        onSave={handleWorkoutListSave}
        title={'wo man'}
        retrieve={retrieve}
      />
      <WoListDialog
        open={showCardioList}
        onClose={toggleCardioList}
        items={programContext.program.cardio}
        onSave={handleCardioListSelect}
        title={'Choose Cardio Routine(s)'}
        retrieve={ () => [] }
      />
      <Card
        className={classes.root}
        style={{ maxWidth: props.maxWidth }}
        variant='outlined'
        onClick={handleClick}
        key={props.id}
      >
        <CardHeader
          className={classes.cardHeader}
          title={props.item.name}
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
        <CardActions disableSpacing>
          <Button variant='outlined' onClick={addWeightsRoutine}>
            {'Add Weights'}
          </Button>
          <Button variant='outlined' onClick={addCardio}>
            {'Add Cardio'}
          </Button>
        </CardActions>
        <CardContent className={classes.cardContent}>
          {renderCardioForDay(props.item.id)}
          {renderWorkoutsForDay(props.item.id)}
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

export default ScheduleDay
