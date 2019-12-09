import { css } from '@emotion/core'

/* Theme 1 ******************
2D3540, 1B2026, 80858C, B0B7BF, 03A696

rgba(45, 53, 64, 1)
rgba(27, 32, 38, 1)
rgba(128, 133, 140, 1)
rgba(176, 183, 191, 1)
rgba(3, 166, 150, 1)
*/

const themeOne = {
  color1: {
    hex: '#2D3540',
    rgba: alpha => buildRgba(45, 53, 64, alpha)
  },
  color2: {
    hex: '#1B2026',
    rgba: alpha => buildRgba(27, 32, 38, alpha)
  },
  color3: {
    hex: '#80858C',
    rgba: alpha => buildRgba(128, 133, 140, alpha)
  },
  color4: {
    hex: '#B0B7BF',
    rgba: alpha => buildRgba(176, 183, 191, alpha)
  },
  color5: {
    hex: '#03A696',
    rgba: alpha => buildRgba(3, 166, 150, alpha)
  },
  color5_highlight: {
    hex: '#05E6CF',
    rgba: alpha => buildRgba(230, 207, 90, alpha)
  }
}

/* Theme 2 ******************
 #2D3540, #68788C, #03A696, #C0D904, #93A603

 rgba(45, 53, 64, 1),
 rgba(104, 120, 140, 1),
 rgba(3, 166, 150, 1),
 rgba(192, 217, 4, 1),
 rgba(147, 166, 3, 1)
*/

/* Theme 3 ******************
#F2F2F2, #BFBFBF, #8C8C8C, #595959, #262626

rgba(242, 242, 242, 1)
rgba(191, 191, 191, 1)
rgba(140, 140, 140, 1)
rgba(89, 89, 89, 1)
rgba(38, 38, 38, 1)
*/
const themeThree = {
  color4: {
    hex: '#F2F2F2',
    rgba: alpha => buildRgba(242, 242, 242, alpha)
  },
  color5: {
    hex: '#BFBFBF',
    rgba: alpha => buildRgba(191, 191, 191, alpha)
  },
  color3: {
    hex: '#8C8C8C',
    rgba: alpha => buildRgba(140, 140, 140, alpha)
  },
  color1: {
    hex: '#595959',
    rgba: alpha => buildRgba(89, 89, 89, alpha)
  },
  color2: {
    hex: '#262626',
    rgba: alpha => buildRgba(38, 38, 38, alpha)
  },
  color5_highlight: {
    hex: '#262626',
    rgba: alpha => buildRgba(38, 38, 38, alpha)
  }
}


const buildRgba = (red, green, blue, alpha) => {
  return `rgba(${red},${green},${blue},${alpha})`
}

export let activeTheme = themeThree

// export let activeTheme = {
//   color1: {
//     hex: '#2D3540',
//     rgba: alpha => buildRgba(45, 53, 64, alpha)
//   },
//   color2: {
//     hex: '#1B2026',
//     rgba: alpha => buildRgba(27, 32, 38, alpha)
//   },
//   color3: {
//     hex: '#80858C',
//     rgba: alpha => buildRgba(128, 133, 140, alpha)
//   },
//   color4: {
//     hex: '#B0B7BF',
//     rgba: alpha => buildRgba(176, 183, 191, alpha)
//   },
//   color5: {
//     hex: '#03A696',
//     rgba: alpha => buildRgba(3, 166, 150, alpha)
//   },
//   color5_highlight: {
//     hex: '#05E6CF',
//     rgba: alpha => buildRgba(230, 207, 90, alpha)
//   }
// }

export let miniCard = css({
  width: '50%',
  border: `1px solid ${activeTheme.color4.hex}`,
  borderRadius: '2px',
  backgroundColor: `#CACACD`,
  margin: '2px auto',
  padding: '3px 5px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  textAlign: 'center',
  color: `${activeTheme.color2.hex}`,
  '&:hover': {
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    border: `1px solid ${activeTheme.color5.hex}`,
    backgroundColor: `#E4E4E6`
  }
})

export let selectedMiniCard = css({
  backgroundColor: activeTheme.color5.hex
})

