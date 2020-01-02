/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { get, isUndefined } from 'lodash'
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
    let count = !isUndefined(this.props.data.days)
      ? this.props.data.days.length
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

  // the row arg is an exercise: {id: 0, name:'jammer', type:'isolation', reps:'max'}
  renderRow = (row, data) => {
    let setId = data.setId
    let exerciseId = row.id
    let tds = []

    // for each day, add columns for weight and actual-reps
    let count = data.days ? data.days.length : 0
    for (let i = 0; i < count; i++) {
      // WEIGHT CELL
      let day = data.days[i]
      let set = day.sets.find( set => Number(set.id) === Number(setId))
      let row = set.exercises.find( ex => Number(ex.id) === Number(exerciseId))
      let valueData = get(row, 'weight', '')
      tds.push(
        <td key={`${data.days[i].id}-weight`} css={dayLeftCell}>
          <Input
            id={row.id}
            dayId={data.days[i].id}
            name={'weight'}
            //TODO: why do i need to do this double check on isUndefined?
            data={valueData}
            onChange={this.onCellChange}
          />
        </td>
      )
      // REPS CELL
      valueData = get(row, 'actualReps', '')
      tds.push(
        <td key={`${data.days[i].id}-actualReps`} css={dayRightCell}>
          <Input
            id={row.id}
            dayId={data.days[i].id}
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
    let dayid = event.target.dataset.dayid

    // create the upday object
    let update = {
      dayId: dayid,
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
      key={`${props.dayId}-${props.name}-${props.id}`}
      id={props.id}
      data-dayid={props.dayId}
      name={props.name}
      type='text'
      value={props.data ? props.data : ''}
      css={tableInput}
      onChange={props.onChange}
    />
  )
}

export default Table
