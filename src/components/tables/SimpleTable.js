import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { fade, makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import { IconButton, Paper, TextField } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever' 
import EditIcon from '@material-ui/icons/Edit' 

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  container: {
    marginBottom: '10px'
  },
  table: {
    backgroundColor: theme.color4.hex,
    color: theme.color4_text.hex
  },
  th: {
    backgroundColor: theme.color3.hex,
    color: theme.color3_text.hex,
    textAlign: 'left'
  },
  thLeft: {
    width: '10%'
  },
  td: {
    textAlign: 'left',
    color: theme.color4_text.hex
  },
  tdLeft: {
    width: '10%'
  },
  cardHeader: {
    padding: '6px 16px 0px 16px'
  },
  cardContent: {
    padding: '8px 16px 0px 16px'
  }
}))

//TODO: update table to use context instead of passing the props/data all around it.
const SimpleTable = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)

  const setupBlockHeader = (colCount, id, deleteItem, editItem) => {
    let item = { id: id, name: `set ${id}` }
    return (
      <TableRow key={Math.random()}>
        <TableCell colSpan={colCount} className={classes.th}>
        {item.name}
          <IconButton id={id} aria-label='Delete' onClick={() => editItem(id)}>
            <EditIcon color='inherit' fontSize='small' />
          </IconButton>
          <IconButton id={id} aria-label='Delete' onClick={() => deleteItem(id)}>
            <DeleteForeverIcon color='inherit' fontSize='small' />
          </IconButton>
        </TableCell>
    </TableRow>
    )
  }

  //TODO: can be cleaned up and refactored
  const renderRows = data => {
    let blockHeader = setupBlockHeader(
      data.headers.length + 1,
      data.setId,
      props.deleteItem,
      props.editItem
    )
    let tableHead = renderHeaders(blockHeader, data.headers)

    let tableBody = (
      <TableBody key={Math.random()}>
        {data.rows.map((row, index) => {
          let id = typeof row.id === 'undefined' ? index : row.id
          return (
            <TableRow id={id} data-setid={data.setId} key={index}>
              {renderRow(row, data.headers)}
            </TableRow>
          )
        })}
      </TableBody>
    )

    return [tableHead, tableBody]
  }

  const renderHeaders = (blockHeader, headers) => {
    return (
      <TableHead key={Math.random()}>
        {blockHeader}
        <TableRow key={headers.toString()}>
          {props.disabled === false ? <TableCell key={Math.random()} className={classes.th}></TableCell> : null }
          {headers.map( (header,index) => (
            index === 0 
            ? <TableCell key={`${header}-${index}`} className={classes.th}>{header}</TableCell>
            : <TableCell key={`${header}-${index}`} className={classes.th}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  // const deleteRow = event => {console.log(event)}

  // todo: need to give the exercise id
  const handleSetChange = event => {
    // get setId from tr (parentNode/td > parentNode/tr)
    let setId = event.target.parentNode.parentNode.dataset['setid']
    let id = event.target.id
    let name = event.target.name
    let value = event.target.value
    props.handleSetChange({ setId: setId, id: id, name: name, value: value })
  }

  const renderRow = (row, headers) => {
    // TODO: if props.disabled = false, then add delete icon (extra <td>)
    let tds = []
    if (!props.disabled) {
      tds.push(
        <TableCell
          className={`${classes.tdLeft} ${classes.td}`}
          key={Math.random()}
        >
          <IconButton id={row.id} aria-label='Delete' onClick={props.deleteRow}>
            <DeleteForeverIcon color='inherit' fontSize='small' />
          </IconButton>
        </TableCell>
      )
    }

    for (let i = 0; i < headers.length; i++) {
      tds.push(
        <TableCell className={classes.td} key={i}>
          <Input
            id={row.id}
            name={headers[i]}
            data={row[headers[i]]}
            onChange={handleSetChange}
            disabled={props.disabled}
          />
        </TableCell>
      )
    }
    return tds
  }

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} size='small'>
        {renderRows(props.data)}
      </Table>
    </TableContainer>
  )
}

const useStylesInput = makeStyles(theme => ({
  root: {
    color: theme.color1_text.hex,
    border: `1px solid ${theme.color3.hex}`,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: theme.color1.hex,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff'
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.color3.hex
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
      // label={props.name}
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

export default SimpleTable
