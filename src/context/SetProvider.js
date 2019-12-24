import React from 'react'
import SetContext from './SetContext'
import { findIndexOfId, updateItemById } from '../components/ArrayUtils'

let emptySet = {
  exercises: []
}

class SetProvider extends React.Component {
  state = {
    set: {
      exercises: []
    }
  }

  updateExercisesForSet = exercises => {
    const set = { ...this.state.set }
    set.exercises = exercises
    this.setState({ set })
  }

  render() {
    return (
      <SetContext.Provider
        value={{
          set: this.state.set,
          clearSet: () => {
            this.setState({ set: emptySet })
          },
          updateSet: set => {
            this.setState({ set })
          },
          addExercise: exercise => {
            const set = Object.assign({}, this.state.set)
            set.exercises.push(exercise)
            this.setState({ set })
          },
          updateExercisesForSet: this.updateExercisesForSet,
          sets: this.state.sets,
          updateSets: sets => {
            this.setState({ sets })
          },
          saveSetInSetsList: set => {
            let sets = [...this.state.sets]
            if (set.id) {
              let index = findIndexOfId(set.id, sets)
              if (index > -1) {
                updateItemById(set, set.id, sets)
              } else {
                sets.push(set)
              }
            } else {
              sets.push(set)
            }
            this.setState({ sets })
          },
          clearSets: () => {
            this.setState({ sets: [] })
          }
        }}
      >
        {this.props.children}
      </SetContext.Provider>
    )
  }
}

export default SetProvider
