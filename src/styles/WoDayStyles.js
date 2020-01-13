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

// cardio styles ---------------------------------------- //


// weights styles ---------------------------------------- //