export const menuConfig = [
  {
    name: 'home',
    type: 'button',
    link: { to: '/', text: 'home' }
  },
  {
    name: 'trackers',
    type: 'dropdown',
    items: [{ to: '/workout-tracker', text: 'workout' }]
  },
  {
    name: 'progress',
    type: 'button',
    link: { to: '/progress', text: 'workout progress' }
  },
  {
    name: 'manage',
    type: 'dropdown',
    items: [
      { to: '/programs', text: 'programs' },
      { to: '/workouts', text: 'workouts' },
      { to: '/sets', text: 'sets' },
      { to: '/exercises', text: 'exercises' }
    ]
  },
  {
    name: 'calcs',
    type: 'dropdown',
    items: [{ to: '1rm', text: '1 rep max' }]
  },
  {
    name: 'admin',
    type: 'dropdown',
    items: [
      { to: '/admin/consistency-check', text: 'data check' },
      { to: '/program-viewer', text: 'program viewer' },
      { to: '/admin/test', text: 'test page' }
    ]
  }
]
