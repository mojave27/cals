import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BasicSpinner from '../spinners/BasicSpinner'
import IconButton from '@material-ui/core/IconButton'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import { deleteWoDay, retrieveWoDayById } from 'api/wodaysApi'
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Container,
  Switch,
  Typography,
  CardActions
} from '@material-ui/core'
import CalendarView from './CalendarView'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { isEmpty } from 'lodash'
import { removeItemById } from 'components/modules/common/utilties/ArrayUtils'
import WoDayContext from 'context/WoDayContext'
import { convertExistingWodayToNew, sleep } from './Utils'
import { WODAY_PATH } from '../../constants'
import { navigate } from '@reach/router'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
}))

const WoDayList = (props) => {
  const isMobile = useMediaQuery('(max-width:768px)')
  let woDayContext = useContext(WoDayContext)

  const removeWoDay = (wodayId) => {
    let updatedWoDays = woDayContext.copyWoDays()
    removeItemById(wodayId, updatedWoDays)
    woDayContext.updateWoDays(updatedWoDays)
  }

  const handleSelect = (id) => {
    if (props.chooseWoDay) props.chooseWoDay(id)
  }

  const show = () => {
    return woDayContext.wodays.length === 0
  }

  return (
    <Container style={{ padding: '25px' }}>
      <Grid container spacing={1} justify='center'>
        <BasicSpinner show={show()} />
        {isMobile ? (
          <MobileView
            woDays={woDayContext.wodays}
            onSelect={handleSelect}
            onDelete={removeWoDay}
          />
        ) : (
          <DesktopView
            wodays={woDayContext.wodays}
            onSelect={handleSelect}
            onDelete={removeWoDay}
          />
        )}
      </Grid>
    </Container>
  )
}

export default WoDayList

const DesktopView = props => {
  const [checked, setChecked] = useState(true)
  const toggleViewSwitch = () => {
    setChecked(!checked)
  }
  return (
    <React.Fragment>
      <ViewSwitch checked={checked} handleChange={toggleViewSwitch} />
      {!checked ? (
        <MobileView woDays={props.wodays} onSelect={props.onSelect} />
      ) : (
        <CalendarView
          items={props.wodays}
          onSelect={props.onSelect}
          onDelete={props.removeWoDay}
        />
      )}
    </React.Fragment>
  )
}

const ViewSwitch = (props) => {
  return (
    <Typography>
      <Grid component='label' container alignItems='center' spacing={1}>
        <Grid item>List</Grid>
        <Grid item>
          <Switch
            checked={props.checked}
            onChange={props.handleChange}
            name='checked'
          />
        </Grid>
        <Grid item>Calendar</Grid>
      </Grid>
    </Typography>
  )
}

const workoutNames = (item) => {
  let names = []
  if (isEmpty(item.workouts) || item.workouts.length === 0) return 'none'
  item.workouts.forEach((wo) => {
    if (workoutStarted(wo)) {
      names.push(<font key={wo.name}>{wo.name}</font>)
    } else {
      names.push(<font color='pink' key={wo.name}>{`${wo.name}`}</font>)
    }
  })
  return names
}

const workoutStarted = (wo) => {
  let isStarted = false
  if (isEmpty(wo.sets)) return false
  wo.sets.forEach((set) => {
    if (isEmpty(set.exerciseGroups)) return false
    set.exerciseGroups.forEach((exGroup) => {
      exGroup.exercises.forEach((ex) => {
        if (!isEmpty(ex.reps) && Number(ex.reps) !== 0) isStarted = true
      })
    })
  })
  return isStarted
}

const MobileView = (props) => {
  let woDayContext = useContext(WoDayContext)
  const classes = useStyles()
  // const [showSpinner, setShowSpinner] = useState(false)

  const toggleSpinner = async (show) => {
    console.log(`setting spinner to ${show}`)
    // await setShowSpinner(show)
  }

  const handleSelect = async (id) => {
    console.log(`selecting id ${id}`)
    await toggleSpinner(true)
    props.onSelect(id)
    await sleep(2000)
    await toggleSpinner(false)
  }

  const sortWoDays = wodays => {
    return wodays.sort(
      (a, b) => {
        const aDate = `${fixNum(a.date.year)}-${fixNum(a.date.month)}-${fixNum(a.date.day)}` 
        const bDate = `${fixNum(b.date.year)}-${fixNum(b.date.month)}-${fixNum(b.date.day)}`
        console.log(`comparing ${aDate} to ${bDate}`)
        // reverse sort
        var result = aDate < bDate ? 1 : aDate > bDate ? -1 : 0
        return result
      }
    )
  }

  const fixNum = num => {
    if (num.toString().length < 2 ) return `0${num}`
    return num
  }

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
  // return (
  //     <BasicSpinner show={showSpinner} />
  //     {

  //     }
  // )
  return sortWoDays(props.woDays).map((woDay) => {
    let date = `${Number(woDay.date.month) + 1}-${woDay.date.day}-${
      woDay.date.year
    }`
    return undefined === woDay.wo ? (
      <Grid item xs={12} key={`${date}-${woDay.id}`}>
        <Card className={classes.root} onClick={() => handleSelect(woDay.id)}>
          <CardContent>
          <CardHeader title={date} subheader={workoutNames(woDay)} />
          <CardActions classes={{root: classes.cardActions }}>
          <IconButton aria-label='Copy' onClick={() => handleSelect(woDay.id)}>
            <PlayCircleOutlineIcon color='inherit' fontSize='small' />
          </IconButton>
          <IconButton aria-label='Copy' onClick={() => doStuff(woDay.id)}>
            <FileCopyIcon color='inherit' fontSize='small' />
          </IconButton>
          <IconButton aria-label='Copy' onClick={() => deleteStuff(woDay.id)}>
            <DeleteForeverIcon color='inherit' fontSize='small' />
          </IconButton>
        </CardActions></CardContent>
        </Card>
      </Grid>
    ) : (
      <Grid item xs={12} key={`${date}-${woDay.id}`}>
        <Card className={classes.root} onClick={() => handleSelect(woDay.id)}>
          <CardHeader
            title={date}
            subheader={woDay.wo.name ? woDay.wo.name : 'none'}
          />
        </Card>
      </Grid>
    )
  })
}
