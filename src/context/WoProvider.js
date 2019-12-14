import React from 'react'
import WoContext from './WoContext'

const emptySet = {
    exercises:[]
}

class WoProvider extends React.Component {
    state = {
        set: {
            exercises: []
        }
    }

    render(){
        return(
            <WoContext.Provider value={{
                set: this.state.set,
                updateSet: set => {
                    this.setState({set})
                },
                addExercise: exercise => { 
                    const set = Object.assign({},this.state.set)
                    set.exercises.push(exercise)
                    this.setState(set)
                },
                updateExercisesForSet: exercises => {
                    const set = Object.assign({},this.state.set)
                    set.exercises = exercises
                    this.setState(set)
                }
            }}>
                {this.props.children}
            </WoContext.Provider>
        )
    }

}

export default WoProvider