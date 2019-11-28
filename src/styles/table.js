// import { css } from '@emotion/core'
import { darkTheme } from './main-styles'

export let table = {
  borderCollapse: 'collapse',
  borderSpacing: '0',
  width: '100%',
  border: `1px solid ${darkTheme.color5.hex}`,
  '& th': {
    backgroundColor: darkTheme.color5.hex
  },
  '& th, td': {
    textAlign: 'left',
    padding: '3px'
  },
  // '& tr:hover': {
  //     border: `1px solid ${darkTheme.color5_highlight.hex}`
  // },
  '& tr:nth-of-type(odd)': {
    backgroundColor: darkTheme.color3.hex
  },
  '& tr:nth-of-type(even)': {
    backgroundColor: darkTheme.color4.hex
  }
}
