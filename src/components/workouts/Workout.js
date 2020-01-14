/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { woHeader, woInput, woTable } from '../../styles/WoDayStyles'
import { row, basicButtonSmall } from '../../styles/main-styles'

// const sampleWo = {
//   exercises: [
//     { id: 0, name: 'dips', targetReps: '8' },
//     { id: 1, name: 'chins', targetReps: '8' },
//     { id: 2, name: 'squats', targetReps: '8' }
//   ],
//   sets: [
//     {
//       id: 0,
//       exercises: [
//         { id: 0, weight: '45', reps: '8' },
//         { id: 1, weight: '15', reps: '7' },
//         { id: 2, weight: '105', reps: '20' }
//       ]
//     },
//     {
//       id: 1,
//       exercises: [
//         { id: 0, weight: '45', reps: '8' },
//         { id: 1, weight: '15', reps: '6' },
//         { id: 2, weight: '0', reps: '0' }
//       ]
//     }
//   ]
// }

const Workout = props => {
  // TODO: how to handle a workout with no exercises or sets defined yet?
  const COL_1_TITLE = 'exercise'
  const COL_2_TITLE = 'targets'

  const renderHeaderRows = () => {
    let headers = [COL_1_TITLE, COL_2_TITLE]
    props.wo.sets.forEach(set => {
      headers.push('set')
    })
    let firstHeaderRow = (
      <tr key={'firstHeaderRow'}>
        {headers.map((header, index) => {
          if (header === COL_1_TITLE || header === COL_2_TITLE) {
            return (
              <th rowSpan={2} key={`${header}-${index}`} css={woHeader}>
                {header}
              </th>
            )
          } else {
            return (
              <th colSpan={2} key={`${header}-${index}`} css={woHeader}>
                {header}
              </th>
            )
          }
        })}
      </tr>
    )
    let secondHeaderRow = (
      <tr key={'secondHeaderRow'}>
        {props.wo.sets.map((set, index) => {
          return (
            <React.Fragment key={`${set}-${index}`}>
              <th key={`${set}-${index}-weight`} css={woHeader}>
                {'weight'}
              </th>
              <th key={`${set}-${index}-reps`} css={woHeader}>
                {'reps'}
              </th>
            </React.Fragment>
          )
        })}
      </tr>
    )
    return [firstHeaderRow, secondHeaderRow]
  }

  const renderRows = () => {
    return props.wo.exercises.map(ex => {
      return (
        <tr key={ex.id}>
          <td>{ex.name}</td>
          <td>{ex.targets}</td>
          {props.wo.sets.map(set => {
            let exercise = set.exercises.find(
              setEx => Number(setEx.id) === Number(ex.id)
            )
            return (
              <React.Fragment key={`${set.id}`}>
                <td>
                  <input
                    type='text'
                    placeholder={'enter weight'}
                    value={exercise.weight}
                    css={woInput}
                  />
                </td>

                <td>
                  <input
                    type='text'
                    placeholder={'enter reps'}
                    value={exercise.reps}
                    css={woInput}
                  />
                </td>
              </React.Fragment>
            )
          })}
        </tr>
      )
    })
  }

  const addSet = () => {
    props.addSet()
  }

  return (
    <React.Fragment>
      <div style={{display:'inline-block', margin:'auto'}}>
        <input
          style={{ margin: '5px' }}
          type='button'
          value='Add Set'
          css={[basicButtonSmall, { float: 'left' }]}
          onClick={addSet}
        />
      </div>
      <table css={woTable}>
        <tbody>
          {renderHeaderRows()}
          {renderRows()}
        </tbody>
      </table>
    </React.Fragment>
  )
}

// Workout.defaultProps = {
//   wo: sampleWo
// }

export default Workout
