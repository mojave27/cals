// import { css } from '@emotion/core'
import { activeTheme } from './main-styles'

export let table = {
  borderCollapse: 'collapse',
  borderSpacing: '0',
  width: '100%',
  border: `1px solid ${activeTheme.color5.hex}`,
  '& th': {
    backgroundColor: activeTheme.color5.hex
  },
  '& th, td': {
    textAlign: 'left',
    padding: '3px'
  },
  // '& tr:hover': {
  //     border: `1px solid ${activeTheme.color5_highlight.hex}`
  // },
  '& tr:nth-of-type(odd)': {
    backgroundColor: activeTheme.color3.hex
  },
  '& tr:nth-of-type(even)': {
    backgroundColor: activeTheme.color4.hex
  }
}
