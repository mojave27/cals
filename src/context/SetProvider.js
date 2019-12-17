import React from 'react'
import SetContext from './SetContext'

let emptySet = {
    set: {
        exercises: []
    }
}

class SetProvider extends React.Component {
    state = {
        set: {
            exercises: []
        }
    }

    updateExercisesForSet = exercises => {
        console.log('========================')
        const set = {...this.state.set}
        set.exercises = exercises
        console.log(JSON.stringify(set))
        console.log('------------------------')
        this.setState({set})
    }

    render() {
        console.log('re-rendering SetProvider')
        console.log('set from state')
        console.log(JSON.stringify(this.state.set))
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