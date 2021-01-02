import React from 'react'
import ProgramContext from './ProgramContext'
import { generateNewId, findIndexOfId } from '../components/ArrayUtils'
import { cloneDeep } from 'lodash'
// import { logger } from '../logging/logger'

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
        program: {...emptyProgram},
        programs: []
    }

    addSchedule = () => {
        this.setState(prevState => {
            return({...prevState, schedule: {days: []} })
        })
    }

    render() {
        return (
            <ProgramContext.Provider value={{
                program: this.state.program,
                clearProgram: () => {
                    this.setState({program: emptyProgram})
                },
                updateProgram: program => {
                    this.setState({ program })
                },
                addCardio: cardio => {
                    console.log(`adding cardio to context:`)
                    console.log(cardio)
                    this.setState( prevState => {
                        let program = prevState.program
                        program.cardio.push(cardio)
                        // program.workoutIds.push(workout.id)
                        return ({program})
                    })
                },
                addWorkout: workout => {
                    console.log(`adding workout to context:`)
                    console.log(workout)
                    this.setState( prevState => {
                        let program = prevState.program
                        program.workouts.push(workout)
                        program.workoutIds.push(workout.id)
                        return ({program})
                    })
                },
                addCardioToSchedule: (dayId, cardioId) => {
                    this.setState( prevState => {
                        let program = prevState.program
                        let index = findIndexOfId(dayId, program.schedule.days)
                        program.schedule.days[index].routine.cardio.push(cardioId)
                        return ({program})
                    })
                },
                addWorkoutToSchedule: (dayId, workoutId) => {
                    this.setState( prevState => {
                        let program = prevState.program
                        let index = findIndexOfId(dayId, program.schedule.days)
                        program.schedule.days[index].routine.workouts.push(workoutId)
                        return ({program})
                    })
                },
                addWorkoutId: workoutId => {
                    this.setState( prevState => {
                        let program = prevState.program
                        program.workoutIds.push(workoutId)
                        return ({program})
                    })
                },
                updateWorkoutsForPrograms: workouts => {
                    const program = Object.assign({}, this.state.program)
                    program.workouts = workouts
                    this.setState({program})
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
                        let schedule = { days: [day]}    
                        this.setState(prevState => {
                            return { ...prevState, schedule}
                        })
                    } else {
                        day.id = generateNewId(this.state.program.schedule.days)
                        day.name = `day ${day.id +1}`
                        console.log('adding day to existing schedule: ')
                        console.log(day)
                        this.setState(prevState => {
                            let schedule = prevState.program.schedule
                            schedule.days.push(day)
                            return { ...prevState, schedule}
                        })
                    }
                  },
            }}>
                {this.props.children}
            </ProgramContext.Provider>
        )
    }

}

export default ProgramProvider