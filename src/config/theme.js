/* Color Theme Swatches in Hex 
  2D3540, 1B2026, 80858C, B0B7BF, 03A696
*/

/* Color Theme 2 Swatches in Hex 
 #2D3540, #68788C, #03A696, #C0D904, #93A603

// Color Theme Swatches in RGBA 
 rgba(45, 53, 64, 1),
 rgba(104, 120, 140, 1),
 rgba(3, 166, 150, 1),
 rgba(192, 217, 4, 1),
 rgba(147, 166, 3, 1)
*/

import { css } from '@emotion/core'

export let darkTheme = {
  color1: '#2D3540',
  color2: '#1B2026',
  color3: '#80858C',
  color4: '#B0B7BF',
  color5: '#03A696'
}

export let card = css({
  border: `1px solid ${darkTheme.color4}`,
  borderRadius: '2px',
//   backgroundColor: `${darkTheme.color2}`,
//   backgroundColor: `#E4E4E6`,
  backgroundColor: `#CACACD`,
  margin: '5px 10px',
  padding: '10px 5px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  textAlign: 'center',
  color: `${darkTheme.color2}`,
  '&:hover': {
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    border: `1px solid ${darkTheme.color5}`,
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

export let detailCard = css({
  border: `3px solid ${darkTheme.color4}` /* Dotted border */,
  width: '80%',
  borderRadius: '5px' /* Rounded border */,
  margin: '0 auto' /* Center the coupon */,
  maxWidth: '600px'
})

export let container = css({
  padding: '2px 16px',
  backgroundColor: '#f1f1f1'
})

export let stripe = css({
  backgroundColor: darkTheme.color4,
  height: '10px'
})

export let promo = css({
  background: '#ccc',
  padding: '3px'
})

export let expire = css({
  color: 'red'
})

export let collapsible = css({
  backgroundColor: darkTheme.color3,
  color: 'white',
  cursor: 'pointer',
  padding: '3px 8px',
  width: '100%',
  border: 'none',
  textAlign: 'left',
  outline: 'none',
  fontSize: '.9em',
  '&:hover': {
    backgroundColor: darkTheme.color1
  }
})

export let active =css({
    display:'block'
})

export let inActive =css({
    display:'none'
})

export let collapsibleContent = css({
  padding: '0 10px',
  overflow: 'hidden',
  backgroundColor: '#f1f1f1'
})