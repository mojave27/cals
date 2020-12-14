import React from 'react'
import ProgramContext from './ProgramContext'

const emptyProgram = {
    'id': '',
    'name': '',
    'description': '',
    'workouts': [],
    'workoutIds': []
  }

class ProgramProvider extends React.Component {
    state = {
        program: {...emptyProgram},
        programs: []
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
                }
            }}>
                {this.props.children}
            </ProgramContext.Provider>
        )
    }

}

export default ProgramProvider