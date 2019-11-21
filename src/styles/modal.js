import { css } from '@emotion/core'
import { darkTheme } from './theme'

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
  // backgroundColor: 'rgb(0,0,0)' /* Fallback color */,
  // backgroundColor: 'red' /* Black w/ opacity */
  // backgroundColor: 'rgba(104, 120, 140, 0.4)' /* Black w/ opacity */
  backgroundColor: darkTheme.color1.rgba(.75)
}

/* Modal Content */
export let modalContent = {
  // backgroundColor: '#fefefe',
  backgroundColor: darkTheme.color2.hex,
  margin: 'auto',
  padding: '20px',
  border: '1px solid #888',
  width: '80%'
}

/* The Close Button */
export let close = {
  color: '#aaaaaa',
  float: 'right',
  fontSize: '28px',
  fontWeight: 'bold',
  '&:hover': {
    color: '#000',
    textDecoration: 'none',
    cursor: 'pointer'
  },
  '&:focus': {
    color: '#000',
    textDecoration: 'none',
    cursor: 'pointer'
  }
}
