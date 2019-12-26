// import { css } from '@emotion/core'
import { activeTheme } from './main-styles'

export let modal = {
  // display: 'none' /* Hidden by default */,
  position: 'fixed' /* Stay in place */,
  zIndex: '1' /* Sit on top */,
  paddingTop: '100px' /* Location of the box */,
  left: '0',
  top: '0',
  width: '100%' /* Full width */,
  height: '100%' /* Full height */,
  overflow: 'auto' /* Enable scroll if needed */,
  transition: '0.3s',
  backgroundColor: activeTheme.color3.rgba(.75)
}

/* Modal Content */
export let modalContent = {
  backgroundColor: activeTheme.color5.hex,
  margin: 'auto',
  padding: '20px',
  // borderTop: `1px solid ${activeTheme.color2.hex}`,
  // borderBottom: `1px solid ${activeTheme.color2.hex}`,
  borderRadius: '3px',
  width: '80%',
  transition: '0.3s',
}

/* The Close Button */
export let close = {
  // color: '#aaaaaa',
  color: activeTheme.color3.hex,
  float: 'right',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '0px 10px',
  margin: '3px 5px',
  transition: '0.3s',
  '&:hover': {
    color: activeTheme.color1.hex,
    textDecoration: 'none',
    cursor: 'pointer'
  },
  '&:focus': {
    color: activeTheme.color5.hex,
    textDecoration: 'none',
    cursor: 'pointer'
  }
}
