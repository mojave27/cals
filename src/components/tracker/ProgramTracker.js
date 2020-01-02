/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import WorkoutTracker from './WorkoutTracker'
import { addProgram, updateProgram } from '../../api/programsApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {
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
      name: 'W1',
      description: 'n/a',
      id: 0,
      sets: [
        {
          id: 10,
          exercises: [{ id: 3, name: 'jammer', type: 'isolation', reps: '' }]
        }
      ],
      days: [
        {
          id: 0,
          date: '1/1/20',
          sets: [
            { id: 10, exercises: [{ id: 3, weight: '10', actualReps: '12' }] }
          ]
        }
      ]
    }
  ]
}

// TODO: pass in the program id, retrieve the program from componentDidMount, and set to set
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
    let tabs = this.state.program.workouts.map(wo => {
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
    tabs.push(
      <button key={'addTab'} name={'addTab'} onClick={this.addTab}>
        <FontAwesomeIcon alt={'add date'} icon={faPlus} onClick={this.addTab} />
      </button>
    )
    return tabs
  }

  renderWorkout = () => {
    return this.state.program.workouts.map(wo => {
      let active = Number(this.state.activeWorkout) === Number(wo.id)
      if (active) {
        return (
          <WorkoutTracker
            key={wo.id}
            workout={wo}
            addDate={this.addDay}
            done={this.closeWorkout}
            save={this.save}
            update={this.updateWorkout}
          />
        )
      }
    })
  }

  addTab = () => {
    console.log('add tab')
  }

  openWorkout = event => {
    let id = event.target.id
    this.setState({ activeWorkout: id })
  }

  closeWorkout = () => {
    this.setState({ activeWorkout: -1})
  }

  //TODO: can remove the 'index' step, and move it to the getWorkout... function.  
  //      we don't need to retain it here.
  updateWorkout = async update => {
    // find set, and date, then update the exercise.
    let woIndex = this.getWorkoutIndex(update.workoutId)
    let workout = this.state.program.workouts[woIndex]

    let day = workout.days.find( oneDay => {
      return Number(oneDay.id) === Number(update.dayId)
    })

    let set = day.sets.find( set => {
      return Number(set.id) === Number(update.setId)
    })

    let exIndex = set.exercises.findIndex(
      ex => Number(ex.id) === Number(update.exerciseId)
    )
    let exercise = set.exercises[exIndex]
    exercise[update.name] = update.value

    // await updateWo(workout)

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

  // newDay = {"id": 0, "date": "1/1/20", "sets":[ {"id":0, "exercises":[{"id":3, "weight":"10", "actualReps":"12"}]} ]}
  addDay = (workoutId) => {
    console.log(`workout id: ${workoutId}`)

    let workouts = this.state.program.workouts
    let woIndex = this.getWorkoutIndex(workoutId)
    let workout = workouts[woIndex]

    // add date to workout.dates
    let days = this.getDaysFromWorkout(workoutId)
    let friendlyDate = getReadableDate()
    let dayId = generateNewId(days)
    // create stripped-down sets array to be used in Day.
    let setsForDay = workout.sets.map( set => {
      return {
        id: set.id,
        exercises: set.exercises.map( ex => {
          return { id: ex.id, weight:'', actualReps: ''}
        })
      }
    })
    days.push({ id: dayId, date: friendlyDate, sets: setsForDay })
    workout.days = days
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

  getDaysFromWorkout = workoutId => {
    let workout = this.getWorkoutById(workoutId)
    let days = workout.days ? [...workout.days] : []
    return days
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
