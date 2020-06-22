import { css } from '@emotion/core'
import { 
  stormTrooper, 
  stormTrooperInverse, 
  woSheet, 
  siberianWinter } from './colorThemes'

export let themes = {
  'stormTrooper': stormTrooper,
  'stormTrooperInverse': stormTrooperInverse,
  'woSheet': woSheet,
  'siberianWinter': siberianWinter
}

export let changeTheme = (themeName) => {
  this.activeTheme = themes[themeName]
}

export let activeTheme = siberianWinter
// export let activeTheme = stormTrooperInverse
// export let activeTheme = stormTrooper
// export let activeTheme = woSheet

export let basics = css({
  borderTop: `1px solid ${activeTheme.color2.hex}`,
  borderBottom: `1px solid ${activeTheme.color2.hex}`,
  borderRadius: '2px',
  backgroundColor: activeTheme.color5.hex,
  color: activeTheme.color5_text.hex
})

export let card = css({
  border: `1px solid ${activeTheme.color4.hex}`,
  borderRadius: '2px',
  backgroundColor: activeTheme.color4.hex,
  // margin: '5px 10px',
  padding: '20px',
  // padding: '10px 5px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  textAlign: 'center',
  color: `${activeTheme.color4_text.hex}`,
  '&:hover': {
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    border: `1px solid ${activeTheme.color5.hex}`,
    backgroundColor: activeTheme.color1.hex,
    color: activeTheme.color1_text.hex,
    transition: '0.3s',
  }
})

export let cardNoHover = css({
  border: `1px solid ${activeTheme.color4.hex}`,
  borderRadius: '2px',
  backgroundColor: activeTheme.color4.hex,
  padding: '20px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  textAlign: 'center',
  color: `${activeTheme.color4_text.hex}`
})

export let section = css({
  borderTop: `1px solid ${activeTheme.color2.hex}`,
  borderBottom: `1px solid ${activeTheme.color2.hex}`,
  backgroundColor: activeTheme.color4.hex,
  textAlign: 'left',
  padding: '5px 10px'
})

export let miniCard = css({
  width: '50%',
  border: `1px solid ${activeTheme.color5.hex}`,
  borderRadius: '2px',
  backgroundColor: activeTheme.color4.hex,
  color: activeTheme.color4_text.hex,
  margin: '2px auto',
  padding: '3px 5px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  textAlign: 'center',
  '&:hover': {
    boxShadow: `0 8px 16px 0 ${activeTheme.color5.rgba(.2)}`,
    border: `1px solid ${activeTheme.color5.hex}`,
    backgroundColor: activeTheme.color1.hex,
    color: activeTheme.color1_text.hex
  }
})

export let selectedMiniCard = css({
  color: activeTheme.color1_text.hex,
  backgroundColor: 'lightYellow',
  fontWeight: '700'
})

export let cardTitle = css({
  fontWeight: 'bold',
  fontSize: '1.1em',
  marginBottom: '10px',

  '&:after': {
    content: '""' /* This is necessary for the pseudo element to work. */,
    display: 'block' /* This will put the pseudo element on its own line. */,
    margin: '0 auto' /* This will center the border. */,
    paddingTop: '5px',
    borderBottom: `1px solid ${activeTheme.color5.rgba(0.75)}`
  }
})

export let cardInfo = css({
  marginBottom: '10px'
})

export let detailCard = css({
  border: `1px solid ${activeTheme.color2.hex}`,
  width: '100%',
  borderRadius: '2px',
  margin: '0 auto',
  overflow:'scroll'
})

export let container = css({
  padding: '2px 16px',
  color: activeTheme.color5_text.hex,
  backgroundColor: activeTheme.color5.hex,
  borderRadius: '2px',
})

export let viewContainer = css({
  padding: '20px 0px'
})

export let stripe = css({
  backgroundColor: activeTheme.color3.hex,
  border: `1px solid ${activeTheme.color3.hex}`,
  height: '15px'
})

export let promo = css({
  background: '#ccc',
  padding: '3px'
})

export let warn = css({
  color: 'red'
})

export let collapsible = css({
  backgroundColor: activeTheme.color3.hex,
  color: 'white',
  cursor: 'pointer',
  padding: '3px 8px',
  width: '100%',
  borderTop: 'none',
  borderBottom: `1px solid ${activeTheme.color1.hex}`,
  textAlign: 'left',
  outline: 'none',
  fontSize: '.9em',
  borderRadius: '3px',
  '&:hover': {
    backgroundColor: activeTheme.color1.hex
  }
})

