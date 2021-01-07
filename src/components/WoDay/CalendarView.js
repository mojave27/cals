import React, { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from '../../context/ThemeContext'
import { Paper, Typography } from '@material-ui/core'
import {
  Table,
  // TableBody,
  TableCell,
  TableContainer,
  // TableHead,
  TableRow
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

const CalendarView = props => {
  // const [forceSpinner, setForceSpinner] = useState(false)
  const [years, setYears] = useState({})
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)

  useEffect(() => {
    let years = buildYearsObject(props.items)
    setYears(years)
  }, [props.items])

  const buildYearsObject = items => {
    let years = {}
    items.forEach(item => {
      years[item.date.year] = {}
      years[item.date.year][item.date.month] = []
      years[item.date.year][item.date.month].push(item)
    })
    return years
  }

  const renderCalendar = () => {
    let keys = Object.keys(years)
    return keys.map(year => {
      return <Year year={year} key={year} />
    })
  }

  return <div>{renderCalendar()}</div>
}

CalendarView.defaultProps = {
  items: []
}

export default CalendarView

const Year = props => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  return (
    <TableContainer component={Paper} key={'cardioTable'}>
      <Table size='small'>
        {months.map((month, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                <Month startDate={new Date(props.year, month)} />
              </TableCell>
            </TableRow>
          )
        })}
      </Table>
    </TableContainer>
  )
}

const Month = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)

  const months = {
    0: { name: 'January', days: 31 },
    1: { name: 'February', days: 28 },
    2: { name: 'March', days: 31 },
    3: { name: 'April', days: 30 },
    4: { name: 'May', days: 31 },
    5: { name: 'June', days: 30 },
    6: { name: 'July', days: 31 },
    7: { name: 'August', days: 31 },
    8: { name: 'September', days: 30 },
    9: { name: 'October', days: 31 },
    10: { name: 'November', days: 30 },
    11: { name: 'December', days: 31 }
  }

  const renderWeeks = () => {
    let month = months[props.startDate.getMonth()]

    return (
      <React.Fragment>
        <Typography>
          {month.name}
          {' - '}
          {props.startDate.getFullYear()}
        </Typography>
        <TableContainer component={Paper} key={'cardioTable'}>
          <Table size='small'>{weeksForMonth(month, props.startDate)}</Table>
        </TableContainer>
      </React.Fragment>
    )
  }

  const weeksForMonth = (month, startDate) => {
    // 4 weeks + 1 week (if props.startDate.getDay() + 28 is less than month.days)
    // 4 weeks + 2 weeks (if props.startDate.getDay() + 28 is greater than month.days)
    let totalWeeks = 28 + startDate.getDay() < month.days ? 5 : 6
    console.log(totalWeeks)

    let weeks = []
    let startDayOfWeek = startDate.getDay()
    let startDayOfMonth = startDate.getDate()

    for (
      let i = 1, j = startDayOfWeek, k = startDayOfMonth;
      i <= totalWeeks;
      i++, j += 7, k += 7
    ) {
      // console.log(`week ${i}`)
      // console.log(`j: ${j}`)
      // console.log(`k: ${k}`)
      let isFirstWeek = i === 1 ? true : false
      let modifier = i * 7 - 7
      weeks.push(
        <Week
          startDayOfWeek={j}
          startDayOfMonth={k}
          firstWeek={isFirstWeek}
          modifier={modifier}
          month={month}
          key={i}
        />
      )
    }

    return <React.Fragment>{weeks}</React.Fragment>
  }

  return renderWeeks()
}

const Week = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)
  const day = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  /* print 7 days, but be sure to start the 1st to match props.startDay *
   * (e.g. if startDay is Tuesday, then the 1st should be Tuesday)      */

  let dayOfWeek = props.startDayOfWeek // j
  let dayOfMonth = props.startDayOfMonth // k
  console.log(`dayOfWeek: ${dayOfWeek}`)
  console.log(`dayOfMonth: ${dayOfMonth}`)

  let days = []
  let displayDate = ''

  for (let dayNumber = 0; dayNumber <= 6; dayNumber++) {
    if (props.firstWeek) {
      if (dayOfWeek - dayNumber > 0) displayDate = ''
      if (dayOfWeek - dayNumber === 0) displayDate = dayOfMonth
      if (dayOfWeek - dayNumber < 0)
        displayDate = dayOfMonth + (dayNumber - dayOfWeek)
    } else {
      displayDate = dayOfMonth + dayNumber
      if (displayDate > props.month.days) displayDate = ''
    }
    days.push(
      <TableCell
        key={dayNumber + dayOfMonth}
      >{`${day[dayNumber]} - ${displayDate}`}</TableCell>
    )
  }

  return <TableRow>{days}</TableRow>
}
