import { css } from '@emotion/core'
import { activeTheme } from './main-styles'

export let blockHeader = css({
  backgroundColor: activeTheme.color5.hex,
  color: activeTheme.color5_text.hex,
  border: `1px solid ${activeTheme.color2.hex}`,
  fontWeight: 'bold',
  padding: '5px 5px',
  margin: '5px 5px',
  textAlign: 'left'
})

export let workoutBlock = css({
  display: 'inline-grid',
  // color: activeTheme.color2_text.hex
})

export let setBlock = css({
  border: `1px solid ${activeTheme.color2.hex}`,
  margin: '5px'
  // color: activeTheme.color2_text.hex
})
