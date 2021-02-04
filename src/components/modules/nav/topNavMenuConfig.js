export const menuConfig = [
  {
    name: 'home',
    type: 'button',
    auth: false,
    icon: 'Home',
    link: { to: '/', text: 'home' }
  },

  // { name: 'calcs', type: 'button', link: { to: 'meal', text: 'meal' } },
  // { name: 'view', type: 'button', link: { to: 'meals', text: 'meals' } },
  {
    name: 'programs',
    type: 'button',
    auth: false,
    icon: 'Assignment',
    link: { to: '/program-tracker', text: 'program' },
  },
  {
    name: 'woday',
    type: 'button',
    auth: false,
    icon: 'Assignment',
    link: { to: '/tracker/woday', text: 'day' }
  },
  {
    name: 'manage',
    type: 'dropdown',
    items: [
      { to: 'manage-foods-db', text: 'foods db' },
      { to: 'manage-meals-db', text: 'meals db' }
    ]
  }
]
