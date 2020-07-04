import { css } from '@emotion/core'

export let styles = theme => {

let gridContainer = css({
  display: 'grid',
  gridTemplateColumns: 'auto auto auto',
  backgroundColor: theme.color4.rgba(.8),
  padding: '10px',
  justifyContent: 'center'
})

let gridItem = css({
  backgroundColor: theme.color5.rgba(.8),
  border: `1px solid ${theme.color3.rgba(.8)}`,
  borderRadius: '3px',
  padding: '20px',
  fontSize: 'inherit',
  textAlign: 'center',
  '&:hover': {
    backgroundColor: theme.color2.rgba(.25),
  }
})


let gridItemNoHover = css({
  backgroundColor: theme.color5.rgba(.8),
  border: `1px solid ${theme.color3.rgba(.8)}`,
  borderRadius: '3px',
  padding: '20px',
  fontSize: 'inherit',
  textAlign: 'center'
})

// should we really have the colors and padding in here?
let gridContainerSingleColumn = css({
  display: 'grid',
  gridTemplateColumns: 'auto',
  backgroundColor: theme.color4.rgba(.8),
  padding: '10px',
  justifyContent: 'center'
})

// using this in WorkoutTracker, don't want color that we
// get from gridContainerSingleColumn
let gridContainerOneColumn = css({
  display: 'grid',
  gridTemplateColumns: 'auto',
  justifyContent: 'center'
})

return { gridContainer, gridItem, gridItemNoHover, gridContainerOneColumn, gridContainerSingleColumn}

}