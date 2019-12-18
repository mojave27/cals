import React from 'react'
import SetContext from './SetContext'

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
        const set = {...this.state.set}
        set.exercises = exercises
        this.setState({set})
    }

    render() {
        return (
            <SetContext.Provider value={{
                set: this.state.set,
                clearSet: () => {
                    this.setState({set: emptySet})
                },
                updateSet: set => {
                    this.setState({ set })
                },
                addExercise: exercise => {
                    const set = Object.assign({}, this.state.set)
                    set.exercises.push(exercise)
                    this.setState({set})
                },
                updateExercisesForSet: this.updateExercisesForSet
            }}>
                {this.props.children}
            </SetContext.Provider>
        )
    }

}

export default SetProvider