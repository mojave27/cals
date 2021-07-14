import React, { Fragment, useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { deleteWoDay } from 'api/wodaysApi'
import WoDayContext from 'context/WoDayContext'
import BasicSpinner from '../spinners/BasicSpinner'
import IconButton from '@material-ui/core/IconButton'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { retrieveWoDayById } from 'api/wodaysApi'
import { Box, Paper, Typography, TableHead } from '@material-ui/core'
import { WODAY_PATH } from '../../constants'
import {
  cardioExerciseStarted,
  hasCardio,
  hasWorkout,
  workoutName,
} from 'components/workouts/WorkoutUtils'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core'
import { cloneDeep, isEmpty } from 'lodash'
import { navigate } from '@reach/router'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  month: {
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
    paddingBottom: '15px',
    fontWeight: '700',
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
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
    margin: 'auto',
  },
  itemWithCardio: {
    backgroundColor: theme.palette.secondary.dark,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText,
    },
    margin: 'auto',
  },
  cardioBadge: {
    color: theme.palette.secondary.light,
    '&:hover': {
      color: theme.palette.secondary.contrastText,
    },
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
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.palette.primary.dark}`,
  },
}))

const CalendarView = (props) => {
  const [activeMonth, setActiveMonth] = useState({})
  const [showSpinner, setShowSpinner] = useState(false)

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  useEffect(() => {
    let today = new Date()
    let thisMonth = {
      name: months[today.getMonth()],
      index: today.getMonth(),
      year: today.getFullYear()
    }
    setActiveMonth(thisMonth)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.items])

  const toggleSpinner = () => {
    setShowSpinner(!showSpinner)
  }

  const handleSelect = (id) => {
    toggleSpinner()
    props.onSelect(id)
  }

  const getItemsForYear = (items, year) => {
    let inScopeItems = items.filter((item) => {
      return Number(item.date.year) === Number(year)
    })
    return inScopeItems
  }

  const getItemsInScopeForYearAndMonth = (items, month) => {
    let itemsForYear = getItemsForYear(items, activeMonth.year)
    let inScopeItems = itemsForYear.filter((item) => {
      return Number(item.date.month) === Number(month)
    })
    return inScopeItems
  }

  const nextMonth = () => {
    let year = activeMonth.year
    let monthIndex = activeMonth.index + 1
    // handle December --> January
    if (activeMonth.index === 11) {
      year = activeMonth.year + 1
      monthIndex = 0
    }
    let thisMonth = {
      name: months[monthIndex],
      index: monthIndex,
      year: year
    }
    setActiveMonth(thisMonth) 
  }


  const prevMonth = () => {
    let year = activeMonth.year
    let monthIndex = activeMonth.index - 1
    // handle January --> December 
    if (activeMonth.index === 0) {
      year = activeMonth.year - 1
      monthIndex = 11
    }
    let thisMonth = {
      name: months[monthIndex],
      index: monthIndex,
      year: year
    }
    setActiveMonth(thisMonth) 
  }

  const renderActiveMonth = () => {
      return (
        isEmpty(activeMonth) 
        ? 
        <div>{'loading...'}</div>
        :
        <Fragment>
          <IconButton aria-label='Next' onClick={prevMonth}>
            <ArrowLeftIcon color='inherit' fontSize='small' />
          </IconButton>
          <IconButton aria-label='Next' onClick={nextMonth}>
            <ArrowRightIcon color='inherit' fontSize='small' />
          </IconButton>
        <Month
          startDate={new Date(activeMonth.year, activeMonth.index)}
          items={getItemsInScopeForYearAndMonth(props.items, activeMonth.index)}
          year={activeMonth.year}
          key={activeMonth.year}
          onSelect={handleSelect}
          onDelete={props.onDelete}
        />
        </Fragment>
      )
  }

  return (
    <React.Fragment>
      <BasicSpinner show={showSpinner} />
      <div>{renderActiveMonth()}</div>
    </React.Fragment>
  )
}

CalendarView.defaultProps = {
  items: [],
}

export default CalendarView

// *************************************************************
const Month = (props) => {
  const classes = useStyles()

  const months = {
    0: { name: 'January', days: 31 },
    1: {
      name: 'February',
      days:
        props.startDate.getFullYear() === 2020 ||
        props.startDate.getFullYear() - 2020 === 4
          ? 29
          : 28,
    },
    2: { name: 'March', days: 31 },
    3: { name: 'April', days: 30 },
    4: { name: 'May', days: 31 },
    5: { name: 'June', days: 30 },
    6: { name: 'July', days: 31 },
    7: { name: 'August', days: 31 },
    8: { name: 'September', days: 30 },
    9: { name: 'October', days: 31 },
    10: { name: 'November', days: 30 },
    11: { name: 'December', days: 31 },
  }

  const renderWeeks = () => {
    let month = months[props.startDate.getMonth()]
    return (
      <React.Fragment>
        <Typography className={classes.month}>
          {`${month.name} ${props.startDate.getFullYear()}`}
        </Typography>
        <TableContainer component={Paper} key={'cardioTable'}>
          <Table size='small'>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.tableHead}>Sunday</TableCell>
                <TableCell className={classes.tableHead}>Monday</TableCell>
                <TableCell className={classes.tableHead}>Tuesday</TableCell>
                <TableCell className={classes.tableHead}>Wednesday</TableCell>
                <TableCell className={classes.tableHead}>Thursday</TableCell>
                <TableCell className={classes.tableHead}>Friday</TableCell>
                <TableCell className={classes.tableHead}>Saturday</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{weeksForMonth(month, props.startDate)}</TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    )
  }

  const numberOfWeeksInMonth = (month, startDate) => {
    let startDayOfWeek = startDate.getDay()
    // days used in 1st week of month (e.g. if month starts on a Wed or Thurs)
    let week_1_days_count = 7 - startDayOfWeek
    let number_of_middle_weeks = Math.floor(
      (month.days - week_1_days_count) / 7
    )
    let final_week_days_count = (month.days - week_1_days_count) % 7
    let totalWeeks =
      1 + number_of_middle_weeks + (final_week_days_count > 0 ? 1 : 0)
    return totalWeeks
  }

  const weeksForMonth = (month, startDate) => {
    let totalWeeks = numberOfWeeksInMonth(month, startDate)
    let weeks = []

    // numeric identifier for first day of month - only used for the first week of month
    let startDayOfWeek = startDate.getDay()

    // the date number shown on the first day of the week being rendered.
    let startDateOfWeek = startDate.getDate()

    let week_1_start = startDateOfWeek
    let week_2_start = startDateOfWeek + (7 - startDayOfWeek)
    let weekStarts = [week_1_start, week_2_start]

    for (let x = 1, j = week_2_start + 7; x <= totalWeeks - 2; x++, j += 7) {
      weekStarts.push(j)
    }

    for (let i = 0; i < totalWeeks; i++) {
      let isFirstWeek = i === 0 ? true : false
      weeks.push(
        <Week
          firstWeek={isFirstWeek}
          startDayOfWeek={startDayOfWeek}
          startDateOfWeek={weekStarts[i]}
          month={month}
          items={props.items}
          key={i}
          onSelect={props.onSelect}
          onDelete={props.onDelete}
        />
      )
    }

    return <React.Fragment>{weeks}</React.Fragment>
  }

  return renderWeeks()
}

const Week = (props) => {
  const getItemForDay = (displayDate) => {
    let found = props.items.find((item) => {
      return Number(item.date.day) === Number(displayDate)
    })
    if (found === undefined) return { wo: { id: -1 } }
    return found
  }

  let dayOfMonth = props.startDateOfWeek
  let days = []
  let displayDate = ''

  for (let dayOfWeek = 0; dayOfWeek <= 6; dayOfWeek++) {
    if (props.firstWeek) {
      let targetDayOfWeek = props.startDayOfWeek
      if (targetDayOfWeek - dayOfWeek > 0) displayDate = ''
      if (targetDayOfWeek - dayOfWeek === 0) displayDate = dayOfMonth
      if (targetDayOfWeek - dayOfWeek < 0)
        displayDate = dayOfMonth + (dayOfWeek - targetDayOfWeek)
    } else {
      displayDate = dayOfMonth + dayOfWeek
      if (displayDate > props.month.days) displayDate = ''
    }
    let itemForDay = getItemForDay(displayDate)
    days.push(
      <TableCell
        key={dayOfWeek + dayOfMonth}
        style={{ border: '1px solid #eee' }}
      >
        <CalendarDay displayDate={displayDate}>
          <ItemCard item={itemForDay} itemSelect={props.onSelect} onDelete={props.onDelete} />
        </CalendarDay>
      </TableCell>
    )
  }

  return <TableRow>{days}</TableRow>
}

const CalendarDay = (props) => {
  return (
    <Box style={{ paddingBottom: '5px', minHeight: '100px', minWidth: '75px' }}>
      <div style={{ minHeight: '20px', paddingBottom: '3px' }}>
        {props.displayDate}
      </div>
      {props.children}
    </Box>
  )
}

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

const ItemCard = (props) => {
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

  return props.item === null ? (
    ''
  ) : (
    <div style={{border:'1px solid yellow'}}>
      {hasWorkout(props.item) || hasCardio(props.item) ? (
        <div>
          <IconButton aria-label='Copy' onClick={() => doStuff(props.item.id)}>
            <FileCopyIcon color='inherit' fontSize='small' />
          </IconButton>
          <IconButton aria-label='Copy' onClick={() => deleteStuff(props.item.id)}>
            <DeleteForeverIcon color='inherit' fontSize='small' />
          </IconButton>
        </div>
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
    </div>
  )
}
