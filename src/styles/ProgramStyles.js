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

  return { blockHeader, workoutBlock, setBlock }
}
