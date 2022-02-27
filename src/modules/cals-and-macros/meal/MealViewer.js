import React, { useEffect, useState } from 'react'
import MealCard from 'modules/cals-and-macros/meal/MealCard'
// import ListViewer from 'modules/common/data-display/ListViewer'
import retrieveMeals from 'api/cals-and-macros/retrieveMeals'
import {
  filterItemsByNameProperty as filterItems,
  retrieveItemById,
} from 'components/modules/common/utilties/ArrayUtils'
import TextInputWithCancel from 'components/inputs/TextInputWithCancel'
import styles from 'modules/cals-and-macros/meal/Meal.module.css'

const MealViewer = (props) => {
  const [meals, setMeals] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    retrieve()
  }, [])

  const retrieve = async () => {
    const response = await retrieveMeals('')
    setMeals(response)
  }

  const handleSelect = (event) => {
    console.log(event.target)
  }

  const handleClearSearch = () => {
    console.log('clearing search')
    setSearchValue('')
  }

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className={styles.container}>
      <TextInputWithCancel
        id='search'
        name='search'
        data={searchValue}
        onChange={handleInputChange}
        handleCancel={handleClearSearch}
        autoComplete={'off'}
      />
      {filterItems(searchValue, meals, 'name').map((meal, index) => {
        return (
          <div key={`${meal}-${index}`}>
            <div style={{ paddingLeft: '10px', color: 'orange' }}>
              <h3>{meal.name}</h3>
            </div>
            <MealCard viewOnly={true} item={meal} />
          </div>
        )
      })}
    </div>
  )
}

export default MealViewer
