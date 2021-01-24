import React, { useContext, useState } from 'react'
import { Input } from 'semantic-ui-react'
// import TextInput from '../../../inputs/TextInput'
import { Grid, TableCell, TableRow } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import ThemeContext from '../../../../context/ThemeContext'

const buttonStyle = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '2px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '12px',
  width: '1em',
  fontWeight: '700',
  lineHeight: '1em',
  margin: '2px 2px',
  borderRadius: '50%'
}

const useStyles = makeStyles(theme => ({
  tableContainer: {
    border: `1px solid`
  },
  cell: {
    border: '1px solid'
  },
  leadCell: {
    maxWidth: '25px'
  },
  qtyCell: {
    maxWidth: '200px'
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
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
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
    <StyledTableRow>
      {renderLeadCell(props.viewOnly)}
      <TableCell className={classes.cell}>
        {props.rowData.description}
      </TableCell>
      <TableCell className={classes.qtyCell}>
        <Grid container >
        <Grid item xs={8} sm={8}>
        <Input
          value={calcDefaultValue(props.rowData.quantity)}
          onChange={handleQtyChange}
          id={props.rowData.id}
          disabled={props.viewOnly}
        />
        </Grid>
        <Grid item xs={4} sm={4}>
          {renderTweakButtons(props.viewOnly)}
        </Grid>
        </Grid>
      </TableCell>
      <TableCell className={classes.cell}>{props.rowData.unit}</TableCell>
      <TableCell className={classes.cell}>{props.rowData.calories}</TableCell>
      <TableCell className={classes.cell}>
        {props.rowData.proteinGrams}
      </TableCell>
      <TableCell className={classes.cell}>{props.rowData.carbGrams}</TableCell>
      <TableCell className={classes.cell}>{0}</TableCell>
      <TableCell className={classes.cell}>{0}</TableCell>
      <TableCell className={classes.cell}>{props.rowData.fatGrams}</TableCell>
    </StyledTableRow>
  )
}

export default FoodRow
