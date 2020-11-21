import React, { useContext, useState, useEffect } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { retrieve } from '../../api/wodaysApi'
import BasicSpinner from '../spinners/BasicSpinner'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
// import Paper from '@material-ui/core/Paper'

import ThemeContext from '../../context/ThemeContext'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  }
}))

const WoDayList = props => {
  const [woDays, setWoDays] = useState([])
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await retrieve()
      // console.log(response)
      setWoDays(response)
    }

    fetchMyAPI()
  }, [])

  const doStuff = id => {
    console.log(`doing stuff with ${id}`)
    props.chooseWoDay(id)
  }

  const renderWoDays = woDays => {
    // let sortedWoDays = [...woDays]
    return (
      // <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table' size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            {/* <TableCell>ID</TableCell> */}
            <TableCell>Goals</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {woDays.map(woDay => {
            let date = `${Number(woDay.date.month) + 1}-${woDay.date.day}-${
              woDay.date.year
            }`
            let woName = woDay.wo.name ? woDay.wo.name : ''
            return (
              <TableRow
                key={`${date}-${woDay.id}`}
                onClick={() => doStuff(woDay.id)}
              >
                <TableCell component='th' scope='row'>
                  {date}
                </TableCell>
                <TableCell>{woName}</TableCell>
                {/* <TableCell>{woDay.id}</TableCell> */}
                <TableCell>{woDay.goals}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      // </TableContainer>
    )
  }

  return (
    <React.Fragment>
      <div style={{ maxWidth: '500px', margin: '0px auto' }}>
        {woDays.length === 0 ? <BasicSpinner /> : renderWoDays(woDays)}
      </div>
    </React.Fragment>
  )
}

export default WoDayList
