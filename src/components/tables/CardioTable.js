/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import { camelCase, get } from 'lodash'
import { woDayStyles } from '../../styles/WoDayStyles'
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

const useStyles = makeStyles(context => ({
  root: {
    flexGrow: 1,
    width: `${context.mobile === true ? '100%' : 'auto'}`
  }
}))

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
  let { woTable } = woDayStyles(themeContext.theme)
  let classes = useStyles(themeContext)

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

  const renderMobileRows = row => {
    let id = get(row, 'id', 0)
    return (
      <React.Fragment key={`fragment-${row.id}`}>
        <tr id={`${id}-header`}>
          <th colSpan={2}>Cardio Exercise</th>
        </tr>
        <tr id={`${id}-row-type`}>
          <td>{'type'}</td>
          <td>
            <Input
              id={`${row.id}-${'type'}`}
              name={'type'}
              data={row.type}
              onChange={handleCellChange}
              disabled={props.disabled}
            />
          </td>
        </tr>
        <tr id={`${id}-row-distance`}>
          <td>{'distance'}</td>
          <td>
            <Input
              id={`${row.id}-distance`}
              name={'distance'}
              data={row.distance}
              onChange={handleCellChange}
              disabled={props.disabled}
            />
          </td>
        </tr>
        <tr id={`${id}-row-duration`}>
          <td>{'duration'}</td>
          <td>
            <Input
              id={`${row.id}-duration`}
              name={'duration'}
              data={row.duration}
              onChange={handleCellChange}
              disabled={props.disabled}
            />
          </td>
        </tr>
        <tr id={`${id}-row-heartRate`}>
          <td>{'heart rate'}</td>
          <td>
            <Input
              id={`${row.id}-heartRate`}
              name={'heartRate'}
              data={row.heartRate}
              onChange={handleCellChange}
              disabled={props.disabled}
            />
          </td>
        </tr>
      </React.Fragment>
    )
  }

  const renderHeaders = headers => {
    return (
      <tr key={headers}>
        {headers.map((header, index) => (
          <th key={`${header}-${index}`}>{header}</th>
        ))}
      </tr>
    )
  }

  const renderRow = (row, headers) => {
    let tds = []
    let j = 1
    // add the delete button
    tds.push(
      <TableCell key={`${row.id}-delete`}>
        <Button
          id={`${row.id}-${j}`}
          size='small'
          onClick={props.deleteRow}
          variant='contained'
        >
          {'delete'}
        </Button>
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

  const renderMobile = props => {
    return props.data.rows.map((row, index) => {
      return (
        <table
          style={{ paddingBottom: '10px' }}
          css={woTable}
          key={`table-${index}`}
        >
          <tbody id={props.id}>{renderMobileRows(row)}</tbody>
        </table>
      )
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
        renderMobile(props)
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
