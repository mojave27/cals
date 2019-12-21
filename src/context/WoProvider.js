import React from 'react'
import WoContext from './WoContext'

const emptyWorkout = {
    "name": "",
    "description": "",
    "type": "",
    "sets": []
  }

class WoProvider extends React.Component {
    state = {
        workout: {...emptyWorkout},
        workouts: []
    }

    render() {
        return (
            <WoContext.Provider value={{
                workout: this.state.workout,
                updateWorkout: workout => {
                    this.setState({ workout })
                },
                setEmptyWorkout: () => {
                    this.setState({ workout: emptyWorkout })
                },
                addSet: set => {
                    const workout = Object.assign({}, this.state.workout)
                    workout.set.push(set)
                    this.setState({workout})
                },
                updateSetsForWorkout: sets => {
                    const workout = Object.assign({}, this.state.workout)
                    workout.sets = sets
                    this.setState({workout})
                },
                workouts: this.state.workouts,
                updateWorkouts: workouts => {
                    this.setState({ workouts })
                },
                clearWorkouts: () => {
                    this.setState({ workouts: [] })
                }
            }}>
                {this.props.children}
            </WoContext.Provider>
        )
    }

}

export default WoProvider