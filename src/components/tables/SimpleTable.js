/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { table } from '../../styles/table'

// SAMPLE DATA OBJECT
const sampleData = {
  setId: 999,
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

//TODO: update this table to use context instead of passing the props/data all around it.

class Table extends React.Component {
  state = { }

  render() {
    return (
      <div style={{ overflowX: 'auto' }}>
        <table css={table}>
          <tbody id={this.props.setId}>{this.renderRows(this.props.data)}</tbody>
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
        data-setid={data.setId}
        key={index}>
        {this.renderRow(row, data.headers)}
      </tr>
    })
    let allRows = [headerRow, ...rows]
    return allRows
  }

  renderHeaders = headers => {
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
            <Input id={row.id} name={headers[i]} data={row[headers[i]]}  onChange={this.handleSetChange} disabled={this.props.disabled} />
          </td>)
    }
    return tds
  }

  // todo: need to give the exercise id
  handleSetChange = event => {
    // get setId from tr (parentNode/td > parentNode/tr)
    let setId = event.target.parentNode.parentNode.dataset['setid']
    let id = event.target.id
    let name = event.target.name
    let value = event.target.value
    this.props.handleSetChange({setId: setId, id: id, name: name, value: value})
  }

}

const Input = props => {
  return (
    <input 
      id={props.id}
      data-setid='999'
      name={props.name}
      type='text' 
      disabled={props.disabled} 
      value={props.data} 
      style={{backgroundColor:'inherit', border: 'none', color:'inherit', fontSize:'1em', width:'100%', lineHeight:'14px'}} 
      onChange={props.onChange}
    />
  )
}

export default Table