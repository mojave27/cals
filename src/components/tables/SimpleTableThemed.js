/** @jsx jsx */
import { jsx } from '@emotion/core'
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { styles } from '../../styles/TableStyles'
import BlockHeader from '../BlockHeader'

// SAMPLE DATA OBJECT
// const sampleData = {
//   setId: 999,
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

//TODO: update table to use context instead of passing the props/data all around it.

const Table = props => {
  let themeContext = useContext(ThemeContext)
  let { table } = styles(themeContext.theme)

  const setupBlockHeader = (colCount, id, deleteItem, editItem) => {
    let item = { id: id, name: `set ${id}` }
    return (
      <tr style={{ border: '1px solid cyan' }} key={Math.random()}>
        <th colSpan={colCount}>
          <BlockHeader
            item={item}
            deleteItem={deleteItem}
            editItem={editItem}
          />
        </th>
      </tr>
    )
  }

  //TODO: can be cleaned up and refactored
  const renderRows = data => {
    let blockHeader = setupBlockHeader(
      data.headers.length + 1,
      data.setId,
      props.deleteItem,
      props.editItem
    )

    let headerRow = renderHeaders(data.headers)
    let rows = data.rows.map((row, index) => {
      let id = typeof row.id === 'undefined' ? index : row.id
      return (
        <tr id={id} data-setid={data.setId} key={index}>
          {renderRow(row, data.headers)}
        </tr>
      )
    })

    let allRows = []
    if (!props.disabled) {
      allRows = [blockHeader, headerRow, ...rows]
    } else {
      allRows = [headerRow, ...rows]
    }
    return allRows
  }

  const renderHeaders = headers => {
    if (!props.disabled) {
      headers.splice(0, 0, '')
    }
    return (
      <tr key={headers.toString()}>
        {headers.map(header => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    )
  }

  // const deleteRow = event => {}

  const renderRow = (row, headers) => {
    // TODO: if props.disabled = false, then add delete icon (extra <td>)
    let tds = []
    let j = 0
    if (!props.disabled) {
      j = 1
      tds.push(
        <td style={{ borderLeft: '1px solid #000' }} key={Math.random()}>
          <input
            id={row.id}
            type='button'
            value='delete'
            onClick={props.deleteRow}
          />
        </td>
      )
    }

    for (let i = j; i < headers.length; i++) {
      tds.push(
        <td style={{ borderLeft: '1px solid #000' }} key={i}>
          <Input
            id={row.id}
            name={headers[i]}
            data={row[headers[i]]}
            onChange={handleSetChange}
            disabled={props.disabled}
          />
        </td>
      )
    }
    return tds
  }

  // todo: need to give the exercise id
  const handleSetChange = event => {
    // get setId from tr (parentNode/td > parentNode/tr)
    let setId = event.target.parentNode.parentNode.dataset['setid']
    let id = event.target.id
    let name = event.target.name
    let value = event.target.value
    props.handleSetChange({ setId: setId, id: id, name: name, value: value })
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
        style={{
          backgroundColor: 'inherit',
          border: 'none',
          color: 'inherit',
          fontSize: '1em',
          width: '100%',
          lineHeight: '14px'
        }}
        onChange={props.onChange}
      />
    )
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table css={table}>
        <tbody id={props.setId}>{renderRows(props.data)}</tbody>
      </table>
    </div>
  )
}

export default Table
