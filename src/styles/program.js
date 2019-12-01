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

import { activeTheme } from './main-styles'

export let workoutHeader = css({
  backgroundColor: activeTheme.color2.hex,
  // color: activeTheme.color5.hex,
  color: '#fff',
  fontWeight: 'bold',
  padding: '2px 5px'
})

export let workoutBlock = css({
  display: 'inline-block',
  // border: `1px solid ${activeTheme.color2.hex}`
})

export let setBlock = css({
  border: `1px solid ${activeTheme.color2.hex}`
})
