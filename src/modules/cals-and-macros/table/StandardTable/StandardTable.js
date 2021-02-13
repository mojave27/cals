import React from 'react'
import { Header, Table, Rating } from 'semantic-ui-react'

// header should look like:
// { value: 'some value',
// cellAttributes: 'singleLine'}

const StandardTable = props => {
  const renderCells = row => {
    return row.map( cell => <Table.Cell>{cell}</Table.Cell>)
  }

  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          {props.headers.map(header => {
            return (
              <Table.HeaderCell {...header.cellAttributes}>
                {header.value}
              </Table.HeaderCell>
            )
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.rows.map(row => {
          return (
            <Table.Row>
              {renderCells(row)}
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

export default StandardTable
