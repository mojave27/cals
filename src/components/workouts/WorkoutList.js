import React from 'react'
import Grid from '@material-ui/core/Grid'
import WorkoutCard from '../workouts/WorkoutCard'

const WorkoutList = props => {
  const handleClick = id => {
    if (props.onClick) props.onClick(id)
  }

  return (
    <Grid container spacing={1} justify='flex-start'>
      {props.workouts.map(wo => {
        return (
          <Grid item xs={12} sm={4} key={wo.id}>
            <WorkoutCard
              key={wo.id}
              id={wo.id}
              item={wo}
              onClick={() => handleClick(wo.id)}
              deleteItem={props.deleteWorkout}
              editItem={props.editWorkout}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default WorkoutList
