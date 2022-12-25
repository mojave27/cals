import React, { Fragment, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BasicSpinner from 'components/spinners/BasicSpinner'
import IconButton from '@material-ui/core/IconButton'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
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
      switch (theme.name) {
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
        switch (theme.name) {
          case 'light':
            return theme.palette.primary.contrastText
          case 'dark':
            return '#FFF'
          default:
            return theme.color4_text.hex
        }
      },
    },
    margin: 'auto',
  },
  itemWithCardio: {
    backgroundColor: () => {
      switch (theme.name) {
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
        switch (theme.name) {
          case 'light':
            return theme.palette.primary.contrastText
          case 'dark':
            return '#FFF'
          default:
            return theme.color4_text.hex
        }
      },
    },
    margin: 'auto',
  },
  itemCard: {
    // border: '1px solid #999',
    paddingBottom: '5px',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey['600']
        : theme.color3.hex,
  },
  currentDay: {
    padding: '10px',
    // border: '1px solid #eee',
    verticalAlign: 'top',
    backgroundColor: () => {
      switch (theme.name) {
        case 'light':
          return theme.palette.success[theme.palette.type]
        case 'dark':
          return theme.palette.success[theme.palette.type]
        default:
          return theme.color2.hex
      }
    },
  },
  standardDay: {
    padding: '10px',
    // border: '1px solid #eee',
    verticalAlign: 'top',
  },
  cardioBadge: {
    color: theme.palette.secondary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: () => {
        switch (theme.name) {
          case 'dark':
            return '#FFF'
          default:
            return theme.palette.primary.contrastText
        }
      },
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
    fontSize: '0.75rem',
  },
  tableHead: {
    // color: theme.palette.primary.contrastText,
    color: theme.color4_text.hex,
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: theme.color4.hex,
    // borderBottom: `1px solid ${theme.palette.primary.dark}`,
    '& .MuiTableCell-root': {
      fontSize: '0.7rem',
    },
  },
  tableRow: {
    // color: theme.palette.primary.contrastText,
    color: theme.color3_text.hex,
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: theme.color3.hex,
    // borderBottom: `1px solid ${theme.palette.primary.dark}`,
    '& .MuiTableCell-root': {
      fontSize: '0.7rem',
    },
  },
  summaryTable: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.dark,
    '& .MuiTableContainer-root': {
      width: '100%',
      overflowX: 'visible',
    },
    fontSize: '0.75rem',
    padding: '10px',
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

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const WeekView = (props) => {
  const [activeMonth, setActiveMonth] = useState({})
  const [activeWeek, setActiveWeek] = useState({})
  const [showSpinner, setShowSpinner] = useState(false)
  const today = new Date()

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
    'December',
  ]

  const thisWeek = () => {
    let tempToday = new Date()
    let thisWeek = {
      startDate: today.getDate() - today.getDay(),
      startDateActualDate: new Date(
        tempToday.setDate(today.getDate() - today.getDay())
      ),
      endDate: today.getDate() - today.getDay() + 6,
      thisDate: today.getDate(),
      thisDay: today.getDay(),
      thisDayName: dayNames[today.getDay()],
    }
    return thisWeek
  }

  useEffect(() => {
    let thisMonth = {
      name: months[today.getMonth()],
      index: today.getMonth(),
      year: today.getFullYear(),
    }
    setActiveMonth(thisMonth)
    setActiveWeek(thisWeek())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.items])

  // const toggleSpinner = async (show) => {
  //   console.log(`setting spinner to ${show}`)
  //   await setShowSpinner(show)
  // }

  // const sleep = (ms) => {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  // const handleSelect = async (id) => {
  //   await toggleSpinner(true)
  //   props.onSelect(id)
  //   await sleep(2000)
  //   await toggleSpinner(false)
  // }

  // const getItemsForYear = (items, year) => {
  //   let inScopeItems = items.filter((item) => {
  //     const itemDate = new Date(item.date)
  //     return Number(itemDate.year) === Number(year)
  //   })
  //   return inScopeItems
  // }

  // const getItemsInScopeForYearAndMonth = (items, month) => {
  //   let itemsForYear = getItemsForYear(items, activeMonth.year)
  //   let inScopeItems = itemsForYear.filter((item) => {
  //     return Number(item.date.month) === Number(month)
  //   })
  //   return inScopeItems
  // }

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
      year: year,
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
      year: year,
    }
    setActiveMonth(thisMonth)
  }

  const renderActiveWeek = () => {
    return isEmpty(activeMonth) ? (
      <div>{'loading...'}</div>
    ) : (
      <Fragment>
        <IconButton aria-label='Next' onClick={prevMonth}>
          <ArrowLeftIcon color='inherit' fontSize='small' />
        </IconButton>
        <IconButton aria-label='Next' onClick={nextMonth}>
          <ArrowRightIcon color='inherit' fontSize='small' />
        </IconButton>
        <Week
          firstWeek={false}
          onDelete={() => {}}
          thisWeek={activeWeek}
          thisMonth={activeMonth}
        />
      </Fragment>
    )
  }

  return (
    <React.Fragment>
      <BasicSpinner show={showSpinner} />
      {renderActiveWeek()}
    </React.Fragment>
  )
}

