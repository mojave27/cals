import React from 'react'
import ProgramContext from './ProgramContext'
import { generateNewId, findIndexOfId } from '../components/modules/common/utilties/ArrayUtils'
import { cloneDeep } from 'lodash'

const emptyProgram = {
  id: '',
  name: '',
  description: '',
  cardio: [],
  workouts: [],
  workoutIds: [],
  schedule: {
    days: []
  }
}

const emptyScheduleDay = {
  id: -1,
  name: 'day one',
  routine: {
    cardio: [],
    workouts: []
  }
}

class ProgramProvider extends React.Component {
  state = {
    program: { ...emptyProgram },
    programs: []
  }

  addSchedule = () => {
    this.setState(prevState => {
      return { ...prevState, schedule: { days: [] } }
    })
  }

  copyProgramFromState = () => {
    const program = Object.assign({}, this.state.program)
    return program
  }

  render() {
    return (
      <ProgramContext.Provider
        value={{
          program: this.state.program,
          clearProgram: () => {
            this.setState({ program: emptyProgram })
          },
          updateProgram: program => {
            this.setState({ program })
          },
          addCardio: cardio => {
            this.setState(prevState => {
              let program = prevState.program
              program.cardio.push(cardio)
              return { program }
            })
          },
          addWorkout: workout => {
            this.setState(prevState => {
              let program = prevState.program
              program.workouts.push(workout)
              program.workoutIds.push(workout.id)
              return { program }
            })
          },
          addWorkouts: workouts => {
            this.setState(prevState => {
              let program = prevState.program
              workouts.forEach(wo => {
                program.workouts.push(wo)
                program.workoutIds.push(wo.id)
              })
              return { program }
            })
          },
          addCardioToSchedule: (dayId, cardioId) => {
            this.setState(prevState => {
              let program = prevState.program
              let index = findIndexOfId(dayId, program.schedule.days)
              program.schedule.days[index].routine.cardio.push(cardioId)
              return { program }
            })
          },
          addCardioRoutinesToSchedule: (dayId, cardioIds) => {
            this.setState(prevState => {
              let program = prevState.program
              cardioIds.forEach(cardioId => {
                let index = findIndexOfId(dayId, program.schedule.days)
                program.schedule.days[index].routine.cardio.push(cardioId)
              })
              return { program }
            })
          },
          addWorkoutToSchedule: (dayId, workoutId) => {
            this.setState(prevState => {
              let program = prevState.program
              let index = findIndexOfId(dayId, program.schedule.days)
              program.schedule.days[index].routine.workouts.push(workoutId)
              return { program }
            })
          },
          addWorkoutsToSchedule: (dayId, workoutIds) => {
            this.setState(prevState => {
              let program = prevState.program
              workoutIds.forEach(woId => {
                let index = findIndexOfId(dayId, program.schedule.days)
                program.schedule.days[index].routine.workouts.push(woId)
              })
              return { program }
            })
          },
          addWorkoutId: workoutId => {
            this.setState(prevState => {
              let program = prevState.program
              program.workoutIds.push(workoutId)
              return { program }
            })
          },
          updateWorkoutsForPrograms: workouts => {
            const program = this.copyProgramFromState()
            program.workouts = workouts
            this.setState({ program })
          },
          deleteWorkoutFromProgram: workoutId => {
            const program = this.copyProgramFromState()
            let workouts = program.workouts.filter(wo => wo.id !== workoutId)
            let workoutIds = program.workoutIds.filter(woId => woId !== workoutId)
            let updatedDays = program.schedule.days.map(day => {
              let workouts = day.routine.workouts.filter(woId => woId !== workoutId)
              day.routine.workouts = workouts
              return day
            })
            let updatedProgram = {
              ...program,
              workouts,
              workoutIds,
              schedule: { days: updatedDays }
            }
            this.setState({ program: updatedProgram })
          },
          programs: this.state.programs,
          updatePrograms: programs => {
            this.setState({ programs })
          },
          clearPrograms: () => {
            this.setState({ programs: [] })
          },
          addDayToSchedule: () => {
            let day = cloneDeep(emptyScheduleDay)
            console.log('adding empty day to schedule')

            // this is transitional logic - bc programs created early on didn't have schedules
            if (this.state.program.schedule === undefined) {
              console.log('adding schedule and day')
              day.id = 0
              day.name = `day 1`
              let schedule = { days: [day] }
              this.setState(prevState => {
                return { ...prevState, schedule }
              })
            } else {
              day.id = generateNewId(this.state.program.schedule.days)
              day.name = `day ${day.id + 1}`
              console.log('adding day to existing schedule: ')
              console.log(day)
              this.setState(prevState => {
                let schedule = prevState.program.schedule
                schedule.days.push(day)
                return { ...prevState, schedule }
              })
            }
          }
        }}
      >
        {this.props.children}
      </ProgramContext.Provider>
    )
  }
}

export default ProgramProvider
