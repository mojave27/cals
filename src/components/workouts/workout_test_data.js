export const workouts = [
  {
    name: '6x8 L1',
    description: 'test workout with a string id',
    id: '318e3520-4793-11eb-bd96-03c8de54ff36',
    sets: [
      {
        id: 0,
        exerciseGroups: [
          {
            exercises: [],
            id: 0
          }
        ]
      }
    ],
    exerciseGroups: [
      {
        id: 0,
        exercises: [
          {
            name: 'glute bridge',
            id: '8',
            reps: '6x8',
            type: 'compound'
          },
          {
            name: 'leg raise',
            id: '1add2c90-478f-11eb-85a2-21f2972c4a42',
            reps: '',
            type: 'isolation'
          }
        ]
      },
      {
        id: 1,
        exercises: [
          {
            name: 'squat',
            id: '4',
            reps: '6x8',
            type: 'compound'
          },
          {
            name: 'jammer',
            id: '3',
            reps: '6x8',
            type: 'isolation'
          }
        ]
      },
      {
        id: 2,
        exercises: [
          {
            name: 'leg curl',
            id: '10',
            reps: '4x12',
            type: 'isolation'
          },
          {
            name: 'lat raise',
            id: '2',
            reps: '6x8',
            type: 'isolation'
          }
        ]
      },
      {
        id: 3,
        exercises: [
          {
            name: 'shrugs',
            id: '12',
            reps: '6x8',
            type: 'isolation'
          },
          {
            name: 'rear delt raises',
            id: '17',
            reps: '4x12',
            type: 'isolation'
          }
        ]
      }
    ]
  },

  {
    name: '6x8 AM/PM shoulders',
    description: 'workout with a numeric id',
    id: 9,
    sets: [{ exerciseGroups: [{ exercises: [], id: 0 }], id: 0 }],
    exerciseGroups: [
      {
        exercises: [
          { name: 'lat raise', id: 2, reps: '6x8', type: 'isolation' },
          { name: 'shrugs', id: 12, reps: '6x8', type: 'isolation' }
        ],
        id: 0
      },
      {
        exercises: [{ name: 'jammer', id: 3, reps: '6x8', type: 'isolation' }],
        id: 1
      }
    ]
  }
]
