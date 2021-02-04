/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import { get, isUndefined } from 'lodash'
import ThemeContext from 'context/ThemeContext'
import {
  dateHeader,
  setHeader,
  table,
  tableInput,
  dayLeftCell,
  dayRightCell
} from 'styles/table'
// import { activeTheme } from '../../styles/main-styles'

const Table = props => {
  let context = useContext(ThemeContext)

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
    let days = get(props, 'data.days', undefined)
    let dateHeaders = []
    let headers = []
    let columnWidths = ['100px', '100px']
    // let count = !isUndefined(props.data.days)
    let count = !isUndefined(days) ? days.length : 0

    for (let i = 0; i < count; i++) {
      dateHeaders.push(days[i].date)
      headers.push('weight')
      headers.push('actual reps')
      columnWidths.push('100px')
      columnWidths.push('100px')
    }
    return (
      <React.Fragment>
        <tr key={'headerRow'}>
          {dateHeaders.map((date, index) => (
            <th
              key={`dateHeader-${index}`}
              css={[dateHeader, setHeader]}
              colSpan={2}
              style={{ textAlign: 'center' }}
            >
              {date}
            </th>
          ))}
        </tr>
        <tr key={'headerRow'}>
          {/* lots of styling logic here - see if it can be extracted to a style file. */}
          {headers.map((header, index) => {
            let borderStyle = `2px solid ${context.theme.color3.hex}`
            let border =
              header === 'weight'
                ? { borderLeft: `${borderStyle}` }
                : { borderRight: `${borderStyle}` }
            let styles = { minWidth: `${columnWidths[index]}`, ...border }
            return (
              <th css={setHeader} style={styles} key={`${header}-${index}`}>
                {header}
              </th>
            )
          })}
        </tr>
      </React.Fragment>
    )
  }

  // the row arg is an exercise: {id: 0, name:'jammer', type:'isolation', reps:'max'}
  const renderRow = (exercise, data) => {
    let setId = data.setId
    if (isUndefined(setId)) {
      console.log(`SET ID IS UNDEFINED`)
      return (
        <React.Fragment>
          <td></td>
          <td></td>
        </React.Fragment>
      )
    }
    let exerciseId = exercise.id
    let tds = []

    // for each day, add columns for weight and actual-reps
    let count = data.days ? data.days.length : 0
    for (let i = 0; i < count; i++) {
      // WEIGHT CELL
      let day = data.days[i]
      let set = day.sets.find(set => Number(set.id) === Number(setId))
      if (isUndefined(set)) {
        throw new Error('set is undefined.')
      }

      let row = set.exercises.find(ex => Number(ex.id) === Number(exerciseId))
      let valueData = get(row, 'weight', '')
      tds.push(
        <td key={`${data.days[i].id}-weight`} css={dayLeftCell}>
          <Input
            id={row.id}
            dayId={data.days[i].id}
            name={'weight'}
            //TODO: why do i need to do this double check on isUndefined?
            data={valueData}
            onChange={onCellChange}
          />
        </td>
      )
      // REPS CELL
      valueData = get(row, 'actualReps', '')
      tds.push(
        <td key={`${data.days[i].id}-actualReps`} css={dayRightCell}>
          <Input
            id={row.id}
            dayId={data.days[i].id}
            name={'actualReps'}
            data={valueData}
            onChange={onCellChange}
          />
        </td>
      )
    }
    return tds
  }

  const onCellChange = event => {
    let { id, value, name } = event.target
    let dayid = event.target.dataset.dayid

    // create the upday object
    let update = {
      dayId: dayid,
      setId: props.data.setId,
      exerciseId: id,
      name: name,
      value: value
    }
    props.onCellChange(update)
  }

  return (
    <div
      style={{
        overflow: 'scroll',
        maxWidth: '500px',
        display: 'inline-block'
      }}
    >
      <table css={table} style={{ overflowX: 'scroll' }}>
        <tbody id={props.setId}>{renderRows(props.data)}</tbody>
      </table>
    </div>
  )
}

const Input = props => {
  return (
    <input
      key={`${props.dayId}-${props.name}-${props.id}`}
      id={props.id}
      data-dayid={props.dayId}
      name={props.name}
      type='text'
      value={props.data ? props.data : ''}
      css={tableInput}
      onChange={props.onChange}
    />
  )
}

export default Table
