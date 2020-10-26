import React, { useState, useEffect } from 'react'
import { retrieve } from '../../api/wodaysApi'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
// import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  }
}))

const WoDayList = props => {
  const [woDays, setWoDays] = useState([])
  const classes = useStyles()

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await retrieve()
      console.log(response)
      setWoDays(response)
    }
    fetchMyAPI()
  }, [])

  const doStuff = id => {
    console.log(`doing stuff with ${id}`)
    props.chooseWoDay(id)
  }

  const renderWoDays = woDays => {
    return woDays.map(woDay => {
      let date = `${Number(woDay.date.month) + 1}-${woDay.date.day}-${
        woDay.date.year
      }`
      let woName = woDay.wo.name ? woDay.wo.name : ''
      return (
        <Grid
          key={`${date}-${woDay.id}`}
          item
          onClick={() => doStuff(woDay.id)}
        >
          <Paper className={classes.paper}>
            {date} / {woName}
          </Paper>
        </Grid>
      )
    })
  }

  return (
    <Container maxWidth='sm'>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            {renderWoDays(woDays)}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default WoDayList
