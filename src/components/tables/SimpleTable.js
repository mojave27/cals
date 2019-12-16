/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { table } from '../../styles/table'

// SAMPLE DATA OBJECT
const sampleData = {
  headers: ['name', 'reps'],
  rows: [
    {
      id: 0,
      reps: 'max',
      name: 'chins',
      type: 'compound'
    },
    {
      id: 8,
      reps: 'max',
      name: 'glute bridge',
      type: 'compound'
    },
    {
      id: 9,
      reps: 'max',
      name: 'inv row',
      type: 'compound'
    }]
}

class Table extends React.Component {
  state = { }

  render() {
    return (
      <div style={{ overflowX: 'auto' }}>
        <table css={table}>
          <tbody>{this.renderRows(this.props.data)}</tbody>
        </table>
      </div>
    )
  }

  renderRows = data => {
    let headerRow = this.renderHeaders(data.headers)
    let rows = data.rows.map((row, index) => {
      let id = (typeof row.id === 'undefined') ? index : row.id
      return <tr
        id={id}
        // onClick={this.props.onClick}
        key={index}>
        {this.renderRow(row, data.headers)}
      </tr>
    })
    let allRows = [headerRow, ...rows]
    return allRows
  }

  renderHeaders = headers => {
    // if (this.props.edit && this.props.edit === true) {
    //   headers.push('edit?')
    // }
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
      tds.push(
          <td onClick={this.clickPart} style={{borderLeft:'1px solid #000'}} key={i}>
            <Input data={row[headers[i]]}  onChange={this.handleTextChange} disabled={this.props.disabled} />
          </td>)
    }
    return tds
  }

  clickPart = event => { }

  handleTextChange = event => {
    console.log(event.target.value)
  }

}

const Input = props => {
  return (
    <input 
      type='text' 
      disabled={props.disabled} 
      value={props.data} 
      style={{backgroundColor:'inherit', border: 'none', color:'inherit', fontSize:'1em', width:'100%', lineHeight:'14px'}} 
      // onClick={props.clickPart} 
      onChange={props.onChange}
    />
  )
}

export default Table