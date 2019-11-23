import { css } from '@emotion/core'
import { darkTheme } from './theme'

export let table = {
  borderCollapse: 'collapse',
  borderSpacing: '0',
  width: '100%',
  border: '1px solid #ddd',
  '& th, td': {
    textAlign: 'left',
    padding: '8px',
    color: 'yellow'
  },
  '& tr:nth-of-type(even)': {
    backgroundColor: '#f2f2f2'
  }
}

