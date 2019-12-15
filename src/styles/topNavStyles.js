import { activeTheme } from './main-styles'


/* Navbar container */
export let navbar = {
  overflow: 'hidden',
  backgroundColor: activeTheme.color5.hex,
  borderBottom: `solid 1px ${activeTheme.color4.hex}`,
  fontFamily: 'Arial',
  // fontSize: '14px',
  /* Links inside the navbar */
  '& a': {
    float: 'left',
    fontSize: '14px',
    color: activeTheme.color4.hex,
    textAlign: 'center',
    textDecoration: 'none'
  },
  '& a:hover': {
    backgroundColor: activeTheme.color4.hex,
    color: activeTheme.color4_text.hex
  }
}

/* The dropdown container */
export const dropdown = {
  float: 'left',
  overflow: 'hidden',
  // fontSize: '14px',
  /* Dropdown button */
  '& .dropbtn': {
    fontSize: '14px',
    border: 'none',
    outline: 'none',
    color: 'white',
    padding: '14px 16px;',
    // backgroundColor: 'inherit',
    fontFamily: 'inherit',
    /* Important for vertical align on mobile phones */
    margin: '0'
  },
  '& :hover': {
    backgroundColor: activeTheme.color4.hex,
    color: activeTheme.color4_text.hex,
    /* Show the dropdown menu on hover */
    '& .dropdownContent': {
      display: 'block'
    }
  }
}

export const dropbtn = {
    backgroundColor: activeTheme.color5.hex,
    color: activeTheme.color5_text.hex,
    fontSize: '14px',
    border: activeTheme.color5.hex
    // '& :hover': {
    //   backgroundColor: activeTheme.color4.hex
    // }
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
    color: 'black',
    padding: '12px 16px',
    textDecoration: 'none',
    display: 'block',
    textAlign: 'left'
  },
  /* Add background color to dropdown links on hover */
  '& a:hover': {
    backgroundColor: activeTheme.color1.hex,
    color: activeTheme.color1_text.hex
  }
}

