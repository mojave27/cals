/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
// import { detailCard, container, stripe } from '../../styles/main-styles'

const sampleWo = {
  exercises: [
    { id: 0, name: 'dips', targetReps: '8' },
    { id: 1, name: 'chins', targetReps: '8' },
    { id: 2, name: 'squats', targetReps: '8' }
  ],
  sets: [
    {
      id: 0,
      exercises: [
        { id: 0, weight: '45', reps: '8' },
        { id: 1, weight: '15', reps: '7' },
        { id: 2, weight: '105', reps: '20' }
      ]
    },
    {
      id: 1,
      exercises: [
        { id: 0, weight: '45', reps: '8' },
        { id: 1, weight: '15', reps: '6' },
        { id: 2, weight: '0', reps: '0' }
      ]
    }
  ]
}

const Workout = props => {
  const renderHeaderRow = () => {
    let headers = ['exercise', 'target reps']
    props.wo.sets.forEach(set => {
      headers.push('set')
    })
    let headerRow = (
      <tr>
        {headers.map(header => {
          return <th>{header}</th>
        })}
      </tr>
    )
    return headerRow
  }

  const renderRows = () => {
    return props.wo.exercises.map(ex => {
      return (
        <tr>
        <td style={{ border: '1px solid #333' }} >
          {ex.name}
        </td>
        <td style={{ border: '1px solid #333' }} >
          {ex.targetReps}
        </td>
        {props.wo.sets.map(set => {
          let exercise = set.exercises.find( setEx => Number(setEx.id) === Number(ex.id) )
          return(
            <td style={{ border: '1px solid #333' }}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div
                        style={{
                          width: '45px',
                          display: 'inline-block',
                          float: 'left'
                        }}
                      >
                        <label style={{ width: '25px' }}>{'weight'}</label>
                      </div>
                      <input
                        type='text'
                        placeholder={'enter weight'}
                        value={exercise.weight}
                        style={{
                          backgroundColor: '#eee',
                          marginLeft: '3px',
                          width: '100px',
                          height: '22px',
                          lineHeight: '11px'
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div
                        style={{
                          width: '45px',
                          display: 'inline-block',
                          float: 'left'
                        }}
                      >
                        <label style={{ width: '25px' }}>{'reps'}</label>
                      </div>
                      <input
                        type='text'
                        placeholder={'enter reps'}
                        value={exercise.reps}
                        style={{
                          marginLeft: '3px',
                          width: '100px',
                          height: '22px',
                          lineHeight: '11px'
                        }}
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
      <table style={{ border: '1px solid black' }}>
        <tbody>
          {renderHeaderRow()}
          {renderRows()}
        </tbody>
      </table>
    </React.Fragment>
  )
}

Workout.defaultProps = {
  wo: sampleWo
}

export default Workout
