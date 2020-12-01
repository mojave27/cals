/** @jsx jsx */
import { jsx } from '@emotion/core'
// eslint-disable-next-line no-unused-vars
import WorkoutCard from '../workouts/WorkoutCard'

const WorkoutList = props => {

  const handleClick = id => {
    if (props.onClick) props.onClick(id)
  }

  return props.workouts.map(wo => {
    return (
      <WorkoutCard
        key={wo.id}
        id={wo.id}
        item={wo}
        onClick={() => handleClick(wo.id)}
        deleteItem={props.deleteWorkout}
        editItem={props.editWorkout}
      />
    )
  })
}

export default WorkoutList
