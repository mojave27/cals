import React, { useEffect, useState } from 'react'
import { Segment } from 'semantic-ui-react'
// import MealTable from 'modules/cals-and-macros/table/MealTable/MealTable'
import MealCard from 'modules/cals-and-macros/meal/MealCard'
import retrieveMeals from 'api/cals-and-macros/retrieveMeals'
import styles from 'modules/cals-and-macros/meal/Meal.module.css'

const MealViewer = props => {
  const [meals, setMeals] = useState([])
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    retrieive()
  }, [])

  const retrieive = async () => {
    const response = await retrieveMeals('')
    setMeals(response)
  }

  return (
    <div className={styles.container}>
      {meals.map((meal, index) => {
        return (
          <Segment color='orange' key={`${meal.name}-${index}`}>
          <div key={`${meal}-${index}`}>
            <div style={{paddingLeft:'10px',color:'orange'}}><h3>{meal.name}</h3></div>
            <MealCard viewOnly={true} item={meal} />
          </div>
          </Segment>
        )
      })}
    </div>
  )
}

export default MealViewer
