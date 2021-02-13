import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BasicSpinner from '../spinners/BasicSpinner'
import { Box, Paper, Typography, TableHead } from '@material-ui/core'
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
  month: {
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
    paddingBottom: '15px',
    fontWeight: '700'
  },
  item: {
    height: '75px',
    maxWidth: '75px',
    textAlign: 'center',
    paddingTop: '25%',
    borderRadius: 1,
    fontWeight: '700'
  },
  itemWithContent: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  tableContaner: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
    '& .MuiTableContainer-root': {
      width: '100%',
      overflowX: 'visible',
    }
  },
  tableHead: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.palette.primary.dark}`
  }
}))

const CalendarView = props => {
  const [years, setYears] = useState({})
  const [showSpinner, setShowSpinner] = useState(false)

  const emptyYear = {
    January: {},
    February: {},
    March: {},
    April: {},
    May: {},
    June: {},
    July: {},
    August: {},
    September: {},
    October: {},
    November: {},
    December: {}
  }

  useEffect(() => {
    let years = buildYearsObject(props.items)
    setYears(years)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.items])

  const toggleSpinner = () => {
    setShowSpinner(!showSpinner)
  }

  const handleSelect = (id) => {
    toggleSpinner()
    props.onSelect(id)
  }

  const buildYearsObject = items => {
    let years = {}

    // TODO only render up to current month
    items.forEach(item => {
      years[item.date.year] = { ...emptyYear }
    })
    return years
  }

  const renderCalendar = () => {
    let keys = Object.keys(years)
    return keys.reverse().map(year => {
      return <Year year={year} key={year} items={props.items} onSelect={handleSelect} />
    })
  }

  return (
    <React.Fragment>
      <BasicSpinner show={showSpinner} />
      <div>{renderCalendar()}</div>
    </React.Fragment>
  )
}

CalendarView.defaultProps = {
  items: []
}

export default CalendarView

// *************************************************************

const Year = props => {
  const classes = useStyles()
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const today = new Date()

  const getItemsForYear = (items, year) => {
    let inScopeItems = items.filter(item => {
      return Number(item.date.year) === Number(year)
    })
    return inScopeItems
  }

  const getItemsInScopeForYearAndMonth = (items, month) => {
    let itemsForYear = getItemsForYear(items, props.year)
    let inScopeItems = itemsForYear.filter(item => {
      return Number(item.date.month) === Number(month)
    })
    return inScopeItems
  }

  const monthIsInFuture = month => {
    let skip = false
    // eslint-disable-next-line eqeqeq
    if (today.getFullYear() == props.year && today.getMonth() < month) {
      skip = true
    }
    return skip
  }

  return (
    <TableContainer
      component={Paper}
      className={classes.tableContaner}
      key={'cardioTable'}
    >
      <Table size='small'>
        <TableBody>
          {months.reverse().map((month, index) => {
            if (monthIsInFuture(months[index])) return null

            return (
              <TableRow key={index}>
                <TableCell>
                  <div style={{ margin: '10px 0px' }}>
                    <Month
                      startDate={new Date(props.year, month)}
                      items={getItemsInScopeForYearAndMonth(props.items, month)}
                      onSelect={props.onSelect}
                    />
                  </div>
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
  const classes = useStyles()

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
        />
      )
    }

    return <React.Fragment>{weeks}</React.Fragment>
  }

  return renderWeeks()
}

const Week = props => {
  const getItemForDay = displayDate => {
    let found = props.items.find(item => {
      return Number(item.date.day) === Number(displayDate)
    })
    if (found === undefined) return {wo: {id: -1}}
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
      <TableCell key={dayOfWeek + dayOfMonth} style={{border: '1px solid #eee'}}>
        {/* <div style={{minHeight: '20px'}}>{displayDate}</div> */}
        <CalendarDay displayDate={displayDate}>
          <ItemCard item={itemForDay} itemSelect={props.onSelect}/>
        </CalendarDay>
      </TableCell>
    )
  }

  return <TableRow>{days}</TableRow>
}

const CalendarDay = props => {
  return (
    <Box style={{paddingBottom:'5px', minHeight:'100px', minWidth:'75px'}}>
      <div style={{minHeight: '20px', paddingBottom:'3px'}}>{props.displayDate}</div>
      {props.children}
    </Box>
  )
}

const ItemCard = props => {
  const classes = useStyles()

  return props.item === null 
  ? ''
  : (
    <Paper
      className={`${classes.item} ${props.item.wo.name ? classes.itemWithContent : '' }`}
      onClick={() => props.itemSelect(props.item.id)}
      elevation={props.item.wo.name ? 1 : 0 }
    >
        {props.item.wo.name ? props.item.wo.name : ''}
    </Paper>
  )
}
