import { css } from '@emotion/core'
import { activeTheme } from './main-styles'

export let workoutHeader = css({
  backgroundColor: activeTheme.color3.hex,
  color: activeTheme.color3_text.hex,
  fontWeight: 'bold',
  padding: '2px 5px'
})

export let workoutBlock = css({
  display: 'inline-block',
  // color: activeTheme.color2_text.hex
})

export let setBlock = css({
  border: `1px solid ${activeTheme.color2.hex}`,
  // color: activeTheme.color2_text.hex
})
