/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { table } from '../../styles/table'
import { useTable, useSortBy, useRowSelect } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'


const Table = ({ columns, data, callback }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowPaths },
  } = useTable({
    columns,
    data,
  },
    useSortBy, useRowSelect
  )

  const submitTable = () => {
    // props.submitTable()
    callback(selectedRowPaths)
  }

  // Render the UI for your table
  return (
    <React.Fragment>
    <table css={table} {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              // <th {...column.getHeaderProps()}>
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                {column.isSorted
                      ? column.isSortedDesc
                        ? <FontAwesomeIcon style={{marginLeft:'5px'}} icon={faAngleUp} />
                        : <FontAwesomeIcon style={{marginLeft:'5px'}} icon={faAngleDown} />
                      : <FontAwesomeIcon style={{marginLeft:'5px'}} icon={faAngleDown} />}
                  </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(
          (row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )}
        )}
      </tbody>
    </table>
    <button onClick={submitTable} >Submit</button>
    <p>Selected Rows: {selectedRowPaths.length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowPaths,
              'selectedFlatRows[].original': selectedFlatRows.map(
                d => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
    </React.Fragment>
  )
}

export default Table
