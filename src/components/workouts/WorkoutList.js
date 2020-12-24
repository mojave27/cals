import React from 'react'
import { Container, Grid } from '@material-ui/core'
import WorkoutCard from '../workouts/WorkoutCard'

const WorkoutList = props => {
  const handleClick = id => {
    if (props.onClick) props.onClick(id)
  }

  return (
      <Container style={{padding:'25px'}}>
    <Grid container spacing={2} justify='flex-start'>
      {props.workouts.map(wo => {
        return (
          <Grid item xs={12} sm={6} key={wo.id}>
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
    </Grid></Container>
  )
}

export default WorkoutList
