import React from 'react'
import retrieve from '../../api/retrieveExercises'

class Exercises extends React.Component {
  state = {}

  render() {
    return (
      <React.Fragment>
        {this.renderExercises(this.state.exercises)}
      </React.Fragment>
    )
  }

  componentDidMount = () => {
      retrieve()
      .then(exercises => {
          this.setState({exercises})
      })
  }

  renderExercises = exercises => {
    if(exercises && exercises.length > 0){
      return exercises.map( exercise => {
        console.log(exercise)
        let index = exercise.id
        return (<div key={index}>{exercise.name} has id of {exercise.id}</div>)
      })
    }else{
      return (<div>No Exercises</div>)
    }
  }
}

export default Exercises
