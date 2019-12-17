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
        workout: {...emptyWorkout}
    }

    render() {
        return (
            <WoContext.Provider value={{
                workout: this.state.workout,
                updateWorkout: workout => {
                    this.setState({ workout })
                },
                addSet: set => {
                    const workout = Object.assign({}, this.state.workout)
                    workout.set.push(set)
                    this.setState(workout)
                },
                updateSetsForWorkout: set => {
                    const workout = Object.assign({}, this.state.workout)
                    workout.set = set
                    this.setState(workout)
                }
            }}>
                {this.props.children}
            </WoContext.Provider>
        )
    }

}

export default WoProvider