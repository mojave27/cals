import React from 'react'
import { Icon, Table } from 'semantic-ui-react'

const FoodListTableRow = props => {
  const rowClick = e => {
    const { onRowClick, rowId } = props
    onRowClick(rowId, e)
  };

  // const renderSelected = selected => {
  //   if (selected === 'true') {
  //     return (<span style={{fontWeight:'bold', color:'green'}}>{selected}</span>)
  //   }
  //   return (<span>{selected}</span>)
  // }

  return (
    <Table.Row active={props.rowData.active}>
      {/* <Table.Cell selectable textAlign='center' ><Icon name='add' onClick={rowClick} /></Table.Cell> */}
      <Table.Cell selectable textAlign='center' onClick={rowClick} ><Icon name='add' /></Table.Cell>
      <Table.Cell>{props.rowData.description}</Table.Cell>
      <Table.Cell>{props.rowData.quantity}</Table.Cell>
      <Table.Cell>{props.rowData.unit}</Table.Cell>
      <Table.Cell>{props.rowData.calories}</Table.Cell>
      <Table.Cell>{props.rowData.proteinGrams}</Table.Cell>
      <Table.Cell>{props.rowData.carbGrams}</Table.Cell>
      <Table.Cell>{0}</Table.Cell>
      <Table.Cell>{props.rowData.fatGrams}</Table.Cell>
      {/* <Table.Cell selectable={false}><Checkbox className={'checkbox'} toggle onClick={props.onSelect} checked={props.selected} /></Table.Cell> */}
    </Table.Row>
  );
};

export default FoodListTableRow;
