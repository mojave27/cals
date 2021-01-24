import React, { useState } from 'react'
import { Input } from 'semantic-ui-react'
import { TableCell, TableRow } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { withStyles } from '@material-ui/core/styles'

const buttonStyle = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '2px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  width: '1.2em',
  fontWeight: '700',
  lineHeight: '1em',
  margin: '4px 4px',
  borderRadius: '50%'
}

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow)

const FoodRow = props => {
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

  const tweakUp = event => {
    const rowid = event.target.dataset.rowid
    props.tweakUp(rowid)
  }

  const tweakDown = event => {
    const rowid = event.target.dataset.rowid
    props.tweakDown(rowid)
  }

  const renderTweakButtons = viewOnly => {
    if (viewOnly) {
      return null
    } else {
      return (
        <div>
          <button
            data-rowid={props.rowData.id}
            style={buttonStyle}
            onClick={tweakDown}
          >
            -
          </button>
          {'tweak'}
          <button
            data-rowid={props.rowData.id}
            style={buttonStyle}
            onClick={tweakUp}
          >
            +
          </button>
        </div>
      )
    }
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
    // <TableRow active={props.rowData.active}>
    <StyledTableRow >
      {renderLeadCell(props.viewOnly)}
      <TableCell>{props.rowData.description}</TableCell>
      <TableCell>
        <Input
          value={calcDefaultValue(props.rowData.quantity)}
          onChange={handleQtyChange}
          id={props.rowData.id}
          disabled={props.viewOnly}
        />
        {renderTweakButtons(props.viewOnly)}
      </TableCell>
      <TableCell>{props.rowData.unit}</TableCell>
      <TableCell>{props.rowData.calories}</TableCell>
      <TableCell>{props.rowData.proteinGrams}</TableCell>
      <TableCell>{props.rowData.carbGrams}</TableCell>
      <TableCell>{0}</TableCell>
      <TableCell>{0}</TableCell>
      <TableCell>{props.rowData.fatGrams}</TableCell>
    </StyledTableRow>
  )
}

export default FoodRow
