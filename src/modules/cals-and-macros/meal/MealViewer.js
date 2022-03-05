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
import deleteMeal from 'api/cals-and-macros/deleteMeal'

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

  const handleSelect = (id) => {
    console.log(id)
    const item = retrieveItemById(id, meals)
    console.log(JSON.stringify(item))
  }

  const handleClearSearch = () => {
    console.log('clearing search')
    setSearchValue('')
  }

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleDelete = async id => {
    await deleteMeal(id)
    await retrieve()
  }

  const doStuff = props => {
    console.log(props)
    return <div style={{ padding: '10px' }}>{props.user?.attributes?.email}</div>
  }

  return (
    <div className={styles.container}>
      {doStuff(props)}
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
            <MealCard disabled={false} viewOnly={true} item={meal} onClick={handleSelect} deleteItem={handleDelete} />
          </div>
        )
      })}
    </div>
  )
}

export default MealViewer
