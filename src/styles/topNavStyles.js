import { activeTheme } from './main-styles'

/* Navbar container */
export let navbar = {
  overflow: 'hidden',
  backgroundColor: activeTheme.color5.hex,
  borderBottom: `solid 1px ${activeTheme.color3.hex}`,
  fontFamily: 'Arial',
  fontSize: '14px',
}

/* The dropdown container */
export const dropdown = {
  float: 'left',
  overflow: 'hidden'
}


export const dropbtn = {
    border: 'none',
    outline: 'none',
    padding: '14px 16px;',
    backgroundColor: 'inherit',
    color: activeTheme.color5_text.hex,
    fontSize: '14px',
    fontFamily: 'inherit',
    margin: '0',
    '&:hover': {
      backgroundColor: activeTheme.color4.hex
    }
}

/* Dropdown content (hidden by default) */
export const dropdownContent = {
  display: 'none',
  position: 'absolute',
  backgroundColor: activeTheme.color2.hex,
  color: activeTheme.color2_text.hex,
  minWidth: '160px',
  boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
  zIndex: '1',
  /* Links inside the dropdown */
  '& a': {
    float: 'none',
    color: activeTheme.color5.hex,
    padding: '12px 16px',
    textDecoration: 'none',
    display: 'block',
    textAlign: 'left'
  },
  /* Add background color to dropdown links on hover */
  '& a:hover': {
    backgroundColor: activeTheme.color4.hex,
    color: activeTheme.color4_text.hex,
    border: `1px solid ${activeTheme.color2.rgba(0.75)}`
  }
}
