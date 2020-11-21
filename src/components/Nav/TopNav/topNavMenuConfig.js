/**
 * # Menu configuration for the TopNav menu.  Each item must be of one of the following types:
 *  - button ........... trigger navigation when clicked
 *  - functionButton ... trigger a function/onClick when clicked - this is a basic button, and you provide the onClick function in your code
 *  - dropdown ......... contain a dropdown menu with one or more items
 * 
 * ## button type should be in the following json format:
 * {
 *   name: 'name-goes-here',
 *   type: 'button',
 *   auth: [false|auth_object], // see below for details on auth_object
 *   link: { to: 'your_desired_path', text: 'link_text' }
 * } 
 * 
 * ## functionButton type should be in the following json format:
 * {
 *   name: 'name-goes-here',
 *   type: 'functionButton'
 * } 
 * 
 * ## dropdown type should be in the following json format:
 * {
 *   name: 'name-which-appears-on-the-top-level-of-menu-goes-here',
 *   type: 'dropdown',
 *   auth: [false|auth_object], // see below for details on auth_object
 *   items: [ 
 *     { to: 'your_desired_path_1', text: 'link_text_1' }, // <-- each item represents a reach-router link
 *     { to: 'your_desired_path_2', text: 'link_text_2' }
 *   ]
 * } 
 * 
 */
export const menuConfig = [
  {
    name: 'home',
    type: 'button',
    auth: false,
    link: { to: '/', text: 'home' }
  },
  {
    name: 'trackers',
    type: 'dropdown',
    auth: false,
    items: [
      { to: '/program-tracker', text: 'program' },
      { to: '/tracker/woday', text: 'woday' }
    ]
  },
  {
    name: 'progress',
    type: 'button',
    auth: false,
    link: { to: '/progress', text: 'workout progress' }
  },
  {
    name: 'manage',
    type: 'dropdown',
    auth: false,
    items: [
      // { to: '/programs', text: 'programs' },
      { to: '/manage/workouts', text: 'workouts' },
      { to: '/exercises', text: 'exercises' },
      { to: '/prefs/themer', text: 'theme' }
    ]
  },
  {
    name: 'calcs',
    type: 'dropdown',
    auth: false,
    items: [{ to: '1rm', text: '1 rep max' }]
  },
  {
    name: 'admin',
    type: 'dropdown',
    auth: {
      groups: ['wolog-admin']
    },
    items: [
      { to: '/admin/consistency-check', text: 'data check' },
      { to: '/admin/test', text: 'test page' },
      { to: '/admin/test/woday', text: 'woday test page' }
    ]
  },
  {
    name: 'sign-out',
    type: 'functionButton'
  },
]
