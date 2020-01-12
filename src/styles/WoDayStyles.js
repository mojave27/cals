import { css } from '@emotion/core'
import { activeTheme } from './main-styles'

export const gridContainer = css({
  display: 'grid',
  gridTemplateColumns: `
    'goals goals goals goals date date'
    'mestats mestats mestats mestats mestats'
    'mestats mestats mestats mestats mestats'
    `,
  backgroundColor: activeTheme.color4.rgba(.8),
  padding: '10px',
  justifyContent: 'center'
})

export const gridGoals = css({ gridArea: 'goals' })
export const gridDate = css({ gridArea: 'date' })
export const gridMeStats = css({ gridArea: 'mestats' })


// export const gridItem = css({
//   backgroundColor: activeTheme.color5.rgba(.8),
//   border: `1px solid ${activeTheme.color3.rgba(.8)}`,
//   borderRadius: '3px',
//   padding: '20px',
//   fontSize: 'inherit',
//   textAlign: 'center'
// })
