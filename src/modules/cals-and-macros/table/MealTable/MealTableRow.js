import React from 'react';
import { Checkbox, Table } from 'semantic-ui-react';

const FoodListTableRow = props => {
  const rowClick = e => {
    const { onClick, rowId } = props;
    onClick(rowId, e);
  };

  return (
    <Table.Row onClick={rowClick} active={props.rowData.active}>
      <Table.Cell>{props.rowData.description}</Table.Cell>
      <Table.Cell>{props.rowData.description}</Table.Cell>
      <Table.Cell>{props.rowData.description}</Table.Cell>
      <Table.Cell>{props.rowData.description}</Table.Cell>
      <Table.Cell>{props.rowData.description}</Table.Cell>
      {/* <Table.Cell>{props.rowData.dataType}</Table.Cell>
      <Table.Cell>{props.rowData.dataType}</Table.Cell>
      <Table.Cell>{props.rowData.dataType}</Table.Cell>
      <Table.Cell>{props.rowData.dataType}</Table.Cell> */}
    </Table.Row>
  );
};

export default FoodListTableRow;
