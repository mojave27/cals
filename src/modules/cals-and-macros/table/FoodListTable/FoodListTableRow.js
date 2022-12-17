import React from 'react'
// import { Icon, Table } from 'semantic-ui-react'
import {TableCell, TableRow} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles'

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow)

const FoodListTableRow = props => {
  const rowClick = e => {
    const { onRowClick, rowId } = props
    onRowClick(rowId, e)
  };

  return (
    <StyledTableRow>
      <TableCell onClick={rowClick}><AddIcon /></TableCell>
      <TableCell>{props.rowData.description}</TableCell>
      <TableCell>{props.rowData.quantity}</TableCell>
      <TableCell>{props.rowData.unit}</TableCell>
      <TableCell>{props.rowData.calories}</TableCell>
      <TableCell>{props.rowData.proteinGrams}</TableCell>
      <TableCell>{props.rowData.fatGrams}</TableCell>
      <TableCell>{props.rowData.carbGrams}</TableCell>
      {/* <TableCell>{0}</TableCell> */}
    </StyledTableRow>
  );
};

export default FoodListTableRow;
