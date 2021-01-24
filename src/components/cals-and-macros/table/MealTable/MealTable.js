import React from 'react'
// import { Table } from 'semantic-ui-react'
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableFooter
} from '@material-ui/core'
import FoodRow from './FoodRow'
import { calsPerGram } from '../../constants/nutrients'

const MealTable = props => {
  return (
    <TableContainer>
      <Table size={'small'}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>description</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Cals</TableCell>
            <TableCell>Protein Grams</TableCell>
            <TableCell>Carb Grams</TableCell>
            <TableCell>Fiber Grams</TableCell>
            <TableCell>Net Carb Grams</TableCell>
            <TableCell>Fat Grams</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>{renderFoodRows(props)}</TableBody>

        {props.foodList.length > 0 ? (
          <TableFooter>
            <SummaryRow foodList={props.foodList} />
            <MacrosRow foodList={props.foodList} />
          </TableFooter>
        ) : null}
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
      <TableCell>{sumIt('carbGrams', props.foodList)}</TableCell>
      <TableCell>{'0'}</TableCell>
      {/* <TableCell>{'0'}</TableCell> */}
      <TableCell>{calcNetCarbs(props.foodList)}</TableCell>
      <TableCell>{sumIt('fatGrams', props.foodList)}</TableCell>
    </TableRow>
  )
}

const calcNetCarbs = foodList => {
  let carbs = sumIt('carbGrams', foodList)
  let fiber = sumIt('fiberGrams', foodList)
  return (Number(carbs) - Number(fiber)).toFixed(1)
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
    // 
    const percentage =
      (sum.toFixed(2) * calsPerGram.get(nutrientName)) / totalCals
    if(nutrientName === 'fiberGrams') {
      console.log(allVals)
      console.log(sum)
      console.log(percentage)
    }
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
      <TableCell>{percentIt('carbGrams')} %</TableCell>
      <TableCell>0 %</TableCell>
      <TableCell>{percentIt('fiberGrams')} %</TableCell>
      {/* <TableCell>{'0'} %</TableCell> */}
      <TableCell>
        <span style={{ fontWeight: 'bold', color: 'red' }}>
          {percentIt('fatGrams')} %
        </span>
      </TableCell>
    </TableRow>
  )
}

export default MealTable
