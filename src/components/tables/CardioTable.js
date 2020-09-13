/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import { camelCase, get } from 'lodash'
import { woDayStyles } from '../../styles/WoDayStyles'
import { styles } from '../../styles/MainStyles'
import ThemeContext from '../../context/ThemeContext'


// class CardioTable extends React.Component {
  // state = {}
const CardioTable = props => {
  let themeContext = useContext(ThemeContext)
  let { woHeader, woInput, woTable } = woDayStyles(themeContext.theme)
  let { basicButtonSmall } = styles(themeContext.theme)


  //TODO: can this be cleaned up and refactored
  const renderRows = data => {
    // console.log(JSON.stringify(data))
    let headerRow = renderHeaders(data.headers)
    let rows = data.rows.map((row, index) => {
      // let id = typeof row.id === 'undefined' ? index : row.id
      let id = get(row, 'id', index)
      return (
        <tr id={id} key={index}>
          {renderRow(row, data.headers)}
        </tr>
      )
    })

    rows.splice(0, 0, headerRow)
    return rows
  }

  const renderHeaders = headers => {
    return (
      <tr key={headers}>
        {headers.map( (header,index) => (
          <th key={`${header}-${index}`}>{header}</th>
        ))}
      </tr>
    )
  }

  const renderRow = (row, headers) => {
    // TODO: if props.disabled = false, then add delete icon (extra <td>)
    let tds = []
    let j = 0
    if (!props.disabled) {
      j = 1
      // add the delete button
      tds.push(
        <td style={{ borderLeft: '1px solid #eee' }} key={`${row.id}-delete`}>
          <input
            id={`${row.id}-${j}`}
            type='button'
            value='delete'
            onClick={props.deleteRow}
          />
        </td>
      )
    }

    for (let i = j; i < headers.length; i++) {
      tds.push(
        <td
          // onClick={clickPart}
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
            onChange={handleCellChange}
            disabled={props.disabled}
          />
        </td>
      )
    }
    return tds
  }

  // todo: need to give the exercise id
  const handleCellChange = event => {
    // get setId from tr (parentNode/td > parentNode/tr)
    let rowId = event.target.parentNode.parentNode.id
    let id = event.target.id
    let name = event.target.name
    let value = event.target.value

    console.log(`rowId: ${rowId}`)
    console.log(`id: ${id}`)
    console.log(`name: ${name}`)
    console.log(`value: ${value}`)

    props.onChange({
      id: id,
      name: name,
      value: value
    })
  }

    return (
      // <table css={jssClass} style={{ margin: 'auto' }}>
      <React.Fragment>
      <div style={{ display: 'inline-block', margin: 'auto' }}>
        {/* <input
          style={{ margin: '5px' }}
          type='button'
          value='Choose Workout'
          css={[basicButtonSmall, { float: 'left' }]}
          onClick={showWorkoutChooser}
        /> */}
        {/* <input
          style={{ margin: '5px' }}
          type='button'
          value='Add Set'
          css={[basicButtonSmall, { float: 'left' }]}
          onClick={addSet}
        /> */}
        <input
          style={{ margin: '5px' }}
          type='button'
          value='Add Exercise'
          css={[basicButtonSmall, { float: 'left' }]}
          onClick={props.addCardioExercise}
        />
      </div>
      <table css={woTable} style={{ margin: 'auto' }}>
        <tbody id={props.id}>{renderRows(props.data)}</tbody>
      </table>
      </React.Fragment>
    )

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

CardioTable.defaultProps = {
  id: 0,
  data: { headers: [], rows: []},
  deleteRow: event => {
    console.log({ event })
  }
}

export default CardioTable
