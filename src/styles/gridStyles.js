import { css } from '@emotion/core'
import { activeTheme } from './main-styles'


export const gridContainer = css({
  display: 'grid',
  gridTemplateColumns: 'auto auto auto',
  backgroundColor: activeTheme.color1.rgba(.8),
  padding: '10px'
})

export const gridItem = css({
  backgroundColor: activeTheme.color2.rgba(.8),
  border: `1px solid ${activeTheme.color5.rgba(.8)}`,
  borderRadius: '3px',
  padding: '20px',
  fontSize: 'inherit',
  textAlign: 'center',
  '&:hover': {
    backgroundColor: activeTheme.color2.rgba(.25),
  }
})
