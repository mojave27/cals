// import { css } from '@emotion/core'
import { activeTheme } from '../../styles/main-styles'


/*the container must be positioned relative:*/
export let customSelect = {
  border: `1px solid ${activeTheme.color2.hex}`,
  position: 'relative',
  fontFamily: 'Arial',
  lineHeight: '13px',
  '& select': {
    display: 'none' /*hide original SELECT element:*/
  }
}

export let selectSelected = {
  backgroundColor: activeTheme.color5.hex,
  color: activeTheme.color5_text.hex,
  padding: '8px 16px',
  /*style the arrow inside the select element:*/
  '& after': {
    position: 'absolute',
    content: '""',
    top: '14px',
    right: '10px',
    width: '0',
    height: '0',
    border: '6px solid transparent',
    borderColor: '#fff transparent transparent transparent'
  },
  /*point the arrow upwards when the select box is open (active):*/
  '&:after': {
    borderColor: 'transparent transparent #fff transparent',
    top: '7px'
  }
}

export let selectArrowActive = {}

/*style items (options):*/
export let selectItems = {
  border: `1px solid ${activeTheme.color3.hex}`,
  position: 'absolute',
  backgroundColor: activeTheme.color5.hex,
  color: activeTheme.color5_text.hex,
  top: '100%',
  left: '0',
  right: '0',
  zIndex: '99',
  /*style the items (options), including the selected item:*/
  '& div,.selectSelected': {
    color: activeTheme.color5_text.hex,
    padding: '8px 16px',
    border: '1px solid transparent',
    borderColor: `transparent transparent ${activeTheme.color5.rgba(0.1)} transparent`,
    cursor: 'pointer',
    userSelect: 'none'
  },
  '& div:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    border: `1px solid ${activeTheme.color3.hex}`
  }
}

export let sameAsSelected = {
  backgroundColor: activeTheme.color4.rgba(.5),
  color: activeTheme.color1_text.hex
}

/*hide the items when the select box is closed:*/
export let selectHide = {
  display: 'none'
}
