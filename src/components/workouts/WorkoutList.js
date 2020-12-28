import React from 'react'
import { Container, Grid } from '@material-ui/core'
import WorkoutCard from '../workouts/WorkoutCard'
import ArrayUtils from '../ArrayUtils'
import PropTypes from 'prop-types'

const WorkoutList = props => {
  const handleClick = id => {
    // console.log(`%cWorkoutList handleClick: ${id}`, 'color:lime;backgroundColor:navy;border:1px solid red')
    if (props.onClick) props.onClick(id)
  }

  const sortWorkouts = workouts => {
    return ArrayUtils.sortByStringProperty(workouts, 'name', true)
  }

  return (
    <Container style={{ padding: '25px' }}>
      <Grid container spacing={2} justify='flex-start'>
        {sortWorkouts(props.workouts).map(wo => {
          return (
            <Grid item xs={12} sm={6} key={wo.id}>
              <WorkoutCard
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
