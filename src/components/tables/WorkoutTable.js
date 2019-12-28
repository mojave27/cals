/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { isUndefined } from 'lodash'
import { table, tableInput, workoutCell, dayLeftCell, dayRightCell } from '../../styles/table'

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
          {this.renderRow(row, data)}
        </tr>
      )
    })

    let allRows = [headerRow, ...rows]
    return allRows
  }

  renderHeaders = () => {
    let headers = ['exercise', 'target reps']
    let columnWidths = ['125px', '100px', '100px', '100px']
    let count = !isUndefined(this.props.data.dates)
      ? this.props.data.dates.length
      : 0
    for (let i = 0; i < count; i++) {
      headers.push('exercise')
      headers.push('actual reps')
      columnWidths.push('100px')
      columnWidths.push('100px')
    }
    return (
      <tr key={Math.random()}>
        {headers.map((header, index) => (
          <th
            style={{ width: `${columnWidths[index]}` }}
            key={`header-${Math.random()}`}
          >
            {header}
          </th>
        ))}
      </tr>
    )
  }

  renderRow = (row, data) => {
    let tds = []
    tds.push(<td key={Math.random()}>{row.name}</td>)
    tds.push(
      <td key={Math.random()} css={workoutCell}>
        {row.reps}
      </td>
    )

    // for each date, add columns for weight and actual-reps
    let count = data.dates ? data.dates.length : 0
    for (let i = 0; i < count; i++) {
      let valueData = !isUndefined(row.dates) && !isUndefined(row.dates[i]) ? row.dates[i].weight : ''
      tds.push(
        <td key={Math.random()} css={dayLeftCell}>
          <Input
            id={row.id}
            name={'weight'}
            //TODO: WTF?? why do i need to do this double check on isUndefined?
            data={valueData}
            onChange={this.props.onCellChange}
          />
        </td>
      )
      valueData = !isUndefined(row.dates) && !isUndefined(row.dates[i]) ? row.dates[i].actualReps : ''
      tds.push(
        <td key={Math.random()} css={dayRightCell}>
          <Input
            id={row.id}
            name={'actual reps'}
            data={valueData}
            onChange={this.props.onCellChange}
          />
        </td>
      )
    }
    return tds
  }

}

const Input = props => {
  return (
    <input
      id={props.id}
      name={props.name}
      type='text'
      value={props.data ? props.data : ''}
      css={tableInput}
      onChange={props.onChange}
    />
  )
}

export default Table
