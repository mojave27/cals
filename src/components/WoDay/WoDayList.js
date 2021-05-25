import React, { useState, useEffect } from 'react'
import { retrieve } from '../../api/wodaysApi'
import { makeStyles } from '@material-ui/core/styles'
import BasicSpinner from '../spinners/BasicSpinner'
import { Card, CardHeader, Grid, Container } from '@material-ui/core'
import CalendarView from './CalendarView'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { isEmpty } from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  }
}))

const WoDayList = props => {
  const [woDays, setWoDays] = useState([])
  const [showSpinner, setShowSpinner] = useState(false)
  const isMobile = useMediaQuery('(max-width:768px)')

  useEffect(() => {
    async function fetchMyAPI() {
      let wodays = await retrieve()
      const sortedWodays = sortWoDays(wodays)
      setWoDays(sortedWodays)
    }
    fetchMyAPI()
  }, [])

  const sortWoDays = wodays => {
    wodays.sort(function(a, b) {
      let aDate = new Date(a.date.year, a.date.month, a.date.day)
      let bDate = new Date(b.date.year, b.date.month, b.date.day)
      return aDate - bDate
    })
    wodays.reverse()
    return wodays
  }

  const handleSelect = id => {
    setShowSpinner(true)
    if (props.chooseWoDay) props.chooseWoDay(id)
  }

  const show = () => {
    if (woDays.length === 0) return true
    if (showSpinner) return true
    return false
  }

  return (
    <Container style={{ padding: '25px' }}>
      <Grid container spacing={1} justify='center'>
        <BasicSpinner show={show()} />
        {isMobile ? (
          <MobileView woDays={woDays} onSelect={handleSelect} />
        ) : (
          <CalendarView items={woDays} onSelect={handleSelect} />
        )}
      </Grid>
    </Container>
  )
}

export default WoDayList

const workoutNames = item => {
// const workoutNames = woDay => {
  // let names = []
  // if (woDay.workouts.length === 0) return 'none'
  // woDay.workouts.forEach(wo => {
  //   names.push(wo.name)
  // })
  // return names.join(',')
  let names = []
  if (isEmpty(item.workouts) || item.workouts.length === 0) return 'none'
  item.workouts.forEach((wo) => {
    if (workoutStarted(wo)) {
      names.push(<font key={wo.name}>{wo.name}</font>)
    } else {
      // names.push(<Typography color='error' key={wo.name}>{`${wo.name}`}</Typography>)
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

const MobileView = props => {
  const classes = useStyles()

  const handleSelect = id => {
    if (props.onSelect) props.onSelect(id)
  }
  return props.woDays.map(woDay => {
    let date = `${Number(woDay.date.month) + 1}-${woDay.date.day}-${
      woDay.date.year
    }`
    return (
      undefined === woDay.wo ?
      // woDay.workouts.map( (wo,index) => {
      <Grid item xs={12} key={`${date}-${woDay.id}`}>
        <Card className={classes.root} onClick={() => handleSelect(woDay.id)}>
          <CardHeader
            title={date}
            subheader={workoutNames(woDay)}
          />
        </Card>
      </Grid>
      :
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
