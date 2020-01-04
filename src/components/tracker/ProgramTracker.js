/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext, useState } from 'react'
import WorkoutTracker from './WorkoutTracker'
import { addProgram, updateProgram } from '../../api/programsApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { cardTitle, cardInfo, closeButton } from '../../styles/main-styles'
import { tab } from '../../styles/programTracker.styles'
import { getReadableDate } from '../DateUtils'
import { generateNewId } from '../ArrayUtils'
import TrackerContext from '../../context/TrackerContext'

const ProgramTracker = props => {
  let context = useContext(TrackerContext)
  let [activeWorkout, setActiveWorkout] = useState(-1)


  const renderTabs = () => {
    let tabs = context.program.workouts.map(wo => {
      let active = Number(activeWorkout) === Number(wo.id)
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
      let active = Number(activeWorkout) === Number(wo.id)
      if (active) {
        return (
          <WorkoutTracker
            key={wo.id}
            workout={wo}
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
    setActiveWorkout(id)
  }

  const closeWorkout = () => {
    setActiveWorkout(-1)
  }

  const updateSet = async update => {
    console.log('#####################')
    console.log(`update: ${JSON.stringify(update)}`)

    // let workout = getWorkoutById(update.workoutId)
    // let index = workout.sets.findIndex(
    //   set => Number(set.id) === Number(update.set.setId)
    // )
    // workout.sets[index] = update.set
    // console.log('%%%%%%%%%%%%%%%%%%%%%')
    // console.log(JSON.stringify(workout))

    // let workouts = context.program.workouts
    // let targetWorkout = workouts.find( wo => Number(wo.id) === Number(workout.id))
    // console.log('$$$$$$$$$$$$$$$$$$$$$')
    // console.log(JSON.stringify(targetWorkout))

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

  // newDay = {"id": 0, "date": "1/1/20", "sets":[ {"id":0, "exercises":[{"id":3, "weight":"10", "actualReps":"12"}]} ]}
  const addDay = workoutId => {
    console.log(`workout id: ${workoutId}`)

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
    let workout = getWorkoutById(workoutId)
    let days = workout.days ? [...workout.days] : []
    return days
  }

  const getWorkoutById = id => {
    let workouts = context.program.workouts
    let index = workouts.findIndex(wo => Number(wo.id) === Number(id))
    return workouts[index]
  }

  const getWorkoutIndex = workoutId => {
    let workouts = context.program.workouts
    let index = workouts.findIndex(set => Number(set.id) === Number(workoutId))
    return index
  }

  return (
    // <div css={cardNoHover} id={state.program.id}>
    <div id={context.program.id}>
      <span css={closeButton} onClick={handleClose}>
        &times;
      </span>
      <div css={cardTitle}>{context.program.name}</div>
      <div css={cardInfo}>{context.program.description}</div>

      {/* Tab links */}
      <div css={tab}>{renderTabs()}</div>
      {/* <!-- Tab content --> */}
      <div style={{ padding: '25px' }}>{renderWorkout()}</div>
    </div>
  )
}

export default ProgramTracker
