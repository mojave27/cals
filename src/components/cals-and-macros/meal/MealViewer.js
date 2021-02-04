import React, { useEffect, useState } from 'react'
import { Segment } from 'semantic-ui-react'
import MealTable from '../table/MealTable/MealTable'
import retrieveMeals from '../../apis/retrieveMeals'
import styles from './Meal.module.css'

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
            <MealTable viewOnly={true} foodList={meal.foodList} />
          </div>
          </Segment>
        )
      })}
    </div>
  )
}

export default MealViewer
