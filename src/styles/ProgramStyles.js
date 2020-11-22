import { css } from '@emotion/core'

export let styles = theme => {
  let blockHeader = css({
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex,
    border: `1px solid ${theme.color2.hex}`,
    fontWeight: 'bold',
    padding: '5px 5px',
    margin: '5px 5px',
    textAlign: 'left'
  })

  let workoutBlock = css({
    // display: 'inline-grid'
  })

  let setBlock = css({
    border: `1px solid ${theme.color2.hex}`,
    margin: '5px'
  })

  /* Style the tab */
  let tab = css({
    overflow: 'hidden',
    border: `1px solid ${theme.color3.hex}`,
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex,
    '& button': {
      fontSize: '.9em',
      backgroundColor: 'inherit',
      color: 'inherit',
      float: 'left',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      padding: '14px 16px',
      transition: '0.3s'
    },
    '& button:hover': {
      backgroundColor: theme.color4.hex,
      color: theme.color4_text.hex
    },
    '& button.active': {
      backgroundColor: theme.color5.hex,
      color: theme.color5_text.hex
    }
  })

  /* Style the tab content */
  const tabContent = css({
    display: 'block',
    padding: '6px 12px',
    border: `1px solid ${theme.color2.hex}`,
    borderTop: 'none',
    transition: '1.0s'
  })

  return { blockHeader, workoutBlock, setBlock, tab, tabContent }
}
