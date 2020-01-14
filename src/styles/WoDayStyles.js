import { css } from '@emotion/core'
import { activeTheme } from './main-styles'

export const gridContainer = css({
  display: 'grid',
  gridTemplateAreas: `
    'date date date'
    'goals goals goals'
    'weight energy sleep'
    `,
  padding: '10px'
})

export const section = {
  minHeight: '150px',
  marginTop: '15px',
  padding: '15px',
  width: '100%',
  border: '1px solid #eee',
  '& table': {
    backgroundColor: activeTheme.color4.hex,
    border:`1px solid ${activeTheme.color1.hex}`,
    color: activeTheme.color4_text.hex,
    margin:'auto'
  },
  '& th': {
    borderBottom:`1px solid ${activeTheme.color3.hex}`,
    borderLeft:`1px solid ${activeTheme.color3.hex}`,
    padding:'0px 5px'
  },
  '& td': {
    backgroundColor: activeTheme.color4.hex,
    borderLeft:`1px solid ${activeTheme.color3.hex}`,
    borderBottom:`1px solid ${activeTheme.color3.hex}`,
    color: activeTheme.color4_text.hex,
    padding:'0px 5px'
  }
}

export const sectionHeader = {
  display: 'block',
  fontSize: '1.17em',
  marginBlockEnd: '.5em',
  fontWeight: 'bold'
}

export const gridGoals = css({
  gridArea: 'goals',
  padding: '7px 0px 15px 0px',
  textAlign: 'left'
})
export const gridDate = css({
  gridArea: 'date',
  padding: '7px 0px 15px 0px',
  textAlign: 'left'
})
export const gridMeStats = css({ gridArea: 'mestats' })

// meStats styles ---------------------------------------- //
export const meStatsContainer = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: '40px'
})

export const gridWeight = css({
  gridArea: 'weight',
  textAlign: 'left'
  // border: '1px solid lime'
})
export const gridEnergy = css({
  paddingTop: '5px',
  gridArea: 'energy'
  // border: '1px solid pink'
})
export const gridSleep = css({
  paddingTop: '5px',
  gridArea: 'sleep'
  // border: '1px solid yellow'
})

// range slider styles ---------------------------------- //
export let sliderContainer = {
  paddingTop: '5px',
  height: '30px',
  borderRadius: '3px',
  width: '30%'
  // backgroundColor: '#eee'
}

/* The slider itself */
export let slider = {
  webkitAppearance: 'none' /* Override default CSS styles */,
  appearance: 'none',
  width: '200px' /* Full-width */,
  height: '15px' /* Specified height */,
  background: activeTheme.color2.hex /* Grey background */,
  outline: 'none' /* Remove outline */,
  opacity: '0.7' /* Set transparency (for mouse-over effects on hover) */,
  webkitTransition: '.2s' /* 0.2 seconds transition on hover */,
  transition: 'opacity .2s',
  '&:hover': {
    opacity: '1'
  },
  '&::-webkit-slider-thumb': {
    webkitAppearance: 'none' /* Override default look */,
    appearance: 'none',
    width: '25px' /* Set a specific slider handle width */,
    height: '25px' /* Slider handle height */,
    background: activeTheme.color5.hex /* Green background */,
    border: activeTheme.color3.hex,
    borderRadius: '15px',
    cursor: 'pointer' /* Cursor on hover */
  },
  '&::-moz-range-thumb': {
    width: '25px' /* Set a specific slider handle width */,
    height: '25px' /* Slider handle height */,
    background: activeTheme.color2.hex /* Green background */,
    cursor: 'pointer' /* Cursor on hover */
  }
}

// cardio styles ---------------------------------------- //

// weights styles ---------------------------------------- //
export let woLabel = {
  width: '45px',
  display: 'inline-block',
  float: 'left'
}

export let woInput = {
  backgroundColor: activeTheme.color2.hex,
  color: activeTheme.color2_text.hex,
  marginLeft: '3px',
  width: '100px',
  height: '22px',
  lineHeight: '11px'
}
