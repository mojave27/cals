import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BasicSpinner from '../spinners/BasicSpinner'
import { Card, CardHeader, Grid, Container } from '@material-ui/core'
import CalendarView from './CalendarView'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { isEmpty } from 'lodash'
import { removeItemById } from 'components/modules/common/utilties/ArrayUtils'
import WoDayContext from 'context/WoDayContext'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  }
}))

const WoDayList = props => {
  const [showSpinner, setShowSpinner] = useState(false)
  const isMobile = useMediaQuery('(max-width:768px)')
  let woDayContext = useContext(WoDayContext)

  const removeWoDay = wodayId => {
    let updatedWoDays = woDayContext.copyWoDays()
    removeItemById(wodayId, updatedWoDays)
    woDayContext.updateWoDays(updatedWoDays)
  }

  const handleSelect = id => {
    setShowSpinner(true)
    if (props.chooseWoDay) props.chooseWoDay(id)
  }

  const show = () => {
    if (woDayContext.wodays.length === 0) return true
    if (showSpinner) return true
    return false
  }

  return (
    <Container style={{ padding: '25px' }}>
      <Grid container spacing={1} justify='center'>
        <BasicSpinner show={show()} />
        {isMobile ? (
          <MobileView woDays={woDayContext.wodays} onSelect={handleSelect} />
        ) : (
          <CalendarView items={woDayContext.wodays} onSelect={handleSelect} onDelete={removeWoDay} />
        )}
      </Grid>
    </Container>
  )
}

export default WoDayList

const workoutNames = item => {
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
