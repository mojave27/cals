import React from 'react'
import { Button, Checkbox,  Icon, Table } from 'semantic-ui-react'

const EditableTable = props => {

const IconCell = (index, id) => {
  return (<Table.Cell key={`checkbox-${index}`}><Checkbox id={id} onClick={props.onSelect} /></Table.Cell>)
}
  
  const renderCells = (headers, row, index) => {
    // adds the checkbox as first cell in row
    let fullRow = [
      IconCell(index, row.id)
    ]
    // use the header values to determine order of the row data
    headers.forEach( header => {
      fullRow.push(<Table.Cell key={`${header.value}-${row.data[header.value]}-${index}`}>{row.data[header.value]}</Table.Cell>)
    })
    return fullRow
  }


  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell colSpan={props.headers.length + 1}>
          <Button
            floated='right'
            icon
            labelPosition='left'
            primary
            size='small'
            onClick={props.onAddRow}
          >
            <Icon name='add' /> Add Row
          </Button>
          <Button size='small' onClick={props.onDeleteSelected}>Delete Selected</Button>
          <Button disabled size='small'>
            Delete All
          </Button>
        </Table.HeaderCell>
      </Table.Row>
      </Table.Header>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          {props.headers.map( (header,index) => {
            return (
              <Table.HeaderCell 
                key={`${header.value}-${index}`} 
                {...header.cellAttributes}
                >
                {header.value}
              </Table.HeaderCell>
            )
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.rows.map( (row, index) => {
          return (
            <Table.Row key={`${row.id}-${index}`}>
              {renderCells(props.headers, row, index)}
            </Table.Row>
          )
        })}
      </Table.Body>

    </Table>
  )
}

export default EditableTable
