import React, { useState, useEffect } from 'react'
import { retrieve } from '../../api/wodaysApi'
// import { makeStyles } from '@material-ui/core/styles'
// import ThemeContext from '../../context/ThemeContext'
import BasicSpinner from '../spinners/BasicSpinner'
import { Grid, Container } from '@material-ui/core'
import CalendarView from './CalendarView'

const WoDayList = props => {
  const [woDays, setWoDays] = useState([])
  const [forceSpinner, setForceSpinner] = useState(false)

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
      let aDate = new Date(`${a.date.month} ${a.date.day} ${a.date.year}`)
      let bDate = new Date(`${b.date.month} ${b.date.day} ${b.date.year}`)
      return aDate - bDate
    })
    wodays.reverse()
    return wodays
  }

  const handleSelect = id => {
    if (props.chooseWoDay) props.chooseWoDay(id)
  }

  const renderWoDays = woDays => {
    return (
      <Container style={{ padding: '25px' }}>
        <Grid container spacing={1}>
          <CalendarView items={woDays} onSelect={handleSelect} />
        </Grid>
      </Container>
    )
  }

  const showSpinner = () => {
    if (forceSpinner) return true
    return woDays.length === 0
  }

  return (
    <React.Fragment>
      <div style={{ maxWidth: '800px', margin: '0px auto' }}>
        {showSpinner() ? <BasicSpinner show={true} /> : renderWoDays(woDays)}
      </div>
    </React.Fragment>
  )
}

export default WoDayList
