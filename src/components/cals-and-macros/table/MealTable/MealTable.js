import React from 'react'
import { Table } from 'semantic-ui-react'
import FoodRow from './FoodRow'
import { calsPerGram } from '../../constants/nutrients'

const MealTable = props => {
  return (
    <Table compact celled selectable={!props.viewOnly}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>description</Table.HeaderCell>
          <Table.HeaderCell>Qty</Table.HeaderCell>
          <Table.HeaderCell>Unit</Table.HeaderCell>
          <Table.HeaderCell>Cals</Table.HeaderCell>
          <Table.HeaderCell>Protein Grams</Table.HeaderCell>
          <Table.HeaderCell>Carb Grams</Table.HeaderCell>
          <Table.HeaderCell>Fiber Grams</Table.HeaderCell>
          <Table.HeaderCell>Net Carb Grams</Table.HeaderCell>
          <Table.HeaderCell>Fat Grams</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{renderFoodRows(props)}</Table.Body>

      {props.foodList.length > 0 ? (
        <Table.Footer>
          <SummaryRow foodList={props.foodList} />
          <MacrosRow foodList={props.foodList} />
        </Table.Footer>
      ) : null}
    </Table>
  )
}

const renderFoodRows = props => {
  return (props.foodList.map((foodItem, index) => {
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
  }))
}

const SummaryRow = props => {
  return (
    <Table.Row>
      <Table.HeaderCell colSpan={4}>{'Totals'}</Table.HeaderCell>
      <Table.HeaderCell>{sumIt('calories', props.foodList)}</Table.HeaderCell>
      <Table.HeaderCell>{sumIt('proteinGrams', props.foodList)}</Table.HeaderCell>
      <Table.HeaderCell>{sumIt('carbGrams', props.foodList)}</Table.HeaderCell>
      <Table.HeaderCell>{'0'}</Table.HeaderCell>
      <Table.HeaderCell>{'0'}</Table.HeaderCell>
      <Table.HeaderCell>{sumIt('fatGrams', props.foodList)}</Table.HeaderCell>
    </Table.Row>
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
    let allVals = props.foodList.map(foodItem => {
      return foodItem[nutrientName]
    })
    var sum = allVals.reduce(function(accumulator, currentValue) {
      let tempSum = Number(accumulator) + Number(currentValue)
      return Number(tempSum)
    }, 0)
    const percentage =
      (sum.toFixed(2) * calsPerGram.get(nutrientName)) / totalCals
    return isNaN(percentage) ? 0 : Number.parseFloat(percentage * 100).toFixed(2)
  }

  return (
    <Table.Row>
      <Table.HeaderCell colSpan={5}>{'Macro Breakdown'}</Table.HeaderCell>
      <Table.HeaderCell>
        <span style={{ fontWeight: 'bold', color: 'red' }}>
          {percentIt('proteinGrams')} %
        </span>
      </Table.HeaderCell>
      <Table.HeaderCell>{percentIt('carbGrams')} %</Table.HeaderCell>
      <Table.HeaderCell>0 %</Table.HeaderCell>
      <Table.HeaderCell>{'0'} %</Table.HeaderCell>
      <Table.HeaderCell>
        <span style={{ fontWeight: 'bold', color: 'red' }}>
          {percentIt('fatGrams')} %
        </span>
      </Table.HeaderCell>
    </Table.Row>
  )
}

export default MealTable
