/* Color Theme Swatches in Hex 
  2D3540, 1B2026, 80858C, B0B7BF, 03A696
*/

/* Color Theme Swatches in RGBA
rgba(45, 53, 64, 1)
rgba(27, 32, 38, 1)
rgba(128, 133, 140, 1)
rgba(176, 183, 191, 1)
rgba(3, 166, 150, 1)
*/

/* Color Theme 2 Swatches in Hex 
 #2D3540, #68788C, #03A696, #C0D904, #93A603

// Color Theme 2 Swatches in RGBA 
 rgba(45, 53, 64, 1),
 rgba(104, 120, 140, 1),
 rgba(3, 166, 150, 1),
 rgba(192, 217, 4, 1),
 rgba(147, 166, 3, 1)
*/

import { css } from '@emotion/core'

import { darkTheme } from './theme'


export let programCard = css({
  border: `1px solid ${darkTheme.color4.hex}`,
  borderRadius: '2px',
  backgroundColor: `#CACACD`,
  margin: '5px 10px',
  padding: '10px 5px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  textAlign: 'center',
  color: `${darkTheme.color2.hex}`,
  '&:hover': {
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    border: `1px solid ${darkTheme.color5.hex}`,
    backgroundColor: `#E4E4E6`
  }
})

export let cardTitle = css({
  fontWeight: 'bold',
  fontSize: '1.1em',
  marginBottom: '10px',

  '&:after': {
    content: '""' /* This is necessary for the pseudo element to work. */,
    display: 'block' /* This will put the pseudo element on its own line. */,
    margin: '0 auto' /* This will center the border. */,
    width: '50%',
    paddingTop: '5px',
    borderBottom: '1px solid rgb(3,166,150,0.75)'
  }
})

export let cardInfo = css({
  marginBottom: '10px'
})

export let programDetailCard = css({
  border: `3px solid ${darkTheme.color4.hex}` /* Dotted border */,
  width: '100%',
  borderRadius: '5px' /* Rounded border */,
  margin: '0 auto' /* Center the coupon */,
  // maxWidth: '600px'
})

export let container = css({
  padding: '2px 16px',
  backgroundColor: '#f1f1f1',
  // border: '1px solid ' + darkTheme.color2.hex,
  borderRadius: '2px' /* Rounded border */,
  // backgroundColor: darkTheme.color4.hex
})

export let viewContainer = css({
  padding: '20px 0px'
})

export let stripe = css({
  backgroundColor: darkTheme.color4.hex,
  height: '10px'
})

export let promo = css({
  background: '#ccc',
  padding: '3px'
})

export let warn = css({
  color: 'red'
})

export let collapsible = css({
  backgroundColor: darkTheme.color3.hex,
  color: 'white',
  cursor: 'pointer',
  padding: '3px 8px',
  width: '100%',
  borderTop: 'none',
  borderBottom:`1px solid ${darkTheme.color1.hex}`,
  textAlign: 'left',
  outline: 'none',
  fontSize: '.9em',
  borderRadius: '3px',
  '&:hover': {
    backgroundColor: darkTheme.color1.hex
  }
})

export let active =css({
    display:'block'
})

export let inactive =css({
    display:'none'
})

export let collapsibleContent = css({
  padding: '0 10px',
  overflow: 'hidden',
  backgroundColor: '#f1f1f1',
  border:`1px solid ${darkTheme.color4.hex}`
})

// Program Form ****************************************************** /
export let programForm = css({
  boxSizing: 'border-box'
})

// export let input[type=text], select, textarea = css({
export let formInput = css({
  fontSize:'1.0em',
  width: '100%',
  padding: '12px',
  border: `1px solid #ccc`,
  borderRadius: '2px',
  resize: 'vertical'
})

export let selectInput = css({
  padding:'12px'
})

export let label = css({
  padding: '12px 12px 12px 0',
  display: 'inline-block'
})

// export let input[type=submit] = css({
export let inputSubmit = css({
  backgroundColor: darkTheme.color5.hex,
  color: 'white',
  padding: '8px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  float: 'right',
    '&:hover': {
      backgroundColor: '#00b5a3'
    }
})

export let formButton = css({
  backgroundColor: darkTheme.color5.hex,
  color: 'white',
  padding: '8px 20px',
  margin: '0px 10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  // float: 'left',
    '&:hover': {
      backgroundColor: '#00b5a3'
    }
})

export let programFormContainer = css({
  borderRadius: '5px',
  backgroundColor: '#f2f2f2',
  padding: '20px'
})

export let col25 = css({
  float: 'left',
  width: '25%',
  marginTop: '6px'
})

export let col75 = css({
  float: 'left',
  width: '75%',
  marginTop: '6px'
})

/* Clear floats after the columns */
export let row = css({
  '&:after': {
    content: '""',
  display: 'table',
  clear: 'both'}
})

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
// export let @media screen and (max-width: 600px) = css({
//   .col-25, .col-75, input[type=submit] {
//     width: 100%;
//     marginTop: 0;
//   }
// })
