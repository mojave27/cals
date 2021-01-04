import React from 'react'
import WorkoutCard from '../workouts/WorkoutCard'
import ArrayUtils from '../ArrayUtils'
import PropTypes from 'prop-types'
import { Container, Grid } from '@material-ui/core'


const WorkoutList = props => {

  const handleClick = id => {
    if (props.onClick) props.onClick(id)
  }

  const sortWorkouts = workouts => {
    return ArrayUtils.sortByStringProperty(workouts, 'name', true)
  }

  const isSelected = id => {
    // id matches an id of a selected workout
    let index = ArrayUtils.findIndexOfId(id, props.selected)
    if (index > -1) return true
    return false
  }

  return (
    <Container style={{ padding: '25px' }}>
      <Grid container spacing={2} justify='flex-start'>
        {sortWorkouts(props.workouts).map(wo => {
          return (
            <Grid item xs={12} sm={6} key={wo.id}>
              <WorkoutCard
                selected={isSelected(wo.id)}
                key={wo.id}
                id={wo.id}
                item={wo}
                onClick={() => handleClick(wo.id)}
                deleteItem={props.deleteWorkout}
                editItem={props.editWorkout}
                disabled={props.disabled}
              />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

WorkoutList.propTypes = {
  workouts: PropTypes.array,
  disabled: PropTypes.bool,
  deleteWorkout: PropTypes.func,
  editWorkout: PropTypes.func,
  onClick: PropTypes.func
}

WorkoutList.defaultProps = {
  // disabled: true,
  workouts: []
}

export default WorkoutList
