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
import WorkoutListDialog from '../workouts/WorkoutListDialog'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { makeStyles } from '@material-ui/core/styles'
import WorkoutCard from '../workouts/WorkoutCard'
import { retrieveItemById } from '../ArrayUtils'

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

  const handleClick = () => {
    if (props.onClick) props.onClick(props.id)
  }

  const editItem = id => {
    if (props.editItem) props.editItem(id)
  }

  const deleteItem = id => {
    if (props.deleteItem) props.deleteItem(id)
  }

  const addWorkout = () => {
    console.log('add workout clicked')
    toggleWorkoutList()
  }

  const toggleWorkoutList = () => {
    setShowWorkoutList(!showWorkoutList)
  }

  const handleWorkoutListSelect = workout => {
    // console.log(`%cWorkoutListDialog selectWorkout: ${props.item.id}`, 'color:lime;backgroundColor:navy;border:1px solid red')
    // console.log(`%cWorkoutListDialog selectWorkout: ${workout.id}`, 'color:lime;backgroundColor:navy;border:1px solid red')
    // console.log('selected....      ')
    // console.log(`  day.id: ${props.item.id}`)
    // console.log(`  workout.id: ${workout.id}`)
    let dayId = props.item.id
    let workoutId = workout.id
    programContext.addWorkoutToSchedule(dayId, workoutId)
  }

  const renderWorkoutsForDay = id => {
    let day = retrieveItemById(id, programContext.program.schedule.days)
    console.log(JSON.stringify(day))
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

  return showWorkoutList ? (
    <WorkoutListDialog
      open={true}
      onClose={toggleWorkoutList}
      workouts={programContext.program.workouts}
      onSelect={handleWorkoutListSelect}
    />
  ) : (
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
      <CardContent className={classes.cardContent}>
        {renderWorkoutsForDay(props.item.id)}
      </CardContent>
      <CardActions disableSpacing>
        <Button variant='outlined' onClick={addWorkout}>
          {'Add Workout'}
        </Button>
      </CardActions>
    </Card>
  )
}

export default ScheduleDay
