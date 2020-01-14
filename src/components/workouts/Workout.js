/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
// import { detailCard, container, stripe } from '../../styles/main-styles'
import SetCard from '../sets/SetCard'

const Workout = props => {

  return (
    <React.Fragment>
      <table style={{ border: '1px solid black' }}>
        <tbody>
          <tr>
            <th>{'exercise'}</th>
            <th>{'set'}</th>
            <th>{'set'}</th>
            <th>{'set'}</th>
          </tr>
          <tr>
            <td style={{ border: '1px solid #333' }} rowSpan={2}>
              {'dips'}
            </td>
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
            <td style={{ border: '1px solid #333' }}>
              <table>
                <tbody>
                  <tr>
                    <td>weight</td>
                  </tr>
                  <tr>
                    <td>reps</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td style={{ border: '1px solid #333' }}>
              <table>
                <tbody>
                  <tr>
                    <td>weight</td>
                  </tr>
                  <tr>
                    <td>reps</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Workout
