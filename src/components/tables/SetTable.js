/** @jsx jsx */
import { jsx } from '@emotion/core'
import { setHeader, table, setLeadCell } from '../../styles/table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

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
        <FontAwesomeIcon id={props.data.setId} alt={'edit set'} icon={faEdit} onClick={props.editSet} style={{cursor:'pointer'}} />
        <table css={table} style={{overflow:'scroll'}}>
          <tbody id={props.data.setId}>
            {renderRows(props.data)}
          </tbody>
        </table>
      </div>
    )

}

export default SetTable
