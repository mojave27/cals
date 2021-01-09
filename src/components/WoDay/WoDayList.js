import React, { useContext, useState, useEffect } from 'react'
import { retrieve } from '../../api/wodaysApi'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from '../../context/ThemeContext'
import BasicSpinner from '../spinners/BasicSpinner'
import { Card, CardHeader, Grid, Container } from '@material-ui/core'
import CalendarView from './CalendarView'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  }
}))

const WoDayList = props => {
  const [woDays, setWoDays] = useState([])

  const isMobile = useMediaQuery('(max-width:768px)');

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
    if (props.chooseWoDay) props.chooseWoDay(id)
  }

  const renderWoDays = woDays => {
    return (
      <Container style={{ padding: '25px' }}>
        <Grid container spacing={1} justify='center'>
          {isMobile 
           ? <MobileView woDays={woDays} onSelect={handleSelect} />
           : <CalendarView items={woDays} onSelect={handleSelect} />
          }
        </Grid>
      </Container>
    )
  }

  const showSpinner = () => {
    return woDays.length === 0
  }

  return showSpinner() ? <BasicSpinner show={true} /> : renderWoDays(woDays)
}

export default WoDayList

const MobileView = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)

  const handleSelect = id => {
    if (props.onSelect) props.onSelect(id)
  }
  return props.woDays.map(woDay => {
    let date = `${Number(woDay.date.month) + 1}-${woDay.date.day}-${
      woDay.date.year
    }`
    return (
      <Grid item xs={12} sm={4} key={`${date}-${woDay.id}`}>
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
