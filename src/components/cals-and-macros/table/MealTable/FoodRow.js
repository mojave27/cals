import React, { useState } from 'react'
import { Input, Table } from 'semantic-ui-react'

const buttonStyle = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '2px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  width: '1.2em',
  fontWeight: '700',
  lineHeight: '1em',
  margin: '4px 4px',
  borderRadius: '50%'
}

const FoodRow = props => {
  let [units, setUnits] = useState('grams')

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
    if (typeof qty === undefined) {
      return 100
    }
    let updatedQty = qty
    if (units === 'ounces') {
      updatedQty = (qty / 28.35) * 100
      updatedQty = Math.ceil(updatedQty) / 100
    }
    return updatedQty
  }

  const handleQtyChange = event => {
    let value = event.target.value
    console.log(`value before: ${value}`)
    if (units === 'ounces') {
      value = value * 28.35
    }
    console.log(`value after: ${value}`)
    props.onQuantityChange(event, value)
  }

  const tweakUp = event => {
    const rowid = event.target.dataset.rowid
    props.tweakUp(rowid)
  }

  const tweakDown = event => {
    const rowid = event.target.dataset.rowid
    props.tweakDown(rowid)
  }

  const renderTweakButtons = viewOnly => {
    if (viewOnly) {
      return null
    } else {
      return (
        <div>
          <button
            data-rowid={props.rowData.id}
            style={buttonStyle}
            onClick={tweakDown}
          >
            -
          </button>
          {'tweak'}
          <button
            data-rowid={props.rowData.id}
            style={buttonStyle}
            onClick={tweakUp}
          >
            +
          </button>
        </div>
      )
    }
  }

  const renderLeadCell = viewOnly => {
      return viewOnly ? (
        <Table.Cell />
      ) : (
        <Table.Cell id={props.rowData.id} onClick={rowDelete}>
          {'X'}
        </Table.Cell>
      )
  }

  return (
    <Table.Row active={props.rowData.active}>
      {renderLeadCell(props.viewOnly)}
      <Table.Cell>{props.rowData.description}</Table.Cell>
      <Table.Cell>
        <Input
          value={calcDefaultValue(props.rowData.quantity)}
          onChange={handleQtyChange}
          id={props.rowData.id}
          disabled={props.viewOnly}
        />
        {renderTweakButtons(props.viewOnly)}
      </Table.Cell>
      <Table.Cell>{props.rowData.unit}</Table.Cell>
      <Table.Cell>{props.rowData.calories}</Table.Cell>
      <Table.Cell>{props.rowData.proteinGrams}</Table.Cell>
      <Table.Cell>{props.rowData.carbGrams}</Table.Cell>
      <Table.Cell>{0}</Table.Cell>
      <Table.Cell>{0}</Table.Cell>
      <Table.Cell>{props.rowData.fatGrams}</Table.Cell>
    </Table.Row>
  )
}

export default FoodRow
