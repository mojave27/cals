import React from 'react'
import TrackerContext from './TrackerContext'

class TrackerProvider extends React.Component {
    state = {
        program: {},
        programs: []
    }

    render() {
        return (
            <TrackerContext.Provider value={{
                program: this.state.program,
                clearProgram: () => {
                    this.setState({ program: {} })
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
            </TrackerContext.Provider>
        )
    }

}

export default TrackerProvider