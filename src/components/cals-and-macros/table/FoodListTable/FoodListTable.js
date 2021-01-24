import React from "react";
import { Table } from "semantic-ui-react";
import FoodListTableRow from './FoodListTableRow';

const FoodListTable = props => {

  return (
    <Table celled >
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
          <Table.HeaderCell>Fat Grams</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.foodList.map( (foodItem, index) => {
          let found = props.selectedFoodItems.find( selectedFoodItem => {
            return selectedFoodItem.description === foodItem.description
          })
          let selected =  found ? 'true' : 'false';
          return(
            <FoodListTableRow
              key={index}
              rowId={index}
              rowData={foodItem}
              onRowClick={props.rowClick}
              selected={selected}
            />
          )
        })}
      </Table.Body>
    </Table>
  );
}

FoodListTable.defaultProps = {
  foodList: [],
  selectedFoodItems: []
}

export default FoodListTable;
