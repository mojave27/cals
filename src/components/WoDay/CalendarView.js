import React, { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from '../../context/ThemeContext'
import { Paper, Typography, TableHead } from '@material-ui/core'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
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
  },
  tableContaner: {
    backgroundColor: theme.palette.primary.dark
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.palette.primary.dark}`
  }
}))

const CalendarView = props => {
  const [years, setYears] = useState({})

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

  return (<div>{renderCalendar()}</div>)
}

CalendarView.defaultProps = {
  items: []
}

export default CalendarView

const Year = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  return (
    <TableContainer component={Paper} className={classes.tableContaner} key={'cardioTable'}>
      <Table size='small'>
        <TableBody>
          {months.map((month, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <div style={{margin:'10px 0px'}}><Month startDate={new Date(props.year, month)} /></div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const Month = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)

  const months = {
    0: { name: 'January', days: 31 },
    1: {
      name: 'February',
      days:
        props.startDate.getFullYear() === 2020 ||
        props.startDate.getFullYear() - 2020 === 4
          ? 29
          : 28
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
    11: { name: 'December', days: 31 }
  }

  const renderWeeks = () => {
    let month = months[props.startDate.getMonth()]
    return (
      <React.Fragment>
        <Typography className={classes.root}>
          {`${month.name} ${props.startDate.getFullYear()}`}
        </Typography>
        <TableContainer component={Paper} key={'cardioTable'}>
          <Table size='small'>
          <TableHead className={classes.tableHead}>
            <TableCell className={classes.tableHead}>Sunday</TableCell>
            <TableCell className={classes.tableHead}>Monday</TableCell>
            <TableCell className={classes.tableHead}>Tuesday</TableCell>
            <TableCell className={classes.tableHead}>Wednesday</TableCell>
            <TableCell className={classes.tableHead}>Thursday</TableCell>
            <TableCell className={classes.tableHead}>Friday</TableCell>
            <TableCell className={classes.tableHead}>Saturday</TableCell>
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
    days.push(
      <TableCell
        key={dayOfWeek + dayOfMonth}
      >{displayDate}</TableCell>
    )
  }

  return <TableRow>{days}</TableRow>
}
