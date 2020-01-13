/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { camelCase, get } from 'lodash'


class BasicTable extends React.Component {
  state = {}

  render() {
    let jssClass = get(this, 'props.jssClass', null)
    return (
      <table css={jssClass} style={{ margin: 'auto' }}>
        <tbody id={this.props.id}>{this.renderRows(this.props.data)}</tbody>
      </table>
    )
  }

  //TODO: can this be cleaned up and refactored
  renderRows = data => {
    let headerRow = this.renderHeaders(data.headers)
    let rows = data.rows.map((row, index) => {
      let id = typeof row.id === 'undefined' ? index : row.id
      return (
        <tr id={id} data-setid={data.setId} key={index}>
          {this.renderRow(row, data.headers)}
        </tr>
      )
    })

    rows.splice(0, 0, headerRow)
    return rows
  }

  renderHeaders = headers => {
    /* this code was eliminated due to a bug.  
     * every re-render would result in a new 
     * blank column in the table */
    // if (!this.props.disabled) {
    //   headers.splice(0, 0, '')
    // }
    return (
      <tr key={headers.toString()}>
        {headers.map( (header,index) => (
          <th key={`${header}-${index}`}>{header}</th>
        ))}
      </tr>
    )
  }

  renderRow = (row, headers) => {
    // TODO: if this.props.disabled = false, then add delete icon (extra <td>)
    let tds = []
    let j = 0
    if (!this.props.disabled) {
      j = 1
      tds.push(
        <td style={{ borderLeft: '1px solid #eee' }} key={`${row.id}-delete`}>
          <input
            id={`${row.id}-${j}`}
            type='button'
            value='delete'
            onClick={this.props.deleteRow}
          />
        </td>
      )
    }

    for (let i = j; i < headers.length; i++) {
      tds.push(
        <td
          onClick={this.clickPart}
          style={{
            borderLeft: '1px solid #eee',
            borderBottom: '1px solid #eee'
          }}
          key={i}
        >
          <Input
            id={`${row.id}-${i}`}
            name={headers[i]}
            data={row[camelCase(headers[i])]}
            onChange={this.handleSetChange}
            disabled={this.props.disabled}
          />
        </td>
      )
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
    this.props.handleSetChange({
      setId: setId,
      id: id,
      name: name,
      value: value
    })
  }
}

const Input = props => {
  return (
    <input
      id={props.id}
      name={props.name}
      type='text'
      disabled={props.disabled}
      value={props.data ? props.data : ''}
      style={{
        backgroundColor: 'inherit',
        border: 'none',
        boxShadow: 'none',
        fontSize: '1em',
        width: '100%',
        lineHeight: '14px'
      }}
      onChange={props.onChange}
    />
  )
}

BasicTable.defaultProps = {
  id: 0,
  data: { headers: [], rows: []},
  deleteRow: event => {
    console.log({ event })
  }
}

export default BasicTable
