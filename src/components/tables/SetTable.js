/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { setHeader, table, workoutCell } from '../../styles/table'

class SetTable extends React.Component {
  state = {}

  render() {
    return (
      <div style={{ overflow: 'scroll', maxWidth:'300px', display:'inline-block' }}>
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
    return (
      <tr key={Math.random()}>
          <th css={setHeader} style={{ minWidth:'125px' }} >
            {'exercise'}
          </th>
          <th css={setHeader} style={{ minWidth:'100px' }} >
            {'target reps'}
          </th>
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
    return tds
  }

}

export default SetTable
