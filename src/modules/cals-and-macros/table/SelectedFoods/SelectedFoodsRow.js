import React, { useState } from 'react'
import { Input, Table } from 'semantic-ui-react'

const SelectedFoodsRow = props => {
  let [ units, setUnits ] = useState('grams')

  const rowDelete = e => {
    e.stopPropagation()
    props.rowDelete(e)
  }

  // const handleDropdownChange = event => {
  //   console.log(event.target.value)
  //   let newUnits = event.target.value
  //   setUnits(newUnits)
  // }

  const calcDefaultValue = qty => {
    if(typeof qty === undefined){
      return 100
    }
    let updatedQty = qty
    if (units === 'ounces') {
      updatedQty = qty/28.35
      updatedQty = updatedQty * 100
      let returnNum = Math.ceil(updatedQty)
      updatedQty = returnNum / 100
    }
    return updatedQty
  }

  const handleQtyChange = event => {
    let value = event.target.value
    console.log(`value before: ${value}`) 
    if(units === 'ounces') {
      value = value * 28.35
    }
    console.log(`value after: ${value}`) 
    props.onQuantityChange(event, value)
  }

  return (
    <Table.Row active={props.rowData.active}>
      <Table.Cell id={props.rowData.id} onClick={rowDelete}>
        {'X'}
      </Table.Cell>
      <Table.Cell>{props.rowData.description}</Table.Cell>
      <Table.Cell>
        <Input
          // defaultValue={calcDefaultValue(props.rowData.quantity)}
          value={calcDefaultValue(props.rowData.quantity)}
          // onChange={props.onQuantityChange}
          onChange={handleQtyChange}
          id={props.rowData.fdcId}
        />
      </Table.Cell>
      {/* <Table.Cell>{'grams'}</Table.Cell> */}
      <Table.Cell>
        {props.rowData.unit}
        {/* <select id='units' onChange={handleDropdownChange}> */}
          {/* <option value='grams'>grams</option> */}
          {/* <option value='ounces'>ounces</option> */}
          {/* <option value='whole'>whole</option> */}
        {/* </select> */}
      </Table.Cell>
      <Table.Cell>{props.rowData.calories}</Table.Cell>
      <Table.Cell>{props.rowData.proteinGrams}</Table.Cell>
      <Table.Cell>{props.rowData.carbGrams}</Table.Cell>
      {/* <Table.Cell>{props.rowData.fiberGrams}</Table.Cell> */}
      <Table.Cell>{0}</Table.Cell>
      {/* <Table.Cell>{props.rowData.nutrients.netCarbs}</Table.Cell> */}
      <Table.Cell>{0}</Table.Cell>
      <Table.Cell>{props.rowData.fatGrams}</Table.Cell>
    </Table.Row>
  )
}

export default SelectedFoodsRow
