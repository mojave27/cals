import React from 'react'
import { Container, Grid } from '@material-ui/core'
import WorkoutCard from '../workouts/WorkoutCard'
import ArrayUtils from '../ArrayUtils'
import PropTypes from 'prop-types'

const CardioList = props => {
  const handleClick = id => {
    // console.log(`%cWorkoutList handleClick: ${id}`, 'color:lime;backgroundColor:navy;border:1px solid red')
    if (props.onClick) props.onClick(id)
  }

  const sortCardioRoutines = cardioRoutines => {
    return ArrayUtils.sortByStringProperty(cardioRoutines, 'name', true)
  }

  return (
    <Container style={{ padding: '25px' }}>
      <Grid container spacing={2} justify='flex-start'>
        {sortCardioRoutines(props.cardioRoutines).map(wo => {
          return (
            <Grid item xs={12} sm={6} key={wo.id}>
              <WorkoutCard
                key={wo.id}
                id={wo.id}
                item={wo}
                onClick={() => handleClick(wo.id)}
                deleteItem={props.deleteCardio}
                editItem={props.editCardio}
                disabled={props.disabled}
              />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

CardioList.propTypes = {
  cardioRoutines: PropTypes.array,
  disabled: PropTypes.bool,
  deleteCardio: PropTypes.func,
  editCardio: PropTypes.func,
  onClick: PropTypes.func
}

// CardioList.defaultProps = {
//   // disabled: true,
//   cardioRoutines: []
// }

export default CardioList
