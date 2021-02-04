/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { setHeader, table, setLeadCell } from 'styles/table'
import { editIcon } from 'styles/main-styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faEdit } from '@fortawesome/free-solid-svg-icons'

const SetTable = props => {

  const renderRows = data => {
    let headerRow = renderHeaders()
    let rows = data.rows.map((row, index) => {
      let id = typeof row.id === 'undefined' ? index : row.id
      return (
        <tr id={id} data-setid={data.setId} key={index}>
          {renderRow(row, data)}
        </tr>
      )
    })
    let allRows = [headerRow, ...rows]
    return allRows
  }


  const renderHeaders = () => {
    return (
      <React.Fragment>
      <tr key={Math.random()}>
          <th css={setHeader} style={{ minWidth:'125px' }} >
            {''}
          </th>
          <th css={setHeader} style={{ minWidth:'100px' }} >
            {''}
          </th>
      </tr>
      <tr key={Math.random()}>
          <th css={setHeader} style={{ minWidth:'125px' }} >
            {'exercise'}
          </th>
          <th css={setHeader} style={{ minWidth:'100px' }} >
            {'target reps'}
          </th>
      </tr>
      </React.Fragment>
    )
  }

  const renderRow = (row, data) => {
    let tds = []
    tds.push(<td key={`${row.name}-${row.reps}`} css={setLeadCell}>{row.name}</td>)
    tds.push(
      <td key={`${row.reps}-${row.name}`} css={setLeadCell}>
        {row.reps}
      </td>
    )
    return tds
  }

    return (
      <div style={{ overflow: 'scroll', maxWidth:'300px', display:'inline-block' }}>
        <FontAwesomeIcon id={props.data.setId} title={'edit set'} alt={'edit set'} icon={faEdit} onClick={props.editSet} css={editIcon} />
        <FontAwesomeIcon id={props.data.setId} title={'copy set'} alt={'copy set'} icon={faCopy} onClick={props.copySet} css={editIcon} />
        <table css={table} style={{overflow:'scroll'}}>
          <tbody id={props.data.setId}>
            {renderRows(props.data)}
          </tbody>
        </table>
      </div>
    )

}

export default SetTable
