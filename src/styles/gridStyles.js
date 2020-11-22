import { css } from '@emotion/core'

export let gridStyles = theme => {
  const gridContainer = css({
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    backgroundColor: theme.color4.rgba(0.8),
    padding: '10px',
    justifyContent: 'center'
  })

  const gridItem = css({
    backgroundColor: theme.color5.rgba(0.8),
    border: `1px solid ${theme.color3.rgba(0.8)}`,
    borderRadius: '3px',
    padding: '20px',
    fontSize: 'inherit',
    textAlign: 'center',
    '&:hover': {
      backgroundColor: theme.color2.rgba(0.25)
    }
  })

  const gridItemNoHover = css({
    backgroundColor: theme.color5.rgba(0.8),
    border: `1px solid ${theme.color3.rgba(0.8)}`,
    borderRadius: '3px',
    padding: '20px',
    fontSize: 'inherit',
    textAlign: 'center'
  })

  // should we really have the colors and padding in here?
  const gridContainerSingleColumn = css({
    display: 'grid',
    gridTemplateColumns: 'auto',
    backgroundColor: theme.color4.rgba(0.8),
    padding: '10px',
    justifyContent: 'center'
  })

  // using this in WorkoutTracker, don't want color that we
  // get from gridContainerSingleColumn
  const gridContainerOneColumn = css({
    display: 'grid',
    gridTemplateColumns: 'auto',
    justifyContent: 'center'
  })

  return {
    gridContainer,
    gridItem,
    gridItemNoHover,
    gridContainerSingleColumn,
    gridContainerOneColumn
  }
}
