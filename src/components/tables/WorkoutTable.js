/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { table } from 'styles/table'
import BlockHeader from 'components/BlockHeader'

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

  setupBlockHeader = (colCount, id, deleteItem, editItem) => {
    let item = { id: id, name: `set ${id}` }
    return (
      <tr style={{border:'1px solid cyan'}} key={Math.random()}>
        <th colSpan={colCount}>
          <BlockHeader item={item} deleteItem={deleteItem} editItem={editItem} />
        </th>
      </tr>
    )
  }
  
  //TODO: can this be cleaned up and refactored
  renderRows = data => {
    let blockHeader = this.setupBlockHeader( data.headers.length + 1, data.setId, this.props.deleteItem, this.props.editItem )
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

    let allRows = []
    if (! this.props.disabled ){
      allRows = [blockHeader, headerRow, ...rows]
    }else{
      allRows = [headerRow, ...rows]
    }
    return allRows
  }

  renderHeaders = headers => {
    if ( ! this.props.disabled ) {
      headers.splice(0,0,'')
    }
    return (
      <tr key={headers.toString()}>
        {headers.map(header => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    )
  }

  deleteRow = event => {

  }

  renderRow = (row, headers) => {
    // TODO: if this.props.disabled = false, then add delete icon (extra <td>)
    let tds = []
    let j = 0
    if ( ! this.props.disabled ) {
      j = 1
      tds.push(
          <td style={{borderLeft:'1px solid #000'}} key={Math.random()}>
            <input id={row.id} type='button' value='delete' onClick={this.props.deleteRow} />
          </td>)
    }

    for (let i = j; i < headers.length; i++) {
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
    let exGroupId = event.target.parentNode.parentNode.dataset['setid']
    let id = event.target.id
    let name = event.target.name
    let value = event.target.value
    this.props.handleSetChange({exGroupId: exGroupId, id: id, name: name, value: value})
  }

}

const Input = props => {
  return (
    <input 
      id={props.id}
      // data-setid={props.data.setId}
      name={props.name}
      type='text' 
      disabled={props.disabled} 
      value={props.data ? props.data : ''} 
      style={{backgroundColor:'inherit', border: 'none', color:'inherit', fontSize:'1em', width:'100%', lineHeight:'14px'}} 
      onChange={props.onChange}
    />
  )
}

export default Table