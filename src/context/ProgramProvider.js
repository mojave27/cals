import React from 'react'
import ProgramContext from './ProgramContext'

const emptyProgram = {
    'name': '',
    'description': '',
    'workouts': []
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
                    const program = Object.assign({}, this.state.program)
                    program.workout.push(workout)
                    this.setState({program})
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