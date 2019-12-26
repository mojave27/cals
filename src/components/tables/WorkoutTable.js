/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { table, tableInput, workoutCell } from '../../styles/table'

const headers = ['exercise', 'target reps', 'weight', 'actual reps']

class Table extends React.Component {
  state = {}

  render() {
    return (
      <div style={{ overflowX: 'auto' }}>
        <table css={table}>
          <tbody id={this.props.setId}>
            {this.renderRows(this.props.data)}
          </tbody>
        </table>
      </div>
    )
  }

  renderRows = data => {
    let headerRow = this.renderHeaders()
    let rows = data.rows.map((row, index) => {
      let id = typeof row.id === 'undefined' ? index : row.id
      return (
        <tr id={id} data-setid={data.setId} key={index}>
          {this.renderRow(row, data.headers)}
        </tr>
      )
    })

    let allRows = [headerRow, ...rows]
    return allRows
  }

  renderHeaders = () => {
    let columnWidths = ['125px', '75px', '100px', '100px']
    return (
      <tr key={headers.toString()}>
        {headers.map( (header, index) => (
          <th style={{ width:`${columnWidths[index]}` }} key={header}>{header}</th>
        ))}
      </tr>
    )
  }

  renderRow = (row, headers) => {
    let tds = []
    tds.push(<td key={Math.random()}>{row.name}</td>)
    tds.push(<td key={Math.random()} css={workoutCell}>{row.reps}</td>)
    tds.push(<td key={Math.random()} css={workoutCell}>
      <Input id={row.id} name={'weight'} data={this.state.rows} onChange={this.props.onCellChange}/>
    </td>)
    tds.push(<td key={Math.random()} css={workoutCell}>
      <Input id={row.id} name={'actual reps'} data={this.state.rows} onChange={this.props.onCellChange}/>
    </td>)
    return tds
  }
}

const Input = props => {
  return (
    <input
      id={props.id}
      // data-setid={props.data.setId}
      name={props.name}
      type='text'
      value={props.data ? props.data : ''}
      css={tableInput} 
      onChange={props.onChange}
    />
  )
}

export default Table
