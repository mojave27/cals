import React from 'react'
import PropTypes from 'prop-types'
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableFooter,
  Typography
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import FoodRow from 'modules/cals-and-macros/table/MealTable/FoodRow'
import { calsPerGram } from 'modules/cals-and-macros/constants/nutrients'

const StyledHeaderRow = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText
  }
}))(TableRow)

const useStyles = makeStyles(theme => ({
  tableContainer: props => ({
    width: props.width,
    border: `1px solid ${theme.palette.primary.main}`,
  })
}))

const MealTable = props => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles(props)

  const headers = [
    '',
    <Typography variant='body2'>description</Typography>,
    <Typography variant='body2'>qty</Typography>,
    <Typography variant='body2'>unit</Typography>,
    <Typography variant='body2'>cals</Typography>,
    <Typography variant='body2'>p <i>g</i></Typography>,
    <Typography variant='body2'>f <i>g</i></Typography>,
    <Typography variant='body2'>c <i>g</i></Typography>,
    <Typography variant='body2'>fiber</Typography>,
    <Typography variant='body2'>net c <i>g</i></Typography>
  ]

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table size={'small'}>
        <TableHead>
          <StyledHeaderRow>
            {headers.map((header,index) => {
              return(<TableCell key={`${header}-${index}`}>{header}</TableCell>)
            })}
          </StyledHeaderRow>
        </TableHead>

        <TableBody>{renderFoodRows(props)}</TableBody>

          <TableFooter>
            <SummaryRow foodList={props.foodList} />
            <MacrosRow foodList={props.foodList} />
          </TableFooter>
      </Table>
    </TableContainer>
  )
}

const renderFoodRows = props => {
  return props.foodList.map((foodItem, index) => {
    return (
      <FoodRow
        key={index}
        rowId={index}
        rowData={foodItem}
        onClick={props.rowClick}
        rowDelete={props.rowDelete}
        onSelect={props.rowSelect}
        onQuantityChange={props.onQuantityChange}
        tweakUp={props.tweakUp}
        tweakDown={props.tweakDown}
        viewOnly={props.viewOnly}
      />
    )
  })
}

const SummaryRow = props => {
  return (
    <TableRow>
      <TableCell colSpan={4}>{'Totals'}</TableCell>
      <TableCell>{sumIt('calories', props.foodList)}</TableCell>
      <TableCell>{sumIt('proteinGrams', props.foodList)}</TableCell>
      <TableCell>{sumIt('fatGrams', props.foodList)}</TableCell>
      <TableCell>{sumIt('carbGrams', props.foodList)}</TableCell>
      <TableCell>{sumIt('fiberGrams', props.foodList)}</TableCell>
      <TableCell>{sumIt('netCarbGrams', props.foodList)}</TableCell>
    </TableRow>
  )
}

const sumIt = (nutrientName, foodList) => {
  let allVals = foodList.map(foodItem => {
    return foodItem[nutrientName]
  })
  var sum = allVals.reduce(function(accumulator, currentValue) {
    return Number(accumulator) + Number(currentValue)
  }, 0)
  return Number.parseFloat(sum).toFixed(1)
}

const MacrosRow = props => {
  const percentIt = nutrientName => {
    const totalCals = sumIt('calories', props.foodList)
    //get all matching values from foodlist
    let allVals = props.foodList.map(foodItem => {
      return foodItem[nutrientName]
    })
    //sum up the matching values
    var sum = allVals.reduce(function(accumulator, currentValue) {
      let tempSum = Number(accumulator) + Number(currentValue)
      return Number(tempSum)
    }, 0)
    //percentage
    const percentage = (sum.toFixed(2) * calsPerGram.get(nutrientName)) / totalCals
    return isNaN(percentage)
      ? 0
      : Number.parseFloat(percentage * 100).toFixed(2)
  }

  return (
    <TableRow>
      <TableCell colSpan={5}>{'Macro Breakdown'}</TableCell>
      <TableCell>
        <span style={{ fontWeight: 'bold', color: 'red' }}>
          {percentIt('proteinGrams')} %
        </span>
      </TableCell>
      <TableCell>
        <span style={{ fontWeight: 'bold', color: 'red' }}>
          {percentIt('fatGrams')} %
        </span>
      </TableCell>
      <TableCell>{percentIt('carbGrams')} %</TableCell>
      <TableCell>{percentIt('fiberGrams')} %</TableCell>
      <TableCell>{percentIt('netCarbGrams')} %</TableCell>
    </TableRow>
  )
}

MealTable.propTypes = {
  width: PropTypes.string
}

MealTable.defaultProps = {
  width: '100%'
}

export default MealTable
