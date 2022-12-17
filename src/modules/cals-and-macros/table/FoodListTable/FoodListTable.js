import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FoodListTableRow from 'modules/cals-and-macros/table/FoodListTable/FoodListTableRow'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: '80%',
  },
  tableCell: {
    padding: '5px',
    color: theme.color3_text.hex,
    border: 0,
  },
  tableHeaderCell: {
    padding: '5px',
  },
}))

const FoodListTable = (props) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>description</TableCell>
            <TableCell>qty</TableCell>
            <TableCell>unit</TableCell>
            <TableCell>cals</TableCell>
            <TableCell>
              protein <i>g</i>
            </TableCell>
            <TableCell>
              fat <i>g</i>
            </TableCell>
            <TableCell>
              carb <i>g</i>
            </TableCell>
            {/* <TableCell>
              fiber <i>g</i>
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.foodList.map((foodItem, index) => {
              let found = props.selectedFoodItems.find((selectedFoodItem) => {
                return selectedFoodItem.description === foodItem.description
              })
              let selected = found ? 'true' : 'false'
              return (
                <FoodListTableRow
                  key={index}
                  rowId={index}
                  rowData={foodItem}
                  onRowClick={() => props.rowClick(foodItem.id)}
                  selected={selected}
                />
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

FoodListTable.defaultProps = {
  foodList: [],
  selectedFoodItems: [],
}

export default FoodListTable
