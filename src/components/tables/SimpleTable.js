import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { fade, makeStyles, withStyles } from '@material-ui/core/styles'
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
  },
  th: {
    textAlign: 'left'
  },
  thLeft: {
    width: '10%'
  },
  td: {
    textAlign: 'left',
  },
  tdLeft: {
    width: '10%'
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  cardHeader: {
    padding: '6px 16px 0px 16px'
  },
  cardContent: {
    padding: '8px 16px 0px 16px'
  }
}))

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow)

const SubHeaderTableRow = withStyles(theme => ({
  root: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText
  }
}))(TableRow)

//TODO: update table to use context instead of passing the props/data all around it.
const SimpleTable = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)

  const setupBlockHeader = (colCount, id, deleteItem, editItem) => {
    let item = { id: id, name: `set ${id}` }
    return (
      <TableRow key={Math.random()} className={classes.header}>
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
            <StyledTableRow id={id} data-setid={data.setId} key={index}>
              {renderRow(row, data.headers)}
            </StyledTableRow>
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
        <SubHeaderTableRow key={headers.toString()}>
          {props.disabled === false ? <TableCell key={Math.random()} className={classes.th}></TableCell> : null }
          {headers.map( (header,index) => (
            index === 0 
            ? <TableCell key={`${header}-${index}`} className={classes.th}>{header}</TableCell>
            : <TableCell key={`${header}-${index}`} className={classes.th}>{header}</TableCell>
          ))}
        </SubHeaderTableRow>
      </TableHead>
    )
  }

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
    overflow: 'hidden',
    borderRadius: 4,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // '&:hover': {
    //   backgroundColor: theme.palette.primary.light
    // },
    '&$focused': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
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

export default SimpleTable
