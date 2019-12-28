/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import WorkoutTracker from './WorkoutTracker'
import {
  cardNoHover,
  cardTitle,
  cardInfo,
  closeButton
} from '../../styles/main-styles'
import { tab, tabContent } from '../../styles/programTracker.styles'

//TODO: change to use this.props.program...
const testProgram = {
  name: 'Natties Test',
  description: 'this will be the nattie program',
  id: '1',
  workouts: [
    {
      id: 1,
      name: 'Nattie W1',
      description: 'n/a',
      type: 'pull',
      dates: [{ id: 0, date: 'Fri Dec 27, 2019' }],
      sets: [
        {
          id: 0,
          exercises: [
            {
              id: 0,
              reps: 'max',
              name: 'chins',
              type: 'compound',
              dates: [{ date: 0, weight: 'bw', actualReps: '8' }]
            },
            {
              id: 8,
              reps: 'max',
              name: 'glute bridge',
              type: 'compound',
              dates: [{ date: 0, weight: 'bw', actualReps: '8' }]
            },
            {
              id: 11,
              reps: 'max',
              name: 'bb curl',
              type: 'isolation',
              dates: [{ date: 0, weight: 'bw', actualReps: '8' }]
            }
          ]
        },
        {
          id: 321,
          exercises: [
            {
              id: 0,
              reps: '6-8-10',
              name: 'chins',
              type: 'compound'
            },
            {
              id: 8,
              reps: 'myo reps',
              name: 'glute bridge',
              type: 'compound'
            },
            {
              id: 11,
              reps: 'bb curl',
              name: 'bb curl',
              type: 'isolation',
              dates: [
                { date: 0, weight: '22,17,12,2', actualReps: '6-8-10-20' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Nattie W2',
      description: 'n/a',
      type: 'push',
      sets: [
        {
          id: 0,
          exercises: [
            {
              id: 0,
              reps: 'max',
              name: 'chins',
              type: 'compound'
            },
            {
              id: 8,
              reps: 'max',
              name: 'glute bridge',
              type: 'compound'
            },
            {
              id: 9,
              reps: 'max',
              name: 'inv row',
              type: 'compound'
            },
            {
              id: 10,
              reps: 'max',
              name: 'leg curl',
              type: 'isolation'
            },
            {
              id: 11,
              reps: 'max',
              name: 'bb curl',
              type: 'isolation'
            }
          ]
        },
        {
          id: 1,
          exercises: [
            {
              id: 0,
              reps: '6-8-10',
              name: 'chins',
              type: 'compound'
            },
            {
              id: 8,
              reps: 'myo reps',
              name: 'glute bridge',
              type: 'compound'
            },
            {
              id: 9,
              reps: 'myo reps',
              name: 'inv row',
              type: 'compound'
            },
            {
              id: 10,
              reps: 'myo reps',
              name: 'leg curl',
              type: 'isolation'
            },
            {
              id: 11,
              reps: 'bb curl',
              name: 'bb curl',
              type: 'isolation'
            }
          ]
        },
        {
          id: 3,
          exercises: [
            {
              id: 15,
              reps: '3x20',
              name: 'calves',
              type: 'isolation'
            }
          ]
        },
        {
          exercises: [
            {
              id: 0,
              reps: 'max',
              name: 'chins',
              type: 'compound'
            }
          ],
          id: 341
        }
      ]
    }
  ]
}

const City = props => {
  return props.active ? (
    <div id={props.name} css={tabContent}>
      <h3>{props.name}</h3>
      <p>{props.message}</p>
    </div>
  ) : null
}

const testCities = [
  { id: 0, name: 'London', message: 'London is the capital of England.' },
  { id: 1, name: 'Paris', message: 'Paris is the capital of France.' },
  { id: 2, name: 'Tokyo', message: 'Tokyo is the capital of Japan.' }
]

class ProgramTracker extends React.Component {
  state = {
    program: testProgram,
    cities: [...testCities],
    activeCity: -1,
    activeWorkout: -1
  }

  render() {
    return (
      <div css={cardNoHover} id={testProgram.id}>
        <span css={closeButton} onClick={this.handleClose}>
          &times;
        </span>
        <div css={cardTitle}>{testProgram.name}</div>
        <div css={cardInfo}>{testProgram.description}</div>

        {/* Tab links */}
        <div css={tab}>{this.renderTabs()}</div>
        {/* <!-- Tab content --> */}
        <div style={{padding:'25px'}}>{this.renderWorkout()}</div>
      </div>
    )
  }

  renderTabs = () => {
    return this.state.program.workouts.map(wo => {
      let active = Number(this.state.activeWorkout) === Number(wo.id)
      let className = active ? 'active' : 'inactive'
      return (
        <button
          key={wo.id}
          id={wo.id}
          className={className}
          name={wo.name}
          onClick={this.openWorkout}
        >
          {wo.name}
        </button>
      )
    })
  }

  renderWorkout = () => {
    return this.state.program.workouts.map(wo => {
      let active = Number(this.state.activeWorkout) === Number(wo.id)
      console.log(`wo.id ${wo.id} active - ${active}`)
      if (active){
        return <WorkoutTracker key={wo.id} workout={wo} />
      }
    })
  }

  openWorkout = event => {
    let id = event.target.id
    this.setState({ activeWorkout: id })
  }

  openCity = event => {
    let id = event.target.id
    this.setState({ activeCity: id })
  }
}

export default ProgramTracker
