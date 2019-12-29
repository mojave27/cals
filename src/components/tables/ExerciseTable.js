/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { isUndefined } from 'lodash'
import { setHeader, table, tableInput, dayLeftCell, dayRightCell } from '../../styles/table'

class Table extends React.Component {
  state = {}

  render() {
    return (
      <div style={{ overflow: 'scroll', maxWidth:'500px', display:'inline-block' }}>
        <table css={table} style={{overflow:'scroll'}}>
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
    let headers = []
    let columnWidths = ['100px', '100px']
    let count = !isUndefined(this.props.data.dates)
      ? this.props.data.dates.length
      : 0
    for (let i = 0; i < count; i++) {
      headers.push('weight')
      headers.push('actual reps')
      columnWidths.push('100px')
      columnWidths.push('100px')
    }
    return (
      <tr key={'headerRow'}>
        {headers.map((header, index) => (
          <th css={setHeader}
            style={{ minWidth: `${columnWidths[index]}` }}
            key={`${header}-${index}`}
          >
            {header}
          </th>
        ))}
      </tr>
    )
  }

  renderRow = (row, data) => {
    let tds = []

    // for each date, add columns for weight and actual-reps
    let count = data.dates ? data.dates.length : 0
    for (let i = 0; i < count; i++) {
      let valueData = !isUndefined(row.dates) && !isUndefined(row.dates[i]) ? row.dates[i].weight : ''
      tds.push(
        <td key={`${data.dates[i].id}-weight`} css={dayLeftCell}>
          <Input
            id={row.id}
            dateId={data.dates[i].id}
            name={'weight'}
            //TODO: why do i need to do this double check on isUndefined?
            data={valueData}
            onChange={this.onCellChange}
          />
        </td>
      )
      valueData = !isUndefined(row.dates) && !isUndefined(row.dates[i]) ? row.dates[i].actualReps : ''
      // let date = data.dates[i].id
      // console.log(`data.dates[i].id: ${date}`)
      tds.push(
        <td key={`${data.dates[i].id}-actualReps`} css={dayRightCell}>
          <Input
            id={row.id}
            dateId={data.dates[i].id}
            name={'actualReps'}
            data={valueData}
            onChange={this.onCellChange}
          />
        </td>
      )
    }
    return tds
  }

  onCellChange = event => {
    let { id, value, name } = event.target
    let dateid = event.target.dataset.dateid

    // create the update object
    let update = {
      dateId: dateid,
      setId: this.props.data.setId,
      exerciseId: id,
      name: name,
      value: value
    }
    this.props.onCellChange(update)
  }

}

const Input = props => {
  return (
    <input
      key={`${props.dateId}-${props.name}-${props.id}`}
      id={props.id}
      data-dateid={props.dateId}
      name={props.name}
      type='text'
      value={props.data ? props.data : ''}
      css={tableInput}
      onChange={props.onChange}
    />
  )
}

export default Table
