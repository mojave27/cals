import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { deleteWoDay } from 'api/wodaysApi'
import WoDayContext from 'context/WoDayContext'
import IconButton from '@material-ui/core/IconButton'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { retrieveWoDayById } from 'api/wodaysApi'
import { Card, CardActions, CardContent, Paper } from '@material-ui/core'
import { WODAY_PATH } from '../../constants'
import {
  cardioExerciseStarted,
  hasCardio,
  hasWorkout,
  workoutName,
} from 'components/workouts/WorkoutUtils'
import { cloneDeep } from 'lodash'
import { navigate } from '@reach/router'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  item: {
    height: '50',
    maxWidth: '75px',
    textAlign: 'center',
    padding: '5px 0px',
    borderRadius: 1,
    fontWeight: '700',
    margin: 'auto',
  },
  itemWithWo: {
    backgroundColor: () => {
      switch(theme.name){
        case 'light':
          return theme.palette.primary.light
        case 'dark':
          return theme.palette.primary.main
        default:
          return theme.color4.hex
      }
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: () => {
      switch(theme.name){
        case 'light':
          return theme.palette.primary.contrastText
        case 'dark':
          return '#FFF'
        default:
          return theme.color4_text.hex
      }}
    },
    margin: 'auto',
  },
  itemWithCardio: {
    backgroundColor: () => {
      switch(theme.name){
        case 'light':
          return theme.palette.primary.light
        case 'dark':
          return theme.palette.primary.main
        default:
          return theme.color4.hex
      }
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: () => {
      switch(theme.name){
        case 'light':
          return theme.palette.primary.contrastText
        case 'dark':
          return '#FFF'
        default:
          return theme.color4_text.hex
      }}
    },
    margin: 'auto',
  },
  itemCard: {
    border:'1px solid #999', 
    paddingBottom:'5px',
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey["600"] : theme.color3.hex
  },
  cardContent: {
    padding: '3px',
    '&:last-child': {
      paddingBottom: '5px'
    }
  },
  cardActions: { padding: '1px' },
  currentDay: {
    border: '1px solid #eee',
    // backgroundColor: theme.palette.success[theme.palette.type]
    backgroundColor: () => {
      switch(theme.name) {
        case 'light':
          return theme.palette.success[theme.palette.type]
        case 'dark':
          return theme.palette.success[theme.palette.type]
        default: 
          return theme.color2.hex
      }
    }
  },
  standardDay: {
    border: '1px solid #eee'
  },
  cardioBadge: {
    color: theme.palette.secondary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: () => {
        switch(theme.name){
          case 'dark':
          return '#FFF'
        default:
          return theme.palette.primary.contrastText
      }}
    }
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tableContaner: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
    '& .MuiTableContainer-root': {
      width: '100%',
      overflowX: 'visible',
    },
  },
  tableHead: {
    // color: theme.palette.primary.contrastText,
    color: theme.color4_text.hex,
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: theme.color4.hex,
    borderBottom: `1px solid ${theme.palette.primary.dark}`,
  },
}))

const cardioBadge = ({ item }) => {
  return cardioName(item)
}

const cardioName = (item) => {
  let length = item.cardio ? item.cardio.exercises.length : 0
  if (Number(length) === 0) return ''

  let names = []
  item.cardio.exercises.forEach((ex, index) => {
    if (cardioExerciseStarted(ex)) {
      names.push(
        <font key={`${ex.type}-${index}`}>
          {ex.type}
          <br />
        </font>
      )
    } else {
      names.push(
        <font color='pink' key={ex.type}>
          {`${ex.type}`}
          <br />
        </font>
      )
    }
  })
  return names
}

const convertExistingWodayToNew = (woday) => {
  let newWoday = cloneDeep(woday)
  // update id
  newWoday.id = ''
  // update date
  let dt = new Date()
  newWoday.date.year = dt.getFullYear()
  newWoday.date.month = dt.getMonth()
  newWoday.date.day = dt.getDate()

  // update stats
  newWoday.weight = ''
  newWoday.goals = ''
  newWoday.duration = ''
  newWoday.energy = 10
  newWoday.sleep = 10

  // update notes
  newWoday.notes = `\n\n-------------------------\nPrevious Notes:\n${woday.notes}`

  // copy workouts for reference?
  // ... nah - cuz this won't help with non-copied wodays

  // update cardio
  if (
    typeof woday.cardio.exercises !== 'undefined' &&
    woday.cardio.exercises.length > 0
  ) {
    newWoday.cardio.exercises = woday.cardio.exercises.map((ex) => {
      let newEx = cloneDeep(ex)
      newEx.duration = ''
      newEx.distance = ''
      newEx.heartRate = ''
      return newEx
    })
  }

  // update workout reps
  let updatedWorkouts = woday.workouts.map((wo) => {
    let updatedExGroups = wo.exerciseGroups.map((exGroup) => {
      let updatedExercises = exGroup.exercises.map((ex) => {
        if (typeof ex.sets != 'undefined' && ex.sets.length > 0) {
          ex.sets.forEach((set) => {
            set.reps = ''
          })
        }
        return ex
      })
      exGroup.exercises = updatedExercises
      return exGroup
    })
    wo.exerciseGroups = updatedExGroups
    return wo
  })
  newWoday.workouts = updatedWorkouts

  return newWoday
}

const CalendarItemCard = (props) => {
  const classes = useStyles()
  let woDayContext = useContext(WoDayContext)

  const doStuff = async (id) => {
    console.log(`woday id: ${id}`)
    const response = await retrieveWoDayById(id)
    let newWoDay = convertExistingWodayToNew(response)
    await woDayContext.updateWoDay(newWoDay)
    navigate(WODAY_PATH)
  }

  const deleteStuff = async (id) => {
    console.log(`deleting woday id: ${id}`)
    await deleteWoDay(id)
    props.onDelete(id)
  }

  const showItem = () => {
    if (props.item === null) return false
    if (!hasWorkout(props.item) && !hasCardio(props.item)) return false
    return true
  }

  // return props.item === null ? (
  return showItem() ? (
    <Card className={classes.itemCard}>
    {/* <Card classes={{ root: classes.itemCard}}> */}
      <CardContent classes={{ root: classes.cardContent }}>
      {hasWorkout(props.item) || hasCardio(props.item) ? (
        <CardActions classes={{root: classes.cardActions }}>
          <IconButton aria-label='Copy' onClick={() => doStuff(props.item.id)}>
            <FileCopyIcon color='inherit' fontSize='small' />
          </IconButton>
          <IconButton aria-label='Copy' onClick={() => deleteStuff(props.item.id)}>
            <DeleteForeverIcon color='inherit' fontSize='small' />
          </IconButton>
        </CardActions>
      ) : null}
      {hasWorkout(props.item) ? (
        <Paper
          className={`${classes.item} ${classes.itemWithWo}`}
          onClick={() => props.itemSelect(props.item.id)}
          elevation={1}
        >
          {workoutName(props.item)}
        </Paper>
      ) : null}
      <div style={{ height: '10px' }} />
      {hasCardio(props.item) ? (
        <Paper
          className={`${classes.item} ${classes.itemWithCardio}`}
          onClick={() => props.itemSelect(props.item.id)}
          elevation={1}
        >
          <div className={classes.cardioBadge}>{cardioBadge(props)}</div>
        </Paper>
      ) : null}
      </CardContent>
    </Card>
  ) : (
    ''
  )
}

export default CalendarItemCard
