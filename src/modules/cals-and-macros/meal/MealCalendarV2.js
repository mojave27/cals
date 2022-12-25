import React from 'react'
import styles from 'modules/cals-and-macros/meal/Meal.module.css'
import WeekView from 'modules/common/data-display/WeekView'

const MealCalendar = () => {
  return (
    <div className={styles.container}>
      <WeekView />
    </div>
  )
}

export default MealCalendar
