import React, { useContext, useState, useEffect } from 'react'
import { retrieve } from '../../api/wodaysApi'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from '../../context/ThemeContext'
import BasicSpinner from '../spinners/BasicSpinner'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
    wodays.sort(function(a, b){
      let aDate = new Date(`${a.date.month} ${a.date.day} ${a.date.year}`) 
      let bDate = new Date(`${b.date.month} ${b.date.day} ${b.date.year}`) 
      return aDate-bDate
    });
    return wodays
  }

  const doStuff = id => {
    props.chooseWoDay(id)
  }

  const renderWoDays = woDays => {
    // let sortedWoDays = [...woDays]
    return (
      <div className={classes.tableContainer} >
      <Table className={classes.table} aria-label='simple table' size="small">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell}>Date</TableCell>
            <TableCell className={classes.tableCell}>Name</TableCell>
            <TableCell className={classes.tableCell}>Goals</TableCell>
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
                <TableCell component='th' scope='row' className={classes.tableCell}>
                  {date}
                </TableCell>
                <TableCell className={classes.tableCell}>{woName}</TableCell>
                <TableCell className={classes.tableCell}>{woDay.goals}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      </div>
    )
  }

  return (
    <React.Fragment>
      <div style={{ maxWidth: '800px', margin: '0px auto' }}>
        {woDays.length === 0 ? <BasicSpinner show={true} /> : renderWoDays(woDays)}
      </div>
    </React.Fragment>
  )
}

export default WoDayList
