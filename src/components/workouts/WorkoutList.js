import React, { useState } from 'react'
import Modal from 'components/modules/common/components/Modal'
import WorkoutHighlightCard from 'components/workouts/WorkoutHighlightCard'
import WorkoutCard from 'components/workouts/WorkoutCard'
import ArrayUtils, {
  filterItemsByNameProperty as filterItems,
} from 'components/modules/common/utilties/ArrayUtils'
import TextInput from 'components/inputs/TextInput'
import PropTypes from 'prop-types'
import { Container, Grid } from '@material-ui/core'

const WorkoutList = (props) => {
  const [searchValue, setSearchValue] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const done = () => {
    setShowModal(false)
  }

  const handleClick = (id) => {
    if (props.onClick) props.onClick(id)
  }

  const sortWorkouts = (workouts) => {
    return ArrayUtils.sortByStringProperty(workouts, 'name', true)
  }

  const isSelected = (id) => {
    // id matches an id of a selected workout
    let index = ArrayUtils.findIndexOfId(id, props.selected)
    if (index > -1) return true
    return false
  }

  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <React.Fragment>
      <Modal showModal={showModal} handleClose={toggleModal}>
        <WorkoutCard done={done} />
      </Modal>
      <Container style={{ padding: '25px' }}>
        <Grid container spacing={2} justify='flex-start'>
          <Grid item xs={12} sm={12}>
            <TextInput id='search' name='search' onChange={handleInputChange} />
          </Grid>
          {sortWorkouts(filterItems(searchValue, props.workouts)).map((wo) => {
            return (
              <Grid item xs={12} sm={3} key={wo.id}>
                {/* on click show details */}
                <WorkoutHighlightCard
                  // props to be passed to WorkoutCard
                  selected={isSelected(wo.id)}
                  key={wo.id}
                  id={wo.id}
                  item={wo}
                  onClick={() => handleClick(wo.id)}
                  deleteItem={props.deleteWorkout}
                  viewItem={props.viewWorkout}
                  editItem={props.editWorkout}
                  copyItem={props.copyWorkout}
                  disabled={props.disabled}
                />
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </React.Fragment>
  )
}

WorkoutList.propTypes = {
  workouts: PropTypes.array,
  disabled: PropTypes.bool,
  deleteWorkout: PropTypes.func,
  editWorkout: PropTypes.func,
  onClick: PropTypes.func,
  selected: PropTypes.array,
}

WorkoutList.defaultProps = {
  // disabled: true,
  workouts: [],
  selected: [],
}

export default WorkoutList
