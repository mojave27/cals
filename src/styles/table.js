import { activeTheme } from './main-styles'

export let table = {
  borderCollapse: 'collapse',
  borderSpacing: '0',
  width: '100%',
  border: `1px solid ${activeTheme.color5.hex}`,
  '& th': {
    backgroundColor: activeTheme.color5.hex,
    color: activeTheme.color5_text.hex
  },
  '& th, td': {
    textAlign: 'left',
    padding: '3px'
  },

  '& tr:nth-of-type(odd)': {
    backgroundColor: activeTheme.color1.hex,
    color: activeTheme.color1_text.hex
  },
  '& tr:nth-of-type(even)': {
    backgroundColor: activeTheme.color2.hex,
    color: activeTheme.color2_text.hex
  },
  '& input': {
    backgroundColor: 'inherit',
    border: 'none',
    color: 'inherit',
    fontSize: '1em',
    width: '100%',
    lineHeight: '14px'
  }
}

export let tableInput = {
  backgroundColor: 'inherit',
  border: 'none',
  color: 'inherit',
  fontSize: '1em',
  width: '100%',
  lineHeight: '14px'
}

export let workoutCell = {
  borderLeft: `1px solid ${activeTheme.color3.rgba(0.75)}`
}

export let setHeader = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

export let setLeadCell = {
  borderLeft: `1px solid ${activeTheme.color3.rgba(0.75)}`,
  fontWeight: '700'
}

export const dateHeader = {
  borderLeft: `2px solid ${activeTheme.color3.hex}`
}

export let dayLeftCell = {
  borderLeft: `3px solid ${activeTheme.color3.rgba(0.75)}`,
  borderRight: `1px solid ${activeTheme.color3.rgba(0.75)}`
}

export let dayRightCell = {
  borderLeft: `1px solid ${activeTheme.color3.rgba(0.75)}`,
  borderRight: `3px solid ${activeTheme.color3.rgba(0.75)}`
}

export let Row = {
  display: 'table',
  borderSpacing: '10px' /*Optional*/
}

export let Column = {
  // display: 'table-cell',
  // display: 'inline-block',
  // verticalAlign: 'middle',
  // width: '10px',
  // backgroundColor:
}
