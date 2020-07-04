import { css } from '@emotion/core'

export const woDayStyles = theme => {
  const gridContainer = css({
    display: 'grid',
    gridTemplateAreas: `
    'date date date'
    'goals goals goals'
    'weight energy sleep'
    `,
    padding: '10px'
  })

  const section = {
    minHeight: '150px',
    marginTop: '15px',
    padding: '15px',
    width: '100%',
    border: '1px solid #eee'
  }

  const sectionHeader = {
    display: 'block',
    fontSize: '1.17em',
    marginBlockEnd: '.5em',
    fontWeight: 'bold'
  }

  const gridGoals = css({
    gridArea: 'goals',
    padding: '7px 0px 15px 0px',
    textAlign: 'left'
  })
  const gridDate = css({
    gridArea: 'date',
    padding: '7px 0px 15px 0px',
    textAlign: 'left'
  })
  const gridMeStats = css({ gridArea: 'mestats' })

  // meStats styles ---------------------------------------- //
  const meStatsContainer = css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '40px'
  })

  const gridWeight = css({
    gridArea: 'weight',
    textAlign: 'left'
    // border: '1px solid lime'
  })
  const gridEnergy = css({
    paddingTop: '5px',
    gridArea: 'energy'
  })
  const gridSleep = css({
    paddingTop: '5px',
    gridArea: 'sleep'
  })

  // range slider styles ---------------------------------- //
  let sliderContainer = {
    paddingTop: '5px',
    height: '30px',
    borderRadius: '3px',
    width: '30%'
  }

  /* The slider itself */
  let slider = {
    webkitAppearance: 'none' /* Override default CSS styles */,
    appearance: 'none',
    width: '200px' /* Full-width */,
    height: '15px' /* Specified height */,
    background: theme.color2.hex /* Grey background */,
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
      background: theme.color5.hex /* Green background */,
      border: theme.color3.hex,
      borderRadius: '15px',
      cursor: 'pointer' /* Cursor on hover */
    },
    '&::-moz-range-thumb': {
      width: '25px' /* Set a specific slider handle width */,
      height: '25px' /* Slider handle height */,
      background: theme.color2.hex /* Green background */,
      cursor: 'pointer' /* Cursor on hover */
    }
  }

  // cardio styles ---------------------------------------- //

  // weights styles ---------------------------------------- //
  let woHeader = {
    backgroundColor: theme.color3.hex,
    color: theme.color3_text.hex
  }
  let woLabel = {
    width: '45px',
    display: 'inline-block',
    float: 'left'
  }

  let woInput = {
    width: '50px',
    height: '22px',
    paddingTop: '2px',
    paddingRight: '10px'
  }

  let woTable = {
    margin: 'auto',
    // borderCollapse: 'collapse',
    // borderSpacing: '0',
    border: `1px solid ${theme.color5.hex}`,
    '& th': {
      backgroundColor: theme.color5.hex,
      color: theme.color5_text.hex
    },
    '& th, td': {
      // textAlign: 'left',
      padding: '3px 8px'
    },

    '& tr:nth-of-type(odd)': {
      backgroundColor: theme.color1.hex,
      color: theme.color1_text.hex
    },
    '& tr:nth-of-type(even)': {
      backgroundColor: theme.color2.hex,
      color: theme.color2_text.hex
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

  let tableInput = {
    backgroundColor: 'inherit',
    border: 'none',
    color: 'inherit',
    fontSize: '1em',
    width: '100%',
    lineHeight: '14px'
  }

  let workoutCell = {
    borderLeft: `1px solid ${theme.color3.rgba(0.75)}`
  }

  let setHeader = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }

  let setLeadCell = {
    borderLeft: `1px solid ${theme.color3.rgba(0.75)}`,
    fontWeight: '700'
  }

  const dateHeader = {
    borderLeft: `2px solid ${theme.color3.hex}`
  }

  let dayLeftCell = {
    borderLeft: `3px solid ${theme.color3.rgba(0.75)}`,
    borderRight: `1px solid ${theme.color3.rgba(0.75)}`
  }

  let dayRightCell = {
    borderLeft: `1px solid ${theme.color3.rgba(0.75)}`,
    borderRight: `3px solid ${theme.color3.rgba(0.75)}`
  }

  return {
    dateHeader,
    dayLeftCell,
    dayRightCell,
    gridContainer,
    gridDate,
    gridEnergy,
    gridGoals,
    gridMeStats,
    gridSleep,
    gridWeight,
    meStatsContainer,
    section,
    sectionHeader,
    setHeader,
    setLeadCell,
    slider,
    sliderContainer,
    tableInput,
    woHeader,
    woInput,
    woLabel,
    woTable,
    workoutCell
  }
}
