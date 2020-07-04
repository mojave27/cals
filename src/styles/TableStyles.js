import { css } from '@emotion/core'

export let styles = theme => {
  let table = css({
    borderCollapse: 'collapse',
    borderSpacing: '0',
    width: '100%',
    border: `1px solid ${theme.color5.hex}`,
    '& th': {
      backgroundColor: theme.color5.hex,
      color: theme.color5_text.hex
    },
    '& th, td': {
      textAlign: 'left',
      padding: '3px'
    },

    '& tr:nth-of-type(odd)': {
      backgroundColor: theme.color1.hex,
      color: theme.color1_text.hex
    },
    '& tr:nth-of-type(even)': {
      backgroundColor: theme.color2.hex,
      color: theme.color2_text.hex
    },
    '& input': {
      backgroundColor: 'inherit',
      border: 'none',
      color: 'inherit',
      fontSize: '1em',
      width: '100%',
      lineHeight: '14px'
    }
  })

  let tableInput = css({
    backgroundColor: 'inherit',
    border: 'none',
    color: 'inherit',
    fontSize: '1em',
    width: '100%',
    lineHeight: '14px'
  })

  let workoutCell = css({
    borderLeft: `1px solid ${theme.color3.rgba(0.75)}`
  })

  let setHeader = css({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  })

  let setLeadCell = css({
    borderLeft: `1px solid ${theme.color3.rgba(0.75)}`,
    fontWeight: '700'
  })

  const dateHeader = css({
    borderLeft: `2px solid ${theme.color3.hex}`
  })

  let dayLeftCell = css({
    borderLeft: `3px solid ${theme.color3.rgba(0.75)}`,
    borderRight: `1px solid ${theme.color3.rgba(0.75)}`
  })

  let dayRightCell = css({
    borderLeft: `1px solid ${theme.color3.rgba(0.75)}`,
    borderRight: `3px solid ${theme.color3.rgba(0.75)}`
  })

  let Row = css({
    display: 'table',
    borderSpacing: '10px' /*Optional*/
  })

  let Column = css({
    // display: 'table-cell',
    // display: 'inline-block',
    // verticalAlign: 'middle',
    // width: '10px',
    // backgroundColor:
  })

  return {
    Column,
    dateHeader,
    dayLeftCell,
    dayRightCell,
    Row,
    setHeader,
    setLeadCell,
    table,
    tableInput,
    workoutCell
  }
}
