/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
// import { viewContainer } from '../../styles/program'
import { table } from '../../styles/table'

class ProgramOverview extends React.Component {
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

  buildKeysArray = obj => {
    let keys = []
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) keys.push(key)
    }
    return keys
  }

  renderHeader = headers => {
    return (
      <tr key={headers.toString()}>
        {headers.map(header => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    )
  }

  renderRow = row => {
    console.log(`row: ${JSON.stringify(row)}`)
    let keys = this.buildKeysArray(row)
    let tds = []
    for (let i = 0; i < keys.length; i++) {
      // console.log(keys[i], row[keys[i]]);
      tds.push(<td key={i}>{row[keys[i]]}</td>)
    }

    return (tds)
  }

  renderRows = data => {
    // fix this later
    data = {
      headers: ['alpha', 'numeric'],
      rows: [
        { alpha: 'abc', numeric: '123' },
        { alpha: 'def', numeric: '456' },
        { alpha: 'ghi', numeric: '789' },
        { alpha: 'jkl', numeric: '101' },
        { alpha: 'mno', numeric: '112' }
      ]
    }
    let headerRow = this.renderHeader(data.headers)
    let rows = data.rows.map( (row,index) => {
      return <tr key={index}>{this.renderRow(row)}</tr>
    })
    let allRows = [headerRow, ...rows]
    console.log(allRows)
    return allRows
  }
}

export default ProgramOverview
