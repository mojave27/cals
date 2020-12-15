import React, { useContext, useState, useEffect } from 'react'
import { retrieve } from '../../api/wodaysApi'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from '../../context/ThemeContext'
import BasicSpinner from '../spinners/BasicSpinner'
import { basicButton } from '../../styles/Styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.color2_text.hex,
    backgroundColor: theme.color2.hex,
    margin: '3px'
  },
  basicButton: basicButton(theme)
}))

const WoDayList = props => {
  const [woDays, setWoDays] = useState([])
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)

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

  const doStuff = id => {
    props.chooseWoDay(id)
  }

  const renderWoDays = woDays => {
    // let sortedWoDays = [...woDays]
    return (
      <Grid container spacing={1}>
        {woDays.map(woDay => {
          let date = `${Number(woDay.date.month) + 1}-${woDay.date.day}-${
            woDay.date.year
          }`
          let woName = woDay.wo.name ? woDay.wo.name : ''
          return (
            <Grid item xs={12} sm={12} key={`${date}-${woDay.id}`}>
              <Paper
                className={classes.paper}
                onClick={() => doStuff(woDay.id)}
              >
                {date}-{woName}-{woDay.goals}
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    )
  }

  return (
    <React.Fragment>
      <div style={{ maxWidth: '800px', margin: '0px auto' }}>
        {woDays.length === 0 ? (
          <BasicSpinner show={true} />
        ) : (
          renderWoDays(woDays)
        )}
      </div>
    </React.Fragment>
  )
}

export default WoDayList
