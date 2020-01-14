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
  border: '1px solid #eee'
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
export let woHeader = {
  backgroundColor: activeTheme.color3.hex,
  color: activeTheme.color3_text.hex
}
export let woLabel = {
  width: '45px',
  display: 'inline-block',
  float: 'left'
}

export let woInput = {
  width: '50px',
  height: '22px',
  paddingTop: '2px',
  paddingRight: '10px'
}

export let woTable = {
  margin: 'auto',
  // borderCollapse: 'collapse',
  // borderSpacing: '0',
  border: `1px solid ${activeTheme.color5.hex}`,
  '& th': {
    backgroundColor: activeTheme.color5.hex,
    color: activeTheme.color5_text.hex
  },
  '& th, td': {
    // textAlign: 'left',
    padding: '3px 8px'
  },

  '& tr:nth-of-type(odd)': {
    backgroundColor: activeTheme.color1.hex,
    color: activeTheme.color1_text.hex
  },
  '& tr:nth-of-type(even)': {
    backgroundColor: activeTheme.color2.hex,
    color: activeTheme.color2_text.hex
  },
  '& input': {
    borderRadius: '0px',
    border: 'none',
    backgroundColor: 'inherit',
    color: 'inherit',
    fontSize: '1em',
    paddingTop: '2px',
    lineHeight: '14px'
  }
}

export let tableInput = {
  backgroundColor: 'inherit',
  border: 'none',
  color: 'inherit',
  fontSize: '1em',
  width: '100%',
  lineHeight: '14px'
}

export let workoutCell = {
  borderLeft: `1px solid ${activeTheme.color3.rgba(0.75)}`
}

export let setHeader = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

export let setLeadCell = {
  borderLeft: `1px solid ${activeTheme.color3.rgba(0.75)}`,
  fontWeight: '700'
}

export const dateHeader = {
  borderLeft: `2px solid ${activeTheme.color3.hex}`
}

export let dayLeftCell = {
  borderLeft: `3px solid ${activeTheme.color3.rgba(0.75)}`,
  borderRight: `1px solid ${activeTheme.color3.rgba(0.75)}`
}

export let dayRightCell = {
  borderLeft: `1px solid ${activeTheme.color3.rgba(0.75)}`,
  borderRight: `3px solid ${activeTheme.color3.rgba(0.75)}`
}
