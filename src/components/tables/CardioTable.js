/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import { camelCase, get } from 'lodash'
import { woDayStyles } from '../../styles/WoDayStyles'
// import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ThemeContext from '../../context/ThemeContext'

// const useStyles = makeStyles(context => ({
//   root: {
//     flexGrow: 1,
//     width: `${context.mobile === true ? '100%' : 'auto'}`
//   }
// }))

const CardioTable = props => {
  let themeContext = useContext(ThemeContext)
  let { woTable } = woDayStyles(themeContext.theme)
  // let classes = useStyles(themeContext)

  //TODO: can this be cleaned up and refactored
  const renderRows = data => {
    let headerRow = renderHeaders(data.headers)
    let rows = data.rows.map((row, index) => {
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

  const renderMobileRows = row => {
      let id = get(row, 'id', 0)
      // let exerciseNumber = index + 1
      return (
        <React.Fragment key={`fragment-${row.id}`}>
          <tr id={`${id}-header`}>
            <th colSpan={2}>Cardio Exercise</th>
          </tr>
          <tr id={`${id}-row-type`}>
            <td>{'type'}</td>
            <td>
              <Input
                id={`${row.id}-${'type'}`}
                name={'type'}
                data={row.type}
                onChange={handleCellChange}
                disabled={props.disabled}
              />
            </td>
          </tr>
          <tr id={`${id}-row-distance`}>
            <td>{'distance'}</td>
            <td>
              <Input
                id={`${row.id}-distance`}
                name={'distance'}
                data={row.distance}
                onChange={handleCellChange}
                disabled={props.disabled}
              />
            </td>
          </tr>
          <tr id={`${id}-row-duration`}>
            <td>{'duration'}</td>
            <td>
              <Input
                id={`${row.id}-duration`}
                name={'duration'}
                data={row.duration}
                onChange={handleCellChange}
                disabled={props.disabled}
              />
            </td>
          </tr>
          <tr id={`${id}-row-heartRate`}>
            <td>{'heart rate'}</td>
            <td>
              <Input
                id={`${row.id}-heartRate`}
                name={'heartRate'}
                data={row.heartRate}
                onChange={handleCellChange}
                disabled={props.disabled}
              />
            </td>
          </tr>
        </React.Fragment>
      )
  }

  const renderHeaders = headers => {
    return (
      <tr key={headers}>
        {headers.map((header, index) => (
          <th key={`${header}-${index}`}>{header}</th>
        ))}
      </tr>
    )
  }

  const renderRow = (row, headers) => {
    let tds = []
    let j = 1
    // add the delete button
    tds.push(
      <td style={{ borderLeft: '1px solid #eee' }} key={`${row.id}-delete`}>
        <Button id={`${row.id}-${j}`} size='small' onClick={props.deleteRow} variant='contained'>{'delete'}</Button>
      </td>
    )

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
    // let rowId = event.target.parentNode.parentNode.id
    let id = event.target.id
    let name = event.target.name
    let value = event.target.value

    props.onChange({
      id: id,
      name: name,
      value: value
    })
  }

  const renderMobile = props => {
    return props.data.rows.map( (row,index) => {
      return(
        <table style={{paddingBottom: '10px'}} css={woTable} key={`table-${index}`}>
          <tbody id={props.id}>{renderMobileRows(row)}</tbody>
        </table>)
    })

  }

  return (
    <React.Fragment>
      <div style={{ margin: 'auto', marginBottom: '10px' }}>
        <Button size='small' onClick={props.addCardioExercise} variant='contained'>{'Add Exercise'}</Button>
      </div>
      {themeContext.mobile === true ? (
        renderMobile(props)
      ) : (
        <table css={woTable} style={{ margin: 'auto' }}>
          <tbody id={props.id}>{renderRows(props.data)}</tbody>
        </table>
      )}
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
  data: { headers: [], rows: [] },
  deleteRow: event => {
    console.log({ event })
  }
}

export default CardioTable
