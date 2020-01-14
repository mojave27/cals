/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { woInput, woLabel } from '../../styles/WoDayStyles'

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

  const renderHeaderRow = () => {
    let headers = ['exercise', 'targets']
    props.wo.sets.forEach(set => {
      headers.push('set')
    })
    let headerRow = (
      <tr>
        {headers.map( (header, index) => {
          return <th key={`${header}-${index}`}>{header}</th>
        })}
      </tr>
    )
    return headerRow
  }

  const renderRows = () => {
    return props.wo.exercises.map(ex => {
      return (
        <tr key={ex.id} style={{borderBottom:'1px solid red'}}>
        <td>
          {ex.name}
        </td>
        <td>
          {ex.targets}
        </td>
        {props.wo.sets.map(set => {
          let exercise = set.exercises.find( setEx => Number(setEx.id) === Number(ex.id) )
          return(
            <td key={set.id} >
              <table style={{border:'none'}}>
                <tbody>
                  <tr>
                    <td style={{border:'none', borderBottom:'1px dotted #333'}}>
                      <div css={woLabel}>
                        <label>{'weight'}</label>
                      </div>
                      <input
                        type='text'
                        placeholder={'enter weight'}
                        value={exercise.weight}
                        css={woInput}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={{border:'none'}}>
                      <div css={woLabel}>
                        <label>{'reps'}</label>
                      </div>
                      <input
                        type='text'
                        placeholder={'enter reps'}
                        value={exercise.reps}
                        css={woInput}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          )
        })}
        </tr>
      )
    })
  }

  return (
    <React.Fragment>
      <table>
        <tbody>
          {renderHeaderRow()}
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
