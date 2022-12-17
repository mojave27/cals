import React, { useEffect, useState } from 'react'
import MealCard from 'modules/cals-and-macros/meal/MealCard'
import retrieveMeals from 'api/cals-and-macros/retrieveMeals'
import {
  filterItemsByNameProperty as filterItems,
  retrieveItemById,
} from 'components/modules/common/utilties/ArrayUtils'
import TextInputWithCancel from 'components/inputs/TextInputWithCancel'
import styles from 'modules/cals-and-macros/meal/Meal.module.css'
import deleteMeal from 'api/cals-and-macros/deleteMeal'
import CalendarView from 'modules/common/data-display/CalendarView'

const MealCalendar = (props) => {
  const [meals, setMeals] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    retrieve()
  }, [])

  const retrieve = async () => {
    const mealsForCalendar = []
    const data = await retrieveMeals('')
    data.forEach(meal => {
      if (typeof meal.date === 'string') {
        const dt = new Date(meal.date)
        const newMeal = {
          ...meal,
          dateString: meal.date,
          date: {
            year: dt.getFullYear(),
            month: dt.getMonth(),
            day: dt.getDate()
          },
          show: true,
          content: <MealCard item={meal} />
        }
        mealsForCalendar.push(newMeal)
      }
    })
    setMeals(mealsForCalendar)
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

  return (
    <div className={styles.container} style={{ border: '1px solid lime' }}>
      {meals.length > 0
        ? <CalendarView items={meals} />
        // ? <div>loaded!</div>
        : <div>no meals?</div>
      }
    </div>
  )
}

export default MealCalendar