export let active = css({
  display: 'block'
})

export let inactive = css({
  display: 'none'
})

export let collapsibleContent = css({
  padding: '0 10px',
  overflow: 'hidden',
  backgroundColor: '#f1f1f1',
  border: `1px solid ${activeTheme.color4.hex}`
})

// Program Form ****************************************************** /
export let programForm = css({
  boxSizing: 'border-box'
})

// export let input[type=text], select, textarea = css({
export let formInput = css({
  fontSize: '1.0em',
  width: '100%',
  padding: '8px',
  border: `1px solid #aeaeae`,
  borderRadius: '3px',
  boxShadow: `inset 0 2px 2px #e9e9e9`,
  resize: 'vertical'
})

export let selectInput = css({
  fontSize: '1.0em',
  padding: '12px',
  width: '100%',
  border: `1px solid #ccc`,
  borderRadius: '2px'
})

export let label = css({
  padding: '12px 12px 12px 0',
  display: 'inline-grid'
  // display: 'inline-block'
})

export let basicButton = css({
  padding: '6px 20px',
  fontSize: 'inherit',
  backgroundColor: activeTheme.color4.hex,
  color: activeTheme.color4_text.hex,
  border: `1px solid ${activeTheme.color3.hex}`,
  borderRadius: '2px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: activeTheme.color3.hex,
    color: activeTheme.color3_text.hex,
  }
})

export let basicButtonSmall = css({
  padding: '1px 5px',
  fontSize: '.9em',
  backgroundColor: activeTheme.color4.hex,
  color: activeTheme.color4_text.hex,
  border: `1px solid ${activeTheme.color3.hex}`,
  borderRadius: '2px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: activeTheme.color3.hex,
    color: activeTheme.color3_text.hex,
  }
})

export let formButton = css({
  fontSize: 'inherit',
  backgroundColor: activeTheme.color5.hex,
  color: activeTheme.color5_text.hex,
  padding: '8px 20px',
  margin: '3px 10px',
  // border: 'none',
  border: `1px solid ${activeTheme.color2.hex}`,
  borderRadius: '2px',
  cursor: 'pointer',
  // float: 'left',
  '&:hover': {
    backgroundColor: activeTheme.color4.hex,
    color: '#fff'
  }
})

export let formContainer = css({
  borderRadius: '2px',
  borderTop: `1px solid ${activeTheme.color2.hex}`,
  borderBottom: `1px solid ${activeTheme.color2.hex}`,
  backgroundColor: activeTheme.color5.hex,
  color: activeTheme.color5_text.hex,
  padding: '20px'
})

export let col10 = css({
  float: 'left',
  marginTop: '6px',
  width: '10%'
})

export let col20 = css({
  float: 'left',
  marginTop: '6px',
  width: '20%'
})

export let col25 = css({
  float: 'left',
  marginTop: '6px',
  width: '25%'
})

export let col50 = css({
  float: 'left',
  width: '50%',
  marginTop: '6px'
})

export let col70 = css({
  float: 'left',
  marginTop: '6px',
  width: '70%'
})

export let col75 = css({
  float: 'left',
  width: '75%',
  marginTop: '6px'
})

export let pointer = {
  cursor: 'pointer'
}

/* Clear floats after the columns */
export let row = css({
  '&:after': {
    content: '""',
    display: 'table',
    clear: 'both'
  }
})

/*the container must be positioned relative:*/
export let customSelect = {
  border: `1px solid ${activeTheme.color2.hex}`,
  position: 'relative',
  fontFamily: 'Arial',
  '& select': {
    display: 'none' /*hide original SELECT element:*/
  }
}

export let selectSelected = {
  backgroundColor: activeTheme.color5.hex,
  color: activeTheme.color5_text.hex,
  // color: '#ffffff',
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  }
}

export let sameAsSelected = {
  backgroundColor: 'rgba(0, 0, 0, 0.1)'
}

/*hide the items when the select box is closed:*/
export let selectHide = {
  display: 'none'
}

/* The Close Button */
export let closeButton = {
  color: activeTheme.color3.hex,
  float: 'right',
  fontSize: '24px',
  fontWeight: 'bold',
  position: 'relative',
  top: '-16px',
  right: '5px',
  '&:hover': {
    color: activeTheme.color5.hex,
    textDecoration: 'none',
    cursor: 'pointer'
  },
  '&:focus': {
    color: '#000',
    textDecoration: 'none',
    cursor: 'pointer'
  }
}

/* The Close Button */
export let editIcon = {
  cursor:'pointer', 
  margin:'5px',
  float: 'left'
}
