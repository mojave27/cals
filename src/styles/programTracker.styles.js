// import { css } from '@emotion/core'
import { activeTheme } from './main-styles'

/* Style the tab */
export let tab = {
  overflow: 'hidden',
  border: `1px solid ${activeTheme.color3.hex}`,
  backgroundColor: activeTheme.color4.hex,
  color: activeTheme.color4_text.hex,
  '& button': {
    fontSize:'.9em',
    backgroundColor: 'inherit',
    color:'inherit',
    float: 'left',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    padding: '14px 16px',
    transition: '0.3s'
  },
  '& button:hover': {
    backgroundColor: activeTheme.color2.hex,
    color: activeTheme.color2_text.hex
  },
  '& button.active': {
    backgroundColor: activeTheme.color5.hex,
    color: activeTheme.color5_text.hex
  }
}

/* Style the tab content */
export const tabContent = {
  // display: 'none',
  display:'block',
  padding: '6px 12px',
  border: `1px solid ${activeTheme.color2.hex}`,
  borderTop: 'none'
}

/* Style the buttons that are used to open the tab content */
// .tab button {
//   background-color: inherit;
//   float: left;
//   border: none;
//   outline: none;
//   cursor: pointer;
//   padding: 14px 16px;
//   transition: 0.3s;
// }

/* Change background color of buttons on hover */
// .tab button:hover {
//   background-color: #ddd;
// }

/* Create an active/current tablink class */
// .tab button.active {
//   background-color: #ccc;
// }
