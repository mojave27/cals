import React, { useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import WorkoutCard from '../workouts/WorkoutCard'
import TextInput from 'components/inputs/TextInput'
import ArrayUtils, { filterItemsByNameProperty as filterItems } from '../modules/common/utilties/ArrayUtils'
import PropTypes from 'prop-types'

const WoList = props => {
  const [searchValue, setSearchValue] = useState(null)

  const handleClick = id => {
    if (props.onClick) props.onClick(id)
  }

  const sortItems = items => {
    return ArrayUtils.sortByStringProperty(items, 'name', true)
  }

  const isSelected = id => {
    // id matches an id of a selected item
    let index = ArrayUtils.findIndexOfId(id, props.selected)
    if (index > -1) return true
    return false
  }
  
  const handleInputChange = event => {
    setSearchValue(event.target.value)
  }


  return (
    <Container style={{ padding: '25px' }}>
      <Grid container spacing={2} justify='flex-start'>
      <Grid item xs={12} sm={12} >
        <TextInput
          id='search'
          name='search'
          onChange={handleInputChange}
        />
        </Grid>
        {sortItems( filterItems(searchValue, props.items) ).map(wo => {
          return (
            <Grid item xs={12} sm={6} key={wo.id}>
              <WorkoutCard
                selected={isSelected(wo.id)}
                key={wo.id}
                id={wo.id}
                item={wo}
                onClick={() => handleClick(wo.id)}
                deleteItem={props.deleteItem}
                editItem={props.editItem}
                disabled={props.disabled}
              />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

WoList.propTypes = {
  items: PropTypes.array,
  disabled: PropTypes.bool,
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  onClick: PropTypes.func
}

export default WoList
