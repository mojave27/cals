import React from 'react'
import WoContext from './WoContext'
import { findIndexOfId, updateItemById } from '../components/ArrayUtils'

export const emptyWorkout = {
    name: '',
    description: '',
    exerciseGroups: [ { id:0, exercises: []} ],
    sets: [ {id:0, exerciseGroups: [ { id:0, exercises: []}] } ],
}

// export const emptyWorkoutTemplate = {
//   name: '',
//   description: '',
//   sets: []
// }

class WoProvider extends React.Component {
  state = {
    workout: { ...emptyWorkout },
    workouts: [],
  }

  render() {
    return (
      <WoContext.Provider
        value={{
          workout: this.state.workout,
          updateWorkout: workout => {
            this.setState({ workout })
          },
          setEmptyWorkout: () => {
            this.setState({ workout: emptyWorkout })
          },
          addExerciseGroup: exGroup => {
            const workout = Object.assign({}, this.state.workout)
            workout.exerciseGroups.push(exGroup)
            this.setState({ workout })
          },
          updateExerciseGroupsForWorkout: exGroups => {
            const workout = Object.assign({}, this.state.workout)
            workout.exerciseGroups = exGroups
            this.setState({ workout })
          },
          workouts: this.state.workouts,
          updateWorkouts: workouts => {
            this.setState({ workouts })
          },
          saveWorkoutInWorkoutsList: workout => {
            let workouts = [...this.state.workouts]
            if (workout.id) {
              let index = findIndexOfId(workout.id, workouts)
              if (index > -1) {
                updateItemById(workout, workout.id, workouts)
              } else {
                workouts.push(workout)
              }
            } else {
              workouts.push(workout)
            }
            this.setState({ workouts })
          },
          clearWorkouts: () => {
            this.setState({ workouts: [] })
          }
        }}
      >
        {this.props.children}
      </WoContext.Provider>
    )
  }
}

export default WoProvider
