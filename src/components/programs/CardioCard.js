import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from 'context/ThemeContext'
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
  },
  container: {
    marginBottom: '10px'
  },
  th: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    textAlign: 'left'
  },
  td: {
    textAlign: 'left',
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
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.th}>
                {'name'}
              </TableCell>
              <TableCell className={classes.th}>{'description'}</TableCell>
              <TableCell className={classes.th}>{'targets'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell className={classes.td}>
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
