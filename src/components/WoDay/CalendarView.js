import React, { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from '../../context/ThemeContext'
import { Paper, Typography } from '@material-ui/core'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  // TableHead,
  TableRow
} from '@material-ui/core'
import { logger } from '../../logging/logger'

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
        <TableBody>
        {months.map((month, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                <Month startDate={new Date(props.year, month)} />
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
      // days: year === 2020 || year - 2020 === 4 ? 29 : 28 
      days: 28
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
        <Typography>
          {month.name}
          {' - '}
          {props.startDate.getFullYear()}
        </Typography>
        <TableContainer component={Paper} key={'cardioTable'}>
          <Table size='small'><TableBody>{weeksForMonth(month, props.startDate)}</TableBody></Table>
        </TableContainer>
      </React.Fragment>
    )
  }

  const numberOfWeeksInMonth = (month, startDate) => {
    const day = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    }
    console.log(`${month.name}, ${startDate.getFullYear()}`)

    let startDayOfWeek = startDate.getDay()
    let week_1_days_count = 7 - startDayOfWeek
    let number_of_middle_weeks = Math.floor((month.days - week_1_days_count) / 7)
    let final_week_days_count =  (month.days - week_1_days_count) % 7
    let totalWeeks = 1 + number_of_middle_weeks + (final_week_days_count > 0 ? 1 : 0)
    console.log(`        start day name: ${day[startDate.getDay()]}`)
    console.log(`     week_1_days_count: ${week_1_days_count}`)
    console.log(`number_of_middle_weeks: ${number_of_middle_weeks}`)
    console.log(` final_week_days_count: ${final_week_days_count}`)
    console.log(`            total weeks: ${totalWeeks}`)
    console.log('-------------------------------')
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
    
    for(let x = 1, j = week_2_start + 7; x <= totalWeeks - 2; x++, j += 7){
      // if(x === 1) weekStarts.push(startDateOfWeek)
      // if(x === 2) weekStarts.push(startDateOfWeek + (7 - startDayOfWeek))
      // if(x > 2) weekStarts.push(j)
      weekStarts.push(j)
    }

    for(let i = 0; i < totalWeeks; i++){
      let isFirstWeek = i === 0 ? true : false
      weeks.push(
        <Week
          firstWeek={isFirstWeek}
          startDayOfWeek={startDayOfWeek}
          startDateOfWeek={weekStarts[i]}
          month={month}
          key={i}
        />)
    }

    // for (
    //   let i = 1, j = startDayOfWeek, k = startDateOfWeek;
    //   i <= totalWeeks;
    //   i++, j += 7, k += 7
    // ) {
    //   let isFirstWeek = i === 1 ? true : false
    //   let modifier = i * 7 - 7
    //   weeks.push(
    //     <Week
    //       startDayOfWeek={j}
    //       startDateOfWeek={k}
    //       firstWeek={isFirstWeek}
    //       modifier={modifier}
    //       month={month}
    //       key={i}
    //     />
    //   )
    // }

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
  let dayOfWeek = props.startDayOfWeek // <--- only used for the first week of month
  let dayOfMonth = props.startDateOfWeek
  logger.logColor('startDayOfWeek:  ', props.startDayOfWeek, 'lime')
  logger.logColor('startDateOfWeek: ', props.startDateOfWeek, 'cyan')

  let days = []
  let displayDate = ''

  for (let dayNumber = 0; dayNumber <= 6; dayNumber++) {
    if (props.firstWeek) {
      if (dayOfWeek - dayNumber > 0) displayDate = ''
      if (dayOfWeek - dayNumber === 0) displayDate = dayOfMonth
      if (dayOfWeek - dayNumber < 0) displayDate = dayOfMonth + (dayNumber - dayOfWeek)
  logger.logColor('display date: ', displayDate, 'pink')
    } else {
      displayDate = dayOfMonth + dayNumber
      if (displayDate > props.month.days) displayDate = ''
  logger.logColor('display date: ', displayDate, 'pink')
    }
    days.push(
      <TableCell
        key={dayNumber + dayOfMonth}
      >{`${day[dayNumber]} - ${displayDate}`}</TableCell>
    )
  }

  return <TableRow>{days}</TableRow>
}
