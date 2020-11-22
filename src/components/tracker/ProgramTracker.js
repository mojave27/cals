/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
// import { cardTitle, cardInfo, closeButton } from '../../styles/main-styles'
import { styles } from '../../styles/MainStyles'
import { styles as programStyles } from '../../styles/ProgramStyles'
import { gridStyles } from '../../styles/gridStyles'
// import { tab } from '../../styles/programTracker.styles'
import { generateNewId } from '../ArrayUtils'
import TrackerContext from '../../context/TrackerContext'
import ThemeContext from '../../context/ThemeContext'
import { get, isEmpty } from 'lodash'
import Table from '../tables/SimpleTable'
import BlockHeader from '../BlockHeader'

//TODO: verify we don't need a context provider for the tracker anymore - if so, remove
const ProgramTracker = props => {
  let themeContext = useContext(ThemeContext)
  let context = useContext(TrackerContext)
  // let [showAddWorkout, setShowAddWorkout] = useState(false)

  let { cardTitle, cardInfo, closeButton } = styles(themeContext.theme)
  let { gridItem } = gridStyles(themeContext.theme)
  const { setBlock, tab, workoutBlock } = programStyles(themeContext.theme)

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

  const renderExerciseGroups = exerciseGroups => {
    return exerciseGroups.map( (exGroup, index) => {
      let data = {
        headers: ['name', 'reps'],
        rows: [...exGroup.exercises]
      }
      return (
        <div key={`${exGroup.id}-${index}`} css={setBlock}>
          <Table data={data} disabled={true} />
        </div>
      )
    })
  }

  const handleWorkoutSelect = (event) => {
    let id = event.target.id
    props.workoutSelect(id)
  }

  const renderWorkout = () => {
    if (!isEmpty(context.activeWorkout)) {
      return (
        <div
        key={context.activeWorkout.id}
        id={context.activeWorkout.id}
        css={[workoutBlock, gridItem]}
        style={{ marginLeft: '5px', marginBottom: '10px' }}
        onClick={handleWorkoutSelect}
      >
        <BlockHeader
          item={context.activeWorkout}
          deleteItem={props.deleteWorkout}
          editItem={props.editWorkout}
        />
        <div>{renderExerciseGroups(context.activeWorkout.exerciseGroups)}</div>
      </div>
      )
    }
  }

  const addTab = async () => {
    console.log('add tab')
    let id = generateNewId(context.program.workouts)
    let newWorkout = {
      id: id,
      name: '',
      description: '',
      sets: [],
      days: []
    }
    await context.updateNewWorkout(newWorkout)
    // setShowAddWorkout(true)
  }

  const openWorkout = event => {
    let id = event.target.id
    context.setActiveWorkout(id)
  }

  // const done = async () => {
  //   await context.clearActiveWorkout()
  //   await setShowAddWorkout(false)
  // }

  // const closeWorkout = () => {
  //   context.clearActiveWorkout()
  // }

  // const updateSet = async update => {
  //   let { index, workout } = getWorkoutById(update.workoutId)
  //   let setIndex = workout.sets.findIndex(
  //     set => Number(set.id) === Number(update.set.id)
  //   )

  //   if (setIndex < 0) {
  //     throw new Error(`setIndex invalid: ${setIndex}`)
  //   }
  //   // update the set w/in the workout.days.sets
  //   // get the id of the new exercise
  //   let updateIds = getIdsFromList(update.set.exercises)
  //   let currIds = getIdsFromList(workout.sets[setIndex].exercises)
  //   let newExerciseIds = difference(updateIds, currIds)

  //   let days = workout.days.map(day => {
  //     let sets = day.sets.map(set => {
  //       if (Number(set.id) === Number(update.set.id)) {
  //         for (let i = 0; i < newExerciseIds.length; i++) {
  //           set.exercises.push({
  //             id: newExerciseIds[i],
  //             weight: '',
  //             actualReps: ''
  //           })
  //         }
  //       }
  //       return set
  //     })
  //     day.sets = sets
  //     return day
  //   })

  //   workout.days = days

  //   // update the set in workout.sets
  //   workout.sets[setIndex] = update.set

  //   let workouts = context.program.workouts
  //   workouts[index] = workout
  //   await context.updateWorkoutsForProgram(workouts)
  //   // console.log('updated workout with new exercise(s)')
  // }

  // const getIdsFromList = list => {
  //   let ids = list.map(item => item.id)
  //   return ids
  // }

  // const saveNewWorkout = async () => {
  //   // let workout = context.newWorkout
  //   await context.addWorkout(context.newWorkout)
  //   await save()
  // }

  //TODO: can remove the 'index' step, and move it to the getWorkout... function.
  //      we don't need to retain it here.
  // const updateWorkout = async update => {
  //   // find set, and date, then update the exercise.
  //   let woIndex = getWorkoutIndex(update.workoutId)
  //   let workout = context.program.workouts[woIndex]

  //   let day = workout.days.find(oneDay => {
  //     return Number(oneDay.id) === Number(update.dayId)
  //   })

  //   let set = day.sets.find(set => {
  //     return Number(set.id) === Number(update.setId)
  //   })

  //   let exIndex = set.exercises.findIndex(
  //     ex => Number(ex.id) === Number(update.exerciseId)
  //   )
  //   let exercise = set.exercises[exIndex]
  //   exercise[update.name] = update.value

  //   let program = context.program
  //   program.workouts[woIndex] = workout
  //   context.updateProgram(program)
  // }

  // const save = () => {
  //   let program = context.program
  //   // send to api
  //   if (program.id) {
  //     updateProgram(program)
  //   } else {
  //     addProgram(program)
  //   }
  // }

  // const addDay = workoutId => {
  //   let workouts = context.program.workouts
  //   let woIndex = getWorkoutIndex(workoutId)
  //   let workout = workouts[woIndex]

  //   // add date to workout.dates
  //   let days = getDaysFromWorkout(workoutId)
  //   let friendlyDate = getReadableDate()
  //   let dayId = generateNewId(days)
  //   // create stripped-down sets array to be used in Day.
  //   let setsForDay = workout.sets.map(set => {
  //     return {
  //       id: set.id,
  //       exercises: set.exercises.map(ex => {
  //         return { id: ex.id, weight: '', actualReps: '' }
  //       })
  //     }
  //   })
  //   days.push({ id: dayId, date: friendlyDate, sets: setsForDay })
  //   workout.days = days
  //   workouts[woIndex] = workout

  //   // now, put all the updates into state
  //   let program = context.program
  //   program.workouts = workouts
  //   context.updateProgram(program)
  // }

  const handleClose = () => {
    props.close()
  }

  // const getDaysFromWorkout = workoutId => {
  //   let { workout } = getWorkoutById(workoutId)
  //   let days = workout.days ? [...workout.days] : []
  //   return days
  // }

  // const getWorkoutById = id => {
  //   let workouts = context.program.workouts
  //   let index = workouts.findIndex(wo => Number(wo.id) === Number(id))
  //   let workoutWithIndex = {
  //     index: index,
  //     workout: workouts[index]
  //   }
  //   return workoutWithIndex
  // }

  // const getWorkoutIndex = workoutId => {
  //   let workouts = context.program.workouts
  //   let index = workouts.findIndex(set => Number(set.id) === Number(workoutId))
  //   return index
  // }

  return (
    <React.Fragment>
      {/* {showAddWorkout ? <WorkoutAddForm saveWorkout={saveNewWorkout} done={done} />
      :  */}
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
    {/* } */}
    </React.Fragment>
  )
}

export default ProgramTracker
