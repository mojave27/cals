import React, { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { camelCase, get } from 'lodash'
import { fade, makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core'
import ThemeContext from '../../context/ThemeContext'
import MobileCardioTable from './MobileCardioTable'

// const useStyles = makeStyles(context => ({
//   root: {
//     flexGrow: 1,
//     width: `${context.mobile === true ? '100%' : 'auto'}`
//   }
// }))

const StyledHeaderRow = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText
  }
}))(TableRow)

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow)

const CardioTable = props => {
  let themeContext = useContext(ThemeContext)
  // let classes = useStyles(themeContext)

  //TODO: can this be cleaned up and refactored?
  const renderRows = data => {
    let rows = data.rows.map((row, index) => {
      let id = get(row, 'id', index)
      return (
        <StyledTableRow id={id} key={index}>
          {renderRow(row, data.headers)}
        </StyledTableRow>
      )
    })
    return rows
  }

  const renderRow = (row, headers) => {
    let tds = []
    let j = 1
    // add the delete button
    tds.push(
      <TableCell key={`${row.id}-delete`}>
        <IconButton aria-label='Delete' onClick={() => props.deleteRow(row.id)}>
          <DeleteForeverIcon color='inherit' fontSize='small' />
        </IconButton>
      </TableCell>
    )

    for (let i = j; i < headers.length; i++) {
      tds.push(
        <TableCell key={i}>
          <Input
            id={`${row.id}-${i}`}
            name={headers[i]}
            data={row[camelCase(headers[i])]}
            onChange={handleCellChange}
            disabled={props.disabled}
          />
        </TableCell>
      )
    }
    return tds
  }

  // todo: need to give the exercise id
  const handleCellChange = event => {
    let id = event.target.id
    let name = event.target.name
    let value = event.target.value

    props.onChange({
      id: id,
      name: name,
      value: value
    })
  }

  return (
    <React.Fragment>
      <Button
        size='small'
        onClick={props.addCardioExercise}
        variant='contained'
      >
        {'Add Exercise'}
      </Button>
      {themeContext.mobile === true ? (
        <MobileCardioTable {...props} />
      ) : (
        <Table>
          <TableHead>
            <StyledHeaderRow key={props.data.headers}>
              {props.data.headers.map((header, index) => (
                <TableCell key={`${header}-${index}`}>{header}</TableCell>
              ))}
            </StyledHeaderRow>
          </TableHead>
          <TableBody>{renderRows(props.data)}</TableBody>
        </Table>
      )}
    </React.Fragment>
  )
}

CardioTable.defaultProps = {
  id: 0,
  data: { headers: [], rows: [] },
  deleteRow: event => {
    console.log({ event })
  }
}

export default CardioTable

const useStylesInput = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    borderRadius: 4,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&$focused': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`
    }
  },
  focused: {}
}))

const Input = props => {
  const themeContext = useContext(ThemeContext)
  const inputClasses = useStylesInput(themeContext.theme)
  return (
    <TextField
      id={props.id}
      name={props.name}
      value={props.data ? props.data : ''}
      type='text'
      InputProps={{ classes: inputClasses }}
      InputLabelProps={{
        shrink: true,
        color: 'inherit'
      }}
      variant='outlined'
      onChange={props.onChange}
      size='small'
    />
  )
}
