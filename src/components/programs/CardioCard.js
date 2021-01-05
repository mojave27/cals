import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from '../../context/ThemeContext'
import { Card, CardContent } from '@material-ui/core'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    // margin: 'auto'
  },
  container: {
    marginBottom: '10px'
  },
  table: {
    backgroundColor: theme.color4.hex
  },
  th: {
    backgroundColor: theme.color3.hex,
    color: theme.color3_text.hex,
    textAlign: 'left'
  },
  thLeft: {
    // width: '70%'
  },
  td: {
    textAlign: 'left',
    color: theme.color4_text.hex
  },
  tdLeft: {
    // width: '70%'
  },
  cardHeader: {
    padding: '6px 16px 0px 16px'
  },
  cardContent: {
    padding: '8px 16px 0px 16px'
  }
}))

const CardioCard = props => {
  let themeContext = useContext(ThemeContext)
  let classes = useStyles(themeContext)

  const renderTable = rows => {
    return (
      <TableContainer
        component={Paper}
        key={'cardioTable'}
      >
        <Table className={classes.table} size='small'>
          <TableHead>
            <TableRow>
              <TableCell className={`${classes.thLeft} ${classes.th}`}>
                {'name'}
              </TableCell>
              <TableCell className={classes.th}>{'description'}</TableCell>
              <TableCell className={classes.th}>{'targets'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell className={`${classes.tdLeft} ${classes.td}`}>
                  {row.name}
                </TableCell>
                <TableCell className={classes.td}>{row.description}</TableCell>
                <TableCell className={classes.td}>{row.targets}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <React.Fragment>
    <Card
      className={classes.root}
      style={{maxWidth:props.maxWidth}}
      variant="outlined"
      key={props.id}
    >
      <CardContent>
      {renderTable(props.data)}
      </CardContent>
      </Card>
    </React.Fragment>
  )
}

CardioCard.defaultProps = {
  id: 0,
  data: { headers: [], rows: [] },
  deleteRow: event => {
    console.log({ event })
  }
}

export default CardioCard
