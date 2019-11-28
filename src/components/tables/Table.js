/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { table } from '../../styles/table'

// SAMPLE DATA OBJECT
// const data = {
//   headers: ['name', 'reps'],
//   rows: [
//     {
//       id: 0,
//       reps: 'max',
//       name: 'chins',
//       type: 'compound'
//     },
//     {
//       id: 8,
//       reps: 'max',
//       name: 'glute bridge',
//       type: 'compound'
//     },
//     {
//       id: 9,
//       reps: 'max',
//       name: 'inv row',
//       type: 'compound'
//     }]
// }

class Table extends React.Component {
  state = {}

  render() {
    return (
      <div style={{ overflowX: 'auto' }}>
        <table css={table}>
          <tbody>{this.renderRows(this.props.data)}</tbody>
        </table>
      </div>
    )
  }

  renderHeader = headers => {
    if ( this.props.edit && this.props.edit === true ){
      headers.push('edit?')
    }
    return (
      <tr key={headers.toString()}>
        {headers.map(header => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    )
  }

  renderRow = (row, headers) => {
    let tds = []
    for (let i = 0; i < headers.length; i++) {
      tds.push(<td key={i}>{row[headers[i]]}</td>)
    }
    // amend the edit column
    if ( this.props.edit && this.props.edit === true ){
      let lastIndex = tds.length -1
      tds[lastIndex] = <td><input type={'checkbox'} /></td>
    }
    return tds
  }

  renderRows = data => {
    let headerRow = this.renderHeader(data.headers)
    let rows = data.rows.map((row, index) => {
      let id = (typeof row.id === 'undefined') ? index : row.id
      return  <tr 
                id={id} 
                onClick={this.props.onClick} 
                key={index}>
                  {this.renderRow(row, data.headers)}
              </tr>
    })
    let allRows = [headerRow, ...rows]
    return allRows
  }
}

export default Table
