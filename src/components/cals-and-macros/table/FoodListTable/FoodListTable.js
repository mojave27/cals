import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FoodListTableRow from './FoodListTableRow'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import ThemeContext from '../../../../context/ThemeContext'

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: '80%'
  },
  tableCell: {
    padding: '5px',
    color: theme.color3_text.hex,
    border: 0
  },
  tableHeaderCell: {
    padding: '5px'
  }
}))

// const StyledTableRow = withStyles(theme => ({
//   root: {
//     '&:nth-of-type(odd)': {
//       backgroundColor: theme.palette.action.hover
//     }
//   }
// }))(TableRow)

const FoodListTable = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>description</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Cals</TableCell>
            <TableCell>Protein Grams</TableCell>
            <TableCell>Carb Grams</TableCell>
            <TableCell>Fiber Grams</TableCell>
            <TableCell>Fat Grams</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.foodList.map((foodItem, index) => {
            let found = props.selectedFoodItems.find(selectedFoodItem => {
              return selectedFoodItem.description === foodItem.description
            })
            let selected = found ? 'true' : 'false'
            return (
              <FoodListTableRow
                key={index}
                rowId={index}
                rowData={foodItem}
                onRowClick={props.rowClick}
                selected={selected}
              />
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
    // <Table celled >
    //   <Table.Header>
    //     <Table.Row>
    //       <Table.HeaderCell />
    //       <Table.HeaderCell>description</Table.HeaderCell>
    //       <Table.HeaderCell>Qty</Table.HeaderCell>
    //       <Table.HeaderCell>Unit</Table.HeaderCell>
    //       <Table.HeaderCell>Cals</Table.HeaderCell>
    //       <Table.HeaderCell>Protein Grams</Table.HeaderCell>
    //       <Table.HeaderCell>Carb Grams</Table.HeaderCell>
    //       <Table.HeaderCell>Fiber Grams</Table.HeaderCell>
    //       <Table.HeaderCell>Fat Grams</Table.HeaderCell>
    //     </Table.Row>
    //   </Table.Header>

    //   <Table.Body>
    //     {props.foodList.map( (foodItem, index) => {
    //       let found = props.selectedFoodItems.find( selectedFoodItem => {
    //         return selectedFoodItem.description === foodItem.description
    //       })
    //       let selected =  found ? 'true' : 'false';
    //       return(
    //         <FoodListTableRow
    //           key={index}
    //           rowId={index}
    //           rowData={foodItem}
    //           onRowClick={props.rowClick}
    //           selected={selected}
    //         />
    //       )
    //     })}
    //   </Table.Body>
    // </Table>
  )
}

FoodListTable.defaultProps = {
  foodList: [],
  selectedFoodItems: []
}

export default FoodListTable
