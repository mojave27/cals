/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import WorkoutTracker from './WorkoutTracker'
import { addProgram, updateProgram } from '../../api/programsApi'
import { updateWorkout as updateWo } from '../../api/workoutsApi'
import { isUndefined } from 'lodash'
import {
  cardNoHover,
  cardTitle,
  cardInfo,
  closeButton
} from '../../styles/main-styles'
import { tab } from '../../styles/programTracker.styles'
import { getReadableDate } from '../DateUtils'
import { generateNewId } from '../ArrayUtils'

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
      dates: [
        { id: 0, date: 'Fri Dec 20, 2019' },
        { id: 1, date: 'Fri Dec 27, 2019' }
      ],
      sets: [
        {
          id: 0,
          exercises: [
            {
              id: 0,
              reps: 'max',
              name: 'chins',
              type: 'compound',
              dates: [
                { id: 0, weight: 'bw', actualReps: '8' },
                { id: 1, weight: 'bw', actualReps: '6' }
              ]
            },
            {
              id: 8,
              reps: 'max',
              name: 'glute bridge',
              type: 'compound',
              dates: [
                { id: 0, weight: '90', actualReps: '8' },
                { id: 1, weight: '90', actualReps: '9' }
              ]
            },
            {
              id: 11,
              reps: 'max',
              name: 'bb curl',
              type: 'isolation',
              dates: [
                { id: 0, weight: '10', actualReps: '8' },
                { id: 1, weight: '10', actualReps: '8' }
              ]
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
              type: 'compound',
              dates: [
                { id: 0, weight: '15', actualReps: '5,4,3,2,1' },
                { id: 1, weight: '', actualReps: '' }
              ]
            },
            {
              id: 8,
              reps: 'myo reps',
              name: 'glute bridge',
              type: 'compound',
              dates: [
                { id: 0, weight: '110', actualReps: '9+3+3+2' },
                { id: 1, weight: '120', actualReps: '8+3+3+1' }
              ]
            },
            {
              id: 11,
              reps: 'bb curl',
              name: 'bb curl',
              type: 'isolation',
              dates: [
                { id: 0, weight: '22,17,12,2', actualReps: '6-8-10-20' },
                { id: 1, weight: '', actualReps: '' }
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
      dates: [
        { id: 0, date: 'Fri Dec 20, 2019' },
        { id: 1, date: 'Fri Dec 27, 2019' }
      ],
      sets: [
        {
          id: 0,
          exercises: [
            {
              id: 0,
              reps: 'max',
              name: 'chins',
              type: 'compound',
              dates: [
                { id: 0, weight: '', actualReps: '' },
                { id: 1, weight: '', actualReps: '' }
              ]
            },
            {
              id: 8,
              reps: 'max',
              name: 'glute bridge',
              type: 'compound',
              dates: [
                { id: 0, weight: '', actualReps: '' },
                { id: 1, weight: '', actualReps: '' }
              ]
            },
            {
              id: 9,
              reps: 'max',
              name: 'inv row',
              type: 'compound',
              dates: [
                { id: 0, weight: '', actualReps: '' },
                { id: 1, weight: '', actualReps: '' }
              ]
            },
            {
              id: 10,
              reps: 'max',
              name: 'leg curl',
              type: 'isolation',
              dates: [
                { id: 0, weight: '', actualReps: '' },
                { id: 1, weight: '', actualReps: '' }
              ]
            },
            {
              id: 11,
              reps: 'max',
              name: 'bb curl',
              type: 'isolation',
              dates: [
                { id: 0, weight: '', actualReps: '' },
                { id: 1, weight: '', actualReps: '' }
              ]
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
              type: 'compound',
              dates: [
                { id: 0, weight: '', actualReps: '' },
                { id: 1, weight: '', actualReps: '' }
              ]
            },
            {
              id: 8,
              reps: 'myo reps',
              name: 'glute bridge',
              type: 'compound',
              dates: [
                { id: 0, weight: '', actualReps: '' },
                { id: 1, weight: '', actualReps: '' }
              ]
            },
            {
              id: 9,
              reps: 'myo reps',
              name: 'inv row',
              type: 'compound',
              dates: [
                { id: 0, weight: '', actualReps: '' },
                { id: 1, weight: '', actualReps: '' }
              ]
            },
            {
              id: 10,
              reps: 'myo reps',
              name: 'leg curl',
              type: 'isolation',
              dates: [
                { id: 0, weight: '', actualReps: '' },
                { id: 1, weight: '', actualReps: '' }
              ]
            },
            {
              id: 11,
              reps: 'bb curl',
              name: 'bb curl',
              type: 'isolation',
              dates: [
                { id: 0, weight: '', actualReps: '' },
                { id: 1, weight: '', actualReps: '' }
              ]
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
              type: 'isolation',
              dates: [
                { id: 0, weight: '', actualReps: '' },
                { id: 1, weight: '', actualReps: '' }
              ]
            }
          ]
        },
        {
          exercises: [
            {
              id: 0,
              reps: 'max',
              name: 'chins',
              type: 'compound',
              dates: [
                { id: 0, weight: '', actualReps: '' },
                { id: 1, weight: '', actualReps: '' }
              ]
            }
          ],
          id: 341
        }
      ]
    }
  ]
}

class ProgramTracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // program: testProgram,
      program: props.program,
      activeWorkout: -1
    }
  }

  render() {
    return (
      // <div css={cardNoHover} id={this.state.program.id}>
      <div id={this.state.program.id}>
        <span css={closeButton} onClick={this.handleClose}>
          &times;
        </span>
        <div css={cardTitle}>{this.state.program.name}</div>
        <div css={cardInfo}>{this.state.program.description}</div>

        {/* Tab links */}
        <div css={tab}>{this.renderTabs()}</div>
        {/* <!-- Tab content --> */}
        <div style={{ padding: '25px' }}>{this.renderWorkout()}</div>
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
      if (active) {
        return (
          <WorkoutTracker
            key={wo.id}
            workout={wo}
            update={this.updateWorkout}
            addDate={this.addDate}
            save={this.save}
          />
        )
      }
    })
  }

  openWorkout = event => {
    let id = event.target.id
    this.setState({ activeWorkout: id })
  }

  updateWorkout = update => {
    // {"dateId":"1","setId":0,"exerciseId":"0","name":"weight","value":"bw9"}
    // find set, and date, then update the exercise.
    let woIndex = this.getWorkoutIndex(update.workoutId)
    let workout = this.state.program.workouts[woIndex]
    let setIndex = this.getSetIndex(workout, update.setId)
    let set = workout.sets[setIndex]
    let exIndex = set.exercises.findIndex(
      ex => Number(ex.id) === Number(update.exerciseId)
    )
    let exercise = set.exercises[exIndex]
    let dateIndex = exercise.dates.findIndex(
      date => Number(date.id) === Number(update.dateId)
    )

    // if(dateIndex === -1){
    //   exercise.dates.push({})
    // }

    let date = exercise.dates[dateIndex]
    date[update.name] = update.value

    updateWo(workout)

    this.setState(prevState => {
      let program = prevState.program
      program.workouts[woIndex] = workout
      return { program }
    })
  }

  save = () => {
    let program = this.state.program
    // send to api
    if (program.id) {
      updateProgram(program)
    } else {
      addProgram(this.state.program)
    }
  }

  addDate = ({ setId, workoutId }) => {
    console.log(`adding date set id: ${setId}`)
    console.log(`workout id: ${workoutId}`)

    let workouts = this.state.program.workouts
    let woIndex = this.getWorkoutIndex(workoutId)
    let workout = workouts[woIndex]
    // let setIndex = this.getSetIndex(workout, setId)

    // add date to workout.dates
    let dates = this.getDatesFromWorkout(workoutId)
    let friendlyDate = getReadableDate()
    let dateId = generateNewId(dates)
    dates.push({ id: dateId, date: friendlyDate })
    workout.dates = dates

    // add date to all exercises in workout.sets
    let updatedSets = workout.sets.map(set => {
      let updatedExercises = set.exercises.map(ex => {
        if (isUndefined(ex.dates)) {
          ex.dates = []
        }
        ex.dates.push({ id: dateId, weight: '', actualReps: '' })
        return ex
      })
      set.exercises = updatedExercises
      return set
    })
    workout.sets = updatedSets
    workouts[woIndex] = workout

    // now, put all the updates into state
    this.setState(prevState => {
      let program = prevState.program
      program.workouts = workouts
      return { program }
    })
  }

  handleClose = () => {
    this.props.close()
  }

  getDatesFromWorkout = workoutId => {
    let workout = this.getWorkoutById(workoutId)
    let dates = workout.dates ? [...workout.dates] : []
    return dates
  }

  getWorkoutById = id => {
    let workouts = this.state.program.workouts
    let index = workouts.findIndex(wo => Number(wo.id) === Number(id))
    return workouts[index]
  }

  getWorkoutIndex = workoutId => {
    let workouts = this.state.program.workouts
    let index = workouts.findIndex(set => Number(set.id) === Number(workoutId))
    return index
  }

  getSetIndex = (workout, setId) => {
    let index = workout.sets.findIndex(set => Number(set.id) === Number(setId))
    return index
  }

  getSetById = (workout, setId) => {
    let index = workout.sets.findIndex(set => Number(set.id) === Number(setId))
    return workout.sets[index]
  }
}

export default ProgramTracker
