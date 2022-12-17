import React, { useState } from 'react'
import { TableCell, TableRow, Input } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  tableContainer: {
    border: `1px solid`
  },
  cell: {
    lineHeight: '1.3125rem',
    fontSize: '0.85rem'
  },
  leadCell: {
    maxWidth: '25px'
  },
  qtyCell: {
    lineHeight: '1.3125rem',
    fontSize: '0.85rem',
    width: '150px',
    maxWidth: '200px'
  },
  qtyInput: {
    lineHeight: '1.3125rem',
    fontSize: '0.75rem'
  }
}))

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow)

const FoodRow = props => {
  const classes = useStyles()
  // eslint-disable-next-line no-unused-vars
  let [units, setUnits] = useState('grams')

  const rowDelete = e => {
    e.stopPropagation()
    props.rowDelete(e)
  }

  const calcDefaultValue = qty => {
    if (typeof qty === undefined) {
      return 100
    }
    let updatedQty = qty
    if (units === 'ounces') {
      updatedQty = (qty / 28.35) * 100
      updatedQty = Math.ceil(updatedQty) / 100
    }
    return updatedQty
  }

  const handleQtyChange = event => {
    let value = event.target.value
    console.log(`value before: ${value}`)
    if (units === 'ounces') {
      value = value * 28.35
    }
    console.log(`value after: ${value}`)
    props.onQuantityChange(event, value)
  }

  const renderLeadCell = viewOnly => {
    return viewOnly ? (
      <TableCell />
    ) : (
      <TableCell id={props.rowData.id} onClick={rowDelete}>
        <DeleteForeverIcon />
      </TableCell>
    )
  }

  return (
    <StyledTableRow>
      {renderLeadCell(props.viewOnly)}
      <TableCell className={classes.cell} size='small'>
        {props.rowData.description}
      </TableCell>
      <TableCell className={classes.qtyCell} size='small'>
        <Input
          className={classes.qtyInput}
          type='text'
          size='small'
          id={props.rowData.id.toString()}
          value={calcDefaultValue(props.rowData.quantity)}
          onChange={handleQtyChange}
          variant='outlined'
          disabled={props.viewOnly}
          inputProps={{ fontSize: '0.85rem' }}
        />
      </TableCell>
      <TableCell className={classes.cell} size='small'>{props.rowData.unit}</TableCell>
      <TableCell className={classes.cell} size='small'>{props.rowData.calories}</TableCell>
      <TableCell className={classes.cell} size='small'>
        {props.rowData.proteinGrams}
      </TableCell>
      <TableCell className={classes.cell} size='small'>{props.rowData.fatGrams}</TableCell>
      <TableCell className={classes.cell} size='small'>{props.rowData.carbGrams}</TableCell>
      {/* <TableCell className={classes.cell} size='small'>{0}</TableCell> */}
      {/* <TableCell className={classes.cell} size='small'>{0}</TableCell> */}
    </StyledTableRow>
  )
}

export default FoodRow
