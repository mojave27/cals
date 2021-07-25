import React, { Fragment, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CalendarItemCard from 'components/WoDay/CalendarItemCard'
import BasicSpinner from '../spinners/BasicSpinner'
import IconButton from '@material-ui/core/IconButton'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import { Box, Paper, Typography, TableHead } from '@material-ui/core'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core'
import { isEmpty } from 'lodash'

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

const monthsDetails = {
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
  11: { name: 'December', days: 31 },
}

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
  const classes = useStyles()

  const isToday = displayDate => {
    let result = false
    let todayDate = new Date()
    let today = {
      dayOfMonth: todayDate.getDate(),
      month: todayDate.getMonth()
    }
    if (monthsDetails[today.month].name === props.month.name) {
      if (today.dayOfMonth === displayDate) result = true
    }
    return result
  }

  let classToUse = displayDate => {
    return isToday(displayDate) ? classes.currentDay : classes.standardDay
  }

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

  // this logic needs commenting to make it clear
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
        classes={{ root: classToUse(displayDate) }}
      >
        <CalendarDay displayDate={displayDate}>
          {/* <ItemCard item={itemForDay} itemSelect={props.onSelect} onDelete={props.onDelete} /> */}
          <CalendarItemCard item={itemForDay} itemSelect={props.onSelect} onDelete={props.onDelete} />
        </CalendarDay>
      </TableCell>
    )
  }

  return <TableRow>{days}</TableRow>
}

const CalendarDay = (props) => {
  return (
    <Box style={{ paddingBottom: '5px', minHeight: '100px', minWidth: '75px' }}>
      <div style={{ minHeight: '20px', paddingBottom: '3px'}}>
        {props.displayDate}
      </div>
      {props.children}
    </Box>
  )
}
