import { css } from '@emotion/core'
import { activeTheme } from './main-styles'

export const gridContainer = css({
  display: 'grid',
  gridTemplateAreas: `
    'goals goals goals goals goals date'
    'mestats mestats mestats mestats mestats mestats'
    `,
  padding: '10px',
})

export const gridGoals = css({ gridArea: 'goals' })
export const gridDate = css({ gridArea: 'date' })
export const gridMeStats = css({ gridArea: 'mestats' })

// meStats styles ---------------------------------------- //
export const meStatsContainer = css({
  display: 'grid',
  gridTemplateAreas: `
    'weight energy energy energy'
    'sleep sleep mood mood'
    `
})

export const meWeight = css({
  gridArea: 'weight',
  border: '1px solid lime'
})
export const meEnergy = css({
  gridArea: 'energy',
  border: '1px solid pink'
})
export const meSleep = css({
  gridArea: 'sleep',
  border: '1px solid yellow'
})
export const meMood = css({
  gridArea: 'mood',
  border:'1px solid cyan'
})


// range slider styles ---------------------------------- //
// export let slidecontainer = {
//   width: '100%' /* Width of the outside container */
// }

/* The slider itself */
export let slider = {
  webkitAppearance: 'none',  /* Override default CSS styles */
  appearance: 'none',
  width: '200px', /* Full-width */
  height: '15px', /* Specified height */
  background: activeTheme.color4.hex, /* Grey background */
  outline: 'none', /* Remove outline */
  opacity: '0.7', /* Set transparency (for mouse-over effects on hover) */
  webkitTransition: '.2s', /* 0.2 seconds transition on hover */
  transition: 'opacity .2s',
  '&:hover': {
    opacity: '1'
  },
  '&::-webkit-slider-thumb': {
  webkitAppearance: 'none', /* Override default look */
  appearance: 'none',
  width: '25px', /* Set a specific slider handle width */
  height: '25px', /* Slider handle height */
  background: activeTheme.color2.hex, /* Green background */
  border: activeTheme.color3.hex,
  borderRadius:'15px',
  cursor: 'pointer' /* Cursor on hover */
  },
  '&::-moz-range-thumb': {
  width: '25px', /* Set a specific slider handle width */
  height: '25px', /* Slider handle height */
  background: activeTheme.color2.hex, /* Green background */
  cursor: 'pointer' /* Cursor on hover */
  }
}



// cardio styles ---------------------------------------- //


// weights styles ---------------------------------------- //