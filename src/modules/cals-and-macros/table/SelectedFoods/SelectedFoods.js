import React from "react";
import { Table } from "semantic-ui-react";
import SelectedFoodsRow from './SelectedFoodsRow';

const SelectedFoods = props => {

  const sumCals = foodList => {
    let sum = 0
    foodList.forEach( foodItem => {
      sum += Number(foodItem.calories)
    })
    return sum
  }
  const sumProtein = foodList => {
    let sum = 0
    foodList.forEach( foodItem => {
      sum += Number(foodItem.proteinGrams)
    })
    return sum
  }
  const sumCarbs = foodList => {
    let sum = 0
    foodList.forEach( foodItem => {
      sum += Number(foodItem.carbGrams)
    })
    return sum
  }
  const sumFat = foodList => {
    let sum = 0
    foodList.forEach( foodItem => {
      sum += Number(foodItem.fatGrams)
    })
    return sum
  }

  const macroCalcProtein = foodList => {
    if(foodList.length == 0){ return 0.0}
    let totalCals = sumCals(foodList)
    let multiplier = 4
    let totalGrams = 0
    foodList.forEach( foodItem => {
      totalGrams += Number(foodItem.proteinGrams)
    })

    let percent = (totalGrams * multiplier)/totalCals
    return percentageAsString(percent)
  }

  const macroCalcCarbs = foodList => {
    if(foodList.length == 0){ return 0.0}
    let totalCals = sumCals(foodList)
    let multiplier = 4
    let totalGrams = 0
    foodList.forEach( foodItem => {
      totalGrams += Number(foodItem.carbGrams)
    })

    let percentageAsDecimal = (totalGrams * multiplier)/totalCals
    // let percentageAsNumber = `${(percentageAsDecimal * 100).toFixed(1)}%`
    return percentageAsString(percentageAsDecimal)
  }

  const macroCalcFat = foodList => {
    if(foodList.length == 0){ return 0.0}
    let totalCals = sumCals(foodList)
    let multiplier = 9
    let totalGrams = 0
    foodList.forEach( foodItem => {
      totalGrams += Number(foodItem.fatGrams)
    })

    let percent = (totalGrams * multiplier)/totalCals
    return percentageAsString(percent)
  }

  const percentageAsString = percentageAsDecimal => {
    let percentageString = `${(percentageAsDecimal * 100).toFixed(1)}%`
    return percentageString
  }

  return (
    <Table celled >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>delete</Table.HeaderCell>
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

      <Table.Body>
        {props.foodList.map( (foodItem, index) => {
          return(
            <SelectedFoodsRow
              key={index}
              rowId={index}
              rowData={foodItem}
              rowDelete={props.rowDelete}
            />
          )
        })}
        {/* sums row */}
        <Table.Row>
          <Table.Cell colSpan={4} style={{backgroundColor:'#eee'}} />
          <Table.Cell style={{color:'orange'}}>{sumCals(props.foodList)}</Table.Cell>
          <Table.Cell style={{color:'orange'}}>{sumProtein(props.foodList)}</Table.Cell>
          <Table.Cell style={{color:'orange'}}>{sumCarbs(props.foodList)}</Table.Cell>
          <Table.Cell>'to-do'</Table.Cell>
          <Table.Cell>'to-do'</Table.Cell>
          <Table.Cell style={{color:'orange'}}>{sumFat(props.foodList)}</Table.Cell>
        </Table.Row>
        {/* macros row */}
        <Table.Row>
          <Table.Cell colSpan={4} style={{backgroundColor:'#eee'}} />
          <Table.Cell />
          <Table.Cell style={{color:'orange'}}>{macroCalcProtein(props.foodList)}</Table.Cell>
          <Table.Cell style={{color:'orange'}}>{macroCalcCarbs(props.foodList)}</Table.Cell>
          <Table.Cell>'to-do'</Table.Cell>
          <Table.Cell>'to-do'</Table.Cell>
          <Table.Cell style={{color:'orange'}}>{macroCalcFat(props.foodList)}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default SelectedFoods;
