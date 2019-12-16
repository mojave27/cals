import React from 'react'
import SetContext from './SetContext'

class SetProvider extends React.Component {
    state = {
        set: {
            exercises: []
        }
    }

    render(){
        return(
            <SetContext.Provider value={{
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
            </SetContext.Provider>
        )
    }

}

export default SetProvider