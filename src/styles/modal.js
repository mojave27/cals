import { css } from '@emotion/core'
import { darkTheme } from './main-styles'

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
  backgroundColor: darkTheme.color1.rgba(.75)
}

/* Modal Content */
export let modalContent = {
  backgroundColor: darkTheme.color2.hex,
  margin: 'auto',
  padding: '20px',
  border: `1px solid ${darkTheme.color4.hex}`,
  borderRadius: '5px',
  width: '80%'
}

/* The Close Button */
export let close = {
  color: '#aaaaaa',
  float: 'right',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '0px 10px',
  margin: '3px 5px',
  '&:hover': {
    color: darkTheme.color5.hex,
    textDecoration: 'none',
    cursor: 'pointer'
  },
  '&:focus': {
    color: '#000',
    textDecoration: 'none',
    cursor: 'pointer'
  }
}
