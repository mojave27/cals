// __tests__/fetch.test.js
import React from 'react'
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import WorkoutCard from './WorkoutCard'
import { workouts } from './workout_test_data'

// const server = setupServer(
//   rest.get('/greeting', (req, res, ctx) => {
//     return res(ctx.json({ greeting: 'hello there' }))
//   })
// )

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

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

  debug()

  // await waitFor(() => screen.getByRole('heading'))
  // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  // expect(screen.getByRole('button')).toHaveAttribute('disabled')
})
