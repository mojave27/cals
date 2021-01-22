import React from 'react'
import WoContext from './WoContext'
import { findIndexOfStringId, updateItemById } from '../components/ArrayUtils'
import { cloneDeep } from 'lodash'

export const emptyWorkout = {
    id: '',
    name: '',
    description: '',
    exerciseGroups: [ { id:0, exercises: []} ],
    sets: [ {id:0, exerciseGroups: [ { id:0, exercises: []}] } ],
}

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
          copyWorkout: id => {
            let wo = this.state.workouts.find(wo => wo.id == id)
            let copiedWorkout = cloneDeep(wo)
            copiedWorkout.id = ''
            this.setState({ workout:copiedWorkout })
          },
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
              let index = findIndexOfStringId(workout.id, workouts)
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
