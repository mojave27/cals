/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import { useTable, useSortBy, useRowSelect } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
// import { findIndexOfId } from '../ArrayUtils'
import ThemeContext from '../../context/ThemeContext'
import { styles } from '../../styles/MainStyles'
import { styles as tableStyles } from '../../styles/TableStyles'

const ExerciseTable = ({ columns, data, deleteExercises }) => {
  let themeContext = useContext(ThemeContext)
  let { formButton } = styles(themeContext.theme)
  let { table } = tableStyles(themeContext.theme)

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowPaths }
  } = useTable(
    {
      columns,
      data
    },
    useSortBy,
    useRowSelect
  )

  const submitTable = () => {
    // sav(selectedRowPaths)
  }

  const deleteSelected = () => {
    let ids = selectedFlatRows.map(d => d.original.id)
    deleteExercises(ids)
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
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FontAwesomeIcon
                          style={{ marginLeft: '5px' }}
                          icon={faAngleUp}
                        />
                      ) : (
                        <FontAwesomeIcon
                          style={{ marginLeft: '5px' }}
                          icon={faAngleDown}
                        />
                      )
                    ) : (
                      <FontAwesomeIcon
                        style={{ marginLeft: '5px' }}
                        icon={faAngleDown}
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <button css={formButton} style={{ margin: '10px' }} onClick={submitTable}>
        Submit
      </button>
      <button
        css={formButton}
        style={{ margin: '10px' }}
        onClick={deleteSelected}
      >
        Delete Selected
      </button>

      <p>Selected Rows: {selectedRowPaths.length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowPaths,
              'selectedFlatRows[].original': selectedFlatRows.map(
                d => d.original
              )
            },
            null,
            2
          )}
        </code>
      </pre>
    </React.Fragment>
  )
}

export default ExerciseTable
