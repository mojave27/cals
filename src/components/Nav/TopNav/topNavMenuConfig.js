// paths in the 'item(s)' need to be a route in your routing package (e.g. reach/router)
export const menuConfig = [
  {
    name: 'home',
    type: 'button',
    link: { to: '/', text: 'home' }
  },
  {
    name: 'trackers',
    type: 'dropdown',
    items: [
      { to: '/program-tracker', text: 'program' },
      { to: '/tracker/woday', text: 'woday' }
    ]
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
      // { to: '/programs', text: 'programs' },
      { to: '/manage/workouts', text: 'workouts' },
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
      { to: '/admin/test', text: 'test page' },
      { to: '/admin/themer', text: 'themer' },
      { to: '/admin/test/woday', text: 'woday test page' }
    ]
  },
  {
    name: 'sign-out',
    type: 'functionButton'
  },
]
