import React from 'react'
import TrackerContext from './TrackerContext'

const emptyWorkout = {
    id: null,
    name: '',
    description: '',
    sets: [],
    days: []
}

class TrackerProvider extends React.Component {
    state = {
        activeWorkout: {},
        newWorkout: {},
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
                    program.workouts.push(workout)
                    this.setState({program})
                },
                updateWorkoutsForProgram: workouts => {
                    const program = Object.assign({}, this.state.program)
                    program.workouts = workouts
                    // console.log(`***************************************`)
                    // console.log(`program.workouts from context provider:`)
                    // console.log(JSON.stringify(program.workouts))
                    this.setState({program})
                },

                programs: this.state.programs,
                updatePrograms: programs => {
                    this.setState({ programs })
                },
                clearPrograms: () => {
                    this.setState({ programs: [] })
                },

                activeWorkout: this.state.activeWorkout,
                setActiveWorkout: id => {
                    let workout = this.state.program.workouts.find( wo => Number(wo.id) === Number(id))
                    this.setState({activeWorkout: workout})
                },
                updateActiveWorkout: workout => {
                    this.setState({activeWorkout: workout})
                },
                clearActiveWorkout: () => {
                    this.setState({ activeWorkout: {} })
                },

                newWorkout: this.state.newWorkout,
                setNewWorkout: () => {
                    this.setState({newWorkout: emptyWorkout})
                },
                updateNewWorkout: workout => {
                    this.setState({newWorkout: workout})
                },
                clearNewWorkout: () => {
                    this.setState({ newWorkout: {} })
                }
            }}>
                {this.props.children}
            </TrackerContext.Provider>
        )
    }

}

export default TrackerProvider