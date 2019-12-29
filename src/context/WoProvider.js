import React from 'react'
import WoContext from './WoContext'
import { findIndexOfId, updateItemById } from '../components/ArrayUtils'

export const emptyWorkout = {
    "name": "",
    "description": "",
    "type": "",
    "dates": [],
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
                saveWorkoutInWorkoutsList: workout => {
                    let workouts = [...this.state.workouts]
                    if ( workout.id ) {
                        let index = findIndexOfId(workout.id, workouts)
                        if (index > -1) {
                            updateItemById(workout, workout.id, workouts)
                        }else{
                            workouts.push(workout)
                        }
                    }else{
                        workouts.push(workout)
                    }
                    this.setState({workouts})
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