export let card = css({
  border: `1px solid ${activeTheme.color4.hex}`,
  borderRadius: '2px',
  backgroundColor: `#CACACD`,
  margin: '5px 10px',
  padding: '10px 5px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  textAlign: 'center',
  color: `${activeTheme.color2.hex}`,
  '&:hover': {
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    border: `1px solid ${activeTheme.color5.hex}`,
    backgroundColor: `#E4E4E6`
  }
})

export let cardTitle = css({
  fontWeight: 'bold',
  fontSize: '1.1em',
  marginBottom: '10px',

  '&:after': {
    content: '""' /* This is necessary for the pseudo element to work. */,
    display: 'block' /* This will put the pseudo element on its own line. */,
    margin: '0 auto' /* This will center the border. */,
    width: '50%',
    paddingTop: '5px',
    borderBottom: '1px solid rgb(3,166,150,0.75)'
  }
})

export let cardInfo = css({
  marginBottom: '10px'
})

export let detailCard = css({
  border: `3px solid ${activeTheme.color4.hex}` /* Dotted border */,
  width: '80%',
  borderRadius: '5px' /* Rounded border */,
  margin: '0 auto' /* Center the coupon */,
  maxWidth: '600px'
})

export let container = css({
  padding: '2px 16px',
  // backgroundColor: '#f1f1f1',
  backgroundColor: activeTheme.color1.hex,
  // border: '1px solid ' + activeTheme.color2.hex,
  borderRadius: '2px' /* Rounded border */
  // backgroundColor: activeTheme.color4.hex
})

export let viewContainer = css({
  padding: '20px 0px'
})

export let stripe = css({
  backgroundColor: activeTheme.color4.hex,
  height: '10px'
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
  padding: '12px',
  border: `1px solid #ccc`,
  borderRadius: '2px',
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
  display: 'inline-block'
})

// export let input[type=submit] = css({
export let inputSubmit = css({
  fontSize: 'inherit',
  backgroundColor: activeTheme.color5.hex,
  // color: 'white',
  padding: '8px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  float: 'right',
  '&:hover': {
    backgroundColor: activeTheme.color5_highlight.hex,
    color: '#fff'
  }
})

export let formButton = css({
  fontSize: 'inherit',
  backgroundColor: activeTheme.color5.hex,
  // color: 'white',
  padding: '8px 20px',
  margin: '0px 10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  // float: 'left',
  '&:hover': {
    backgroundColor: activeTheme.color5_highlight.hex,
    color: '#fff'
  }
})

export let formContainer = css({
  borderRadius: '5px',
  backgroundColor: '#f2f2f2',
  padding: '20px'
})

export let col25 = css({
  float: 'left',
  width: '25%',
  marginTop: '6px'
})

export let col75 = css({
  float: 'left',
  width: '75%',
  marginTop: '6px'
})

/* Clear floats after the columns */
export let row = css({
  '&:after': {
    content: '""',
    display: 'table',
    clear: 'both'
  }
})

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
// export let @media screen and (max-width: 600px) = css({
//   .col-25, .col-75, input[type=submit] {
//     width: 100%;
//     marginTop: 0;
//   }
// })

/*the container must be positioned relative:*/
export let customSelect = {
  position: 'relative',
  fontFamily: 'Arial',
  '& select': {
    display: 'none' /*hide original SELECT element:*/
  }
}

export let selectSelected = {
  // backgroundColor: 'DodgerBlue',
  backgroundColor: activeTheme.color5.hex,
  color: '#ffffff',
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
  // '& .select-arrow-active:after': {
  '&:after': {
    borderColor: 'transparent transparent #fff transparent',
    top: '7px'
  }
}

export let selectArrowActive = {}

/*style items (options):*/
export let selectItems = {
  position: 'absolute',
  // backgroundColor: 'DodgerBlue',
  backgroundColor: activeTheme.color5.hex,
  top: '100%',
  left: '0',
  right: '0',
  zIndex: '99',
  /*style the items (options), including the selected item:*/
  '& div,.selectSelected': {
    color: '#ffffff',
    padding: '8px 16px',
    border: '1px solid transparent',
    borderColor: 'transparent transparent rgba(0, 0, 0, 0.1) transparent',
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
  color: '#aaaaaa',
  float: 'right',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '0px 10px',
  margin: '3px 5px',
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
