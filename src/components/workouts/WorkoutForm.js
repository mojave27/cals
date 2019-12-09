/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import SetCard from '../sets/SetCard'
import { addWorkout, retrieveWorkoutById, updateWorkout } from '../../api/workoutsApi'
import { isUndefined } from 'lodash'
import Table from '../tables/SimpleTable'
import { setBlock } from '../../styles/program'
import {
  detailCard,
  container,
  formButton,
  formInput,
  row,
  col25,
  col75,
  stripe
} from '../../styles/main-styles'

const emptyWorkout = {
  "name": "",
  "description": "",
  "type": "",
  "sets": []
}

class WorkoutForm extends React.Component {
  state = {
    workout: emptyWorkout,
    showSetDialog: false
  }

  componentDidMount = () => {
    if (!isUndefined(this.props.workoutId)) { 
      this.fetchWorkout(this.props.workoutId)
    }
  }

  fetchWorkout = id => {
    retrieveWorkoutById(id)
    .then( response => {
      this.setState({workout: response})
    })
  }

  toggleSetDialog = () => {
     this.setState(prevState => {
       return {showSetDialog: !prevState.showSetDialog}
     })
  }

  saveWorkout = () => {
    if (this.state.workout.id) {
      console.log('updating workout with id: ' + this.state.workout.id)
      updateWorkout(this.state.workout)
        .then(response => {
          this.setState({workout: response})
        })
    } else {
      console.log('adding workout')
      addWorkout(this.state.workout)
        .then(response => {
          this.setState({workout: response})
          return response
        })
        .then(response => {
          this.props.saveWorkout(response)
        })
    }
  }

  handleTextChange = event => {
    let { id, value } = event.target
    let updatedWorkout = { ...this.state.workout }
    updatedWorkout[id] = value
    this.setState({workout: updatedWorkout})
  }

  saveSet = set => {
    let updatedWorkout = {...this.state.workout}
    updatedWorkout.sets.push(set)
    this.setState({
      workout: updatedWorkout,
      showSetDialog: false
    })
  }

  renderSets = sets => {
    return sets.map(set => {
      let data = {
        headers: ['name', 'reps'],
        rows: [...set.exercises]
      }
      return (
        <div key={set.id} css={setBlock}>
          <Table data={data} />
        </div>
      )
    })
  }

  render(){
  return (
    <React.Fragment>
      <div css={detailCard}>
        <div css={container}>
          <div css={row}>
            <div css={col25}>
              <label htmlFor='workoutName'>Workout Name</label>
            </div>
            <div css={col75}>
              <input
                css={formInput}
                type='text'
                id='name'
                name='name'
                value={this.state.workout.name}
                placeholder='workout name..'
                onChange={this.handleTextChange}
              />
            </div>
          </div>
          <div css={row}>
            <div css={col25}>
              <label htmlFor='workoutDescription'>Workout Description</label>
            </div>
            <div css={col75}>
              <input
                css={formInput}
                type='text'
                id='description'
                name='description'
                value={this.state.workout.description}
                placeholder='workout description..'
                onChange={this.handleTextChange}
              />
            </div>
          </div>
        </div>
        <div css={stripe} />

        <div css={container}>
          <div style={{ display: 'block', paddingBottom: '10px' }}>
            <div style={{ paddingBottom: '10px' }}>Sets go here</div>
            {this.renderSets(this.state.workout.sets)}
            <input
              type='button'
              value='Add Set'
              css={formButton}
              onClick={this.toggleSetDialog}
              style={{ display: 'block' }}
            />
            <input
              type='button'
              value='Save Workout'
              css={formButton}
              onClick={this.saveWorkout}
              style={{ display: 'block' }}
            />
            {this.state.showSetDialog ? <SetCard saveSet={this.saveSet} done={this.toggleSetDialog} /> : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  )}

}

export default WorkoutForm
