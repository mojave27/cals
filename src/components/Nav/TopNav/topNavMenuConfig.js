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
      { to: '/workouts', text: 'workouts' }
    ]
  },
  // {
  //   name: 'programs',
  //   type: 'dropdown',
  //   items: [
  //     { to: '/programs', text: 'programs' },
  //     { to: '/program-form', text: 'add program' }
  //   ]
  // },
  // {
  //   name: 'workouts',
  //   type: 'button',
  //   link: { to: '/workouts', text: 'workouts' }
  // },
  // {
  //   name: 'sets',
  //   type: 'button',
  //   link: { to: '/sets', text: 'sets' }
  // },
  // {
  //   name: 'exercises',
  //   type: 'button',
  //   link: { to: '/exercises', text: 'exercises' }
  // },
  {
    name: 'manage',
    type: 'dropdown',
    items: [
      { to: '/programs', text: 'programs' },
      { to: '/workouts', text: 'workouts' },
      { to: '/exercises', text: 'exercises' },
      { to: '/sets', text: 'sets' }
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
      // { to: '/workouts', text: 'workouts' },
      // { to: '/exercises', text: 'exercises' },
      // { to: '/sets', text: 'sets' }
    ]
  }
];