WeekView.defaultProps = {
  items: [],
}

export default WeekView

// *************************************************************
const Week = ({ thisMonth, thisWeek, onDelete, firstWeek }) => {
  const classes = useStyles()

  const isToday = (displayDate) => {
    let result = false
    let todayDate = new Date()
    let today = {
      dayOfMonth: todayDate.getDate(),
      month: todayDate.getMonth(),
    }
    if (monthsDetails[today.month].name === thisMonth.name) {
      if (today.dayOfMonth === displayDate) result = true
    }
    return result
  }

  let classToUse = (displayDate) => {
    return isToday(displayDate) ? classes.currentDay : classes.standardDay
  }

  // const getItemForDay = (displayDate) => {
  //   let found = props.items.find((item) => {
  //     return Number(item.date.day) === Number(displayDate)
  //   })
  //   if (found === undefined) return { wo: { id: -1 } }
  //   return found
  // }

  let dayOfMonth = thisWeek.startDate
  let days = []
  let displayDate = ''

  for (let dayOfWeek = 0; dayOfWeek <= 6; dayOfWeek++) {
    displayDate = dayOfMonth + dayOfWeek
    days.push(
      <TableCell style={{ border: 'none' }}
        key={dayOfWeek + dayOfMonth}
        classes={{ root: classToUse(displayDate) }}
      >
        <FoodDay
          displayDate={displayDate}
          displayDayName={dayNames[dayOfWeek]}
        />
      </TableCell>
    )
  }

  return (
    <React.Fragment>
      <Typography className={classes.month}>
        {`${thisMonth.name} ${thisMonth.year}`}
      </Typography>
      {/* <TableContainer component={Paper} key={'weekTable'}> */}
      <TableContainer key={'weekTable'}>
        <Table size='small'>
          <TableBody>
            <TableRow>{days.slice(0, 4)}</TableRow>
            <TableRow>{[...days.slice(-3), <WeekSummary key='weekSummary' />]}</TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  )
}

const FoodDay = ({ displayDate, displayDayName }) => {
  const classes = useStyles()
  const renderRows = () => {
    let rows = []
    for (let i = 0; i <= 3; i++) {
      rows.push(
        <TableRow key={i}>
          <TableCell>test</TableCell>
          <TableCell>0</TableCell>
          <TableCell>0</TableCell>
          <TableCell>0</TableCell>
          <TableCell>0</TableCell>
        </TableRow>
      )
    }
    return rows
  }
  return (
    <TableContainer component={Paper} key={'weekTable'}>
      <Table size='small'>
        <TableHead className={classes.tableHead}>
          <TableRow colSpan={5}>
            <TableCell colSpan={5} className={classes.tableHead}>{displayDate} - {displayDayName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableHead}>Item</TableCell>
            <TableCell className={classes.tableHead}>Cals</TableCell>
            <TableCell className={classes.tableHead}>P(g)</TableCell>
            <TableCell className={classes.tableHead}>F(g)</TableCell>
            <TableCell className={classes.tableHead}>C(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableRow}>
          {/* temporary for dev */}
          {/* <TableRow>
            <TableCell>test</TableCell>
            <TableCell>0</TableCell>
            <TableCell>0</TableCell>
            <TableCell>0</TableCell>
            <TableCell>0</TableCell>
          </TableRow> */}
          {renderRows()}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const WeekSummary = () => {
  const classes = useStyles()
  return (
    <TableCell style={{ border: 'none'}}>
      <div style={{ minHeight: '20px', paddingBottom: '3px' }}>
        Weekly Summary 
      </div>
      <TableContainer
        component={Paper}
        key={'weekTable'}
        className={classes.summaryTable}
      >
        <Table size='small'>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell colSpan={4} className={classes.tableHead}>
                Daily Average
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableHead}>Cals</TableCell>
              <TableCell className={classes.tableHead}>P(%)</TableCell>
              <TableCell className={classes.tableHead}>F(%)</TableCell>
              <TableCell className={classes.tableHead}>C(%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableRow}>
            <TableRow>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </TableCell>
  )
}
