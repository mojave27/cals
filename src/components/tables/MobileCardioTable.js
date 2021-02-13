import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { get } from 'lodash'
import { fade, makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core'

// const useStyles = makeStyles(context => ({
//   root: {
//     flexGrow: 1,
//     width: `${context.mobile === true ? '100%' : 'auto'}`
  // }
// }))

const StyledHeaderRow = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
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

const MobileCardioTable = props => {

  const renderMobileRows = row => {
    let id = get(row, 'id', 0)
    return (
      <React.Fragment key={`fragment-${row.id}`}>
        <StyledTableRow id={`${id}-row-type`}>
          <TableCell>{'type'}</TableCell>
          <TableCell>
            <Input
              id={`${row.id}-${'type'}`}
              name={'type'}
              data={row.type}
              onChange={handleCellChange}
              disabled={props.disabled}
            />
          </TableCell>
        </StyledTableRow>
        <StyledTableRow id={`${id}-row-distance`}>
          <TableCell>{'distance'}</TableCell>
          <TableCell>
            <Input
              id={`${row.id}-distance`}
              name={'distance'}
              data={row.distance}
              onChange={handleCellChange}
              disabled={props.disabled}
            />
          </TableCell>
        </StyledTableRow>
        <StyledTableRow id={`${id}-row-duration`}>
          <TableCell>{'duration'}</TableCell>
          <TableCell>
            <Input
              id={`${row.id}-duration`}
              name={'duration'}
              data={row.duration}
              onChange={handleCellChange}
              disabled={props.disabled}
            />
          </TableCell>
        </StyledTableRow>
        <StyledTableRow id={`${id}-row-heartRate`}>
          <TableCell>{'heart rate'}</TableCell>
          <TableCell>
            <Input
              id={`${row.id}-heartRate`}
              name={'heartRate'}
              data={row.heartRate}
              onChange={handleCellChange}
              disabled={props.disabled}
            />
          </TableCell>
        </StyledTableRow>
      </React.Fragment>
    )
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
      {props.data.rows.map((row, index) => {
        return (
          <Table key={index}>
            <TableHead>
              <StyledHeaderRow>
                <TableCell colSpan={2}>

                {'Cardio Exercise'}
        <IconButton aria-label='Delete' onClick={() => props.deleteRow(row.id)}>
          <DeleteForeverIcon color='inherit' fontSize='small' />
        </IconButton>
                </TableCell>
              </StyledHeaderRow>
            </TableHead>
            <TableBody>{renderMobileRows(row)}</TableBody>
          </Table>
        )
      })}
    </React.Fragment>
  )
}

MobileCardioTable.defaultProps = {
  id: 0,
  data: { headers: [], rows: [] },
  deleteRow: event => {
    console.log({ event })
  }
}

export default MobileCardioTable

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
  const inputClasses = useStylesInput()
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
