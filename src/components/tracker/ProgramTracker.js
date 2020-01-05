/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext } from 'react'
import WorkoutTracker from './WorkoutTracker'
import { addProgram, updateProgram } from '../../api/programsApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { cardTitle, cardInfo, closeButton } from '../../styles/main-styles'
import { tab } from '../../styles/programTracker.styles'
import { getReadableDate } from '../DateUtils'
import { generateNewId } from '../ArrayUtils'
import TrackerContext from '../../context/TrackerContext'
import { difference, get } from 'lodash'

const ProgramTracker = props => {
  let context = useContext(TrackerContext)

  const renderTabs = () => {
    let tabs = context.program.workouts.map(wo => {
      let activeWorkoutId = get(context.program, 'activeWorkout.id', -1)
      let active = Number(activeWorkoutId) === Number(wo.id)
      let className = active ? 'active' : 'inactive'
      return (
        <button
          key={wo.id}
          id={wo.id}
          className={className}
          name={wo.name}
          onClick={openWorkout}
        >
          {wo.name}
        </button>
      )
    })
    tabs.push(
      <button key={'addTab'} name={'addTab'} onClick={addTab}>
        <FontAwesomeIcon alt={'add date'} icon={faPlus} onClick={addTab} />
      </button>
    )
    return tabs
  }

  const renderWorkout = () => {
    return context.program.workouts.map(wo => {
      // can probably get rid of this check once context is working in workoutTracker.
      // workoout tracker will just render the activeWorkout from context.
      // will just need to check if there is an activeWorkout or not.  if so, render; if not, don't.
      let active = Number(context.activeWorkout.id) === Number(wo.id)
      if (active) {
        return (
          <WorkoutTracker
            key={wo.id}
            // workout={wo}
            addDate={addDay}
            done={closeWorkout}
            save={save}
            update={updateWorkout}
            updateSet={updateSet}
          />
        )
      }
    })
  }

  const addTab = () => {
    console.log('add tab')
  }

  const openWorkout = event => {
    let id = event.target.id
    context.setActiveWorkout(id)
  }

  const closeWorkout = () => {
    context.clearActiveWorkout()
  }

  const updateSet = async update => {
    let { index, workout } = getWorkoutById(update.workoutId)
    let setIndex = workout.sets.findIndex(
      set => Number(set.id) === Number(update.set.id)
    )

    if (setIndex < 0) {
      throw new Error(`setIndex invalid: ${setIndex}`)
    }
    // update the set w/in the workout.days.sets
    // get the id of the new exercise
    let updateIds = getIdsFromList(update.set.exercises)
    let currIds = getIdsFromList(workout.sets[setIndex].exercises)
    let newExerciseIds = difference(updateIds, currIds)

    let days = workout.days.map(day => {
      let sets = day.sets.map(set => {
        if (Number(set.id) === Number(update.set.id)) {
          for (let i = 0; i < newExerciseIds.length; i++) {
            set.exercises.push({
              id: newExerciseIds[i],
              weight: '',
              actualReps: ''
            })
          }
        }
        return set
      })
      day.sets = sets
      return day
    })

    workout.days = days

    // update the set in workout.sets
    workout.sets[setIndex] = update.set

    let workouts = context.program.workouts
    workouts[index] = workout
    await context.updateWorkoutsForProgram(workouts)
    console.log('updated workout with new exercise(s)')
  }

  const getIdsFromList = list => {
    let ids = list.map(item => item.id)
    return ids
  }

  //TODO: can remove the 'index' step, and move it to the getWorkout... function.
  //      we don't need to retain it here.
  const updateWorkout = async update => {
    // find set, and date, then update the exercise.
    let woIndex = getWorkoutIndex(update.workoutId)
    let workout = context.program.workouts[woIndex]

    let day = workout.days.find(oneDay => {
      return Number(oneDay.id) === Number(update.dayId)
    })

    let set = day.sets.find(set => {
      return Number(set.id) === Number(update.setId)
    })

    let exIndex = set.exercises.findIndex(
      ex => Number(ex.id) === Number(update.exerciseId)
    )
    let exercise = set.exercises[exIndex]
    exercise[update.name] = update.value

    let program = context.program
    program.workouts[woIndex] = workout
    context.updateProgram(program)
  }

  const save = () => {
    let program = context.program
    // send to api
    if (program.id) {
      updateProgram(program)
    } else {
      addProgram(program)
    }
  }

  const addDay = workoutId => {
    let workouts = context.program.workouts
    let woIndex = getWorkoutIndex(workoutId)
    let workout = workouts[woIndex]

    // add date to workout.dates
    let days = getDaysFromWorkout(workoutId)
    let friendlyDate = getReadableDate()
    let dayId = generateNewId(days)
    // create stripped-down sets array to be used in Day.
    let setsForDay = workout.sets.map(set => {
      return {
        id: set.id,
        exercises: set.exercises.map(ex => {
          return { id: ex.id, weight: '', actualReps: '' }
        })
      }
    })
    days.push({ id: dayId, date: friendlyDate, sets: setsForDay })
    workout.days = days
    workouts[woIndex] = workout

    // now, put all the updates into state
    let program = context.program
    program.workouts = workouts
    context.updateProgram(program)
  }

  const handleClose = () => {
    props.close()
  }

  const getDaysFromWorkout = workoutId => {
    let { index, workout } = getWorkoutById(workoutId)
    let days = workout.days ? [...workout.days] : []
    return days
  }

  const getWorkoutById = id => {
    let workouts = context.program.workouts
    let index = workouts.findIndex(wo => Number(wo.id) === Number(id))
    let workoutWithIndex = {
      index: index,
      workout: workouts[index]
    }
    return workoutWithIndex
  }

  const getWorkoutIndex = workoutId => {
    let workouts = context.program.workouts
    let index = workouts.findIndex(set => Number(set.id) === Number(workoutId))
    return index
  }

  return (
    <div id={context.program.id}>
      <span css={closeButton} onClick={handleClose}>
        &times;
      </span>
      <div css={cardTitle}>{context.program.name}</div>
      <div css={cardInfo}>{context.program.description}</div>

      {/* Tabs */}
      <div css={tab}>{renderTabs()}</div>
      {/* <!-- Tab content --> */}
      <div style={{ padding: '25px' }}>{renderWorkout()}</div>
    </div>
  )
}

export default ProgramTracker
