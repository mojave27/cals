import { css } from '@emotion/core'
import { darkTheme } from './theme'

export let table = {
  borderCollapse: 'collapse',
  borderSpacing: '0',
  width: '100%',
  border: '1px solid #ddd',
  '& th': {
    backgroundColor: darkTheme.color5.hex
  },
  '& th, td': {
    textAlign: 'left',
    padding: '8px'
  },
  '& tr:nth-of-type(odd)': {
    backgroundColor: darkTheme.color3.hex
  },
  '& tr:nth-of-type(even)': {
    backgroundColor: darkTheme.color4.hex
  }
}
