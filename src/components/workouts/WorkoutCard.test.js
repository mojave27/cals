import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import WorkoutCard from './WorkoutCard'
import { workouts } from './workout_test_data'

const workout = {
  ...workouts[0]
}

const selectWorkout = () => {}
const deleteItem = () => {}

test('loads and displays greeting', async () => {
  const { debug } = render(
    <WorkoutCard
      id={workout.id}
      item={workout}
      selectItem={selectWorkout}
      deleteItem={deleteItem}
      disabled={false}
    />
  )

  // will throw error if not found
  screen.getByText(workout.name)
  screen.getByLabelText('Edit')
  screen.getByLabelText('Delete')

  // debug()

  // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
})
