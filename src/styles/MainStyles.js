import { css } from '@emotion/core'

export let styles = theme => {
  let basics = css({
    borderTop: `1px solid ${theme.color2.hex}`,
    borderBottom: `1px solid ${theme.color2.hex}`,
    borderRadius: '2px',
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex
  })

  let card = css({
    border: `1px solid ${theme.color4.hex}`,
    borderRadius: '2px',
    backgroundColor: theme.color4.hex,
    // margin: '5px 10px',
    padding: '20px',
    // padding: '10px 5px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    textAlign: 'center',
    color: `${theme.color4_text.hex}`,
    '&:hover': {
      boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
      border: `1px solid ${theme.color5.hex}`,
      backgroundColor: theme.color1.hex,
      color: theme.color1_text.hex,
      transition: '0.3s'
    }
  })

  let cardNoHover = css({
    border: `1px solid ${theme.color4.hex}`,
    borderRadius: '2px',
    backgroundColor: theme.color4.hex,
    // background: `linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)`,
    background: `linear-gradient(0deg, ${theme.color4.hex} 30%, ${theme.color4.rgba(0.6)} 90%)`,
    padding: '20px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    textAlign: 'center',
    color: `${theme.color4_text.hex}`
  })

  let section = css({
    borderTop: `1px solid ${theme.color2.hex}`,
    borderBottom: `1px solid ${theme.color2.hex}`,
    backgroundColor: theme.color4.hex,
    textAlign: 'left',
    padding: '5px 10px'
  })

  let miniCard = css({
    width: '50%',
    border: `1px solid ${theme.color5.hex}`,
    borderRadius: '2px',
    backgroundColor: theme.color4.hex,
    color: theme.color4_text.hex,
    margin: '2px auto',
    padding: '3px 5px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    textAlign: 'center',
    '&:hover': {
      boxShadow: `0 8px 16px 0 ${theme.color5.rgba(0.2)}`,
      border: `1px solid ${theme.color5.hex}`,
      backgroundColor: theme.color1.hex,
      color: theme.color1_text.hex
    }
  })

  let selectedMiniCard = css({
    color: theme.color1_text.hex,
    backgroundColor: 'lightYellow',
    fontWeight: '700'
  })

  let cardTitle = css({
    fontWeight: 'bold',
    fontSize: '1.1em',
    marginBottom: '10px',

    '&:after': {
      content: '""' /* This is necessary for the pseudo element to work. */,
      display: 'block' /* This will put the pseudo element on its own line. */,
      margin: '0 auto' /* This will center the border. */,
      paddingTop: '5px',
      borderBottom: `1px solid ${theme.color5.rgba(0.75)}`
    }
  })

  let cardInfo = css({
    marginBottom: '10px'
  })

  let detailCard = css({
    border: `1px solid ${theme.color2.hex}`,
    width: '100%',
    borderRadius: '2px',
    margin: '0 auto',
    overflow: 'scroll'
  })

  let container = css({
    padding: '2px 16px',
    color: theme.color5_text.hex,
    backgroundColor: theme.color5.hex,
    borderRadius: '2px'
  })

  let viewContainer = css({
    padding: '20px 0px'
  })

  let stripe = css({
    backgroundColor: theme.color3.hex,
    border: `1px solid ${theme.color3.hex}`,
    height: '15px'
  })

  let promo = css({
    background: '#ccc',
    padding: '3px'
  })

  let warn = css({
    color: 'red'
  })

  let collapsible = css({
    backgroundColor: theme.color3.hex,
    color: 'white',
    cursor: 'pointer',
    padding: '3px 8px',
    width: '100%',
    borderTop: 'none',
    borderBottom: `1px solid ${theme.color1.hex}`,
    textAlign: 'left',
    outline: 'none',
    fontSize: '.9em',
    borderRadius: '3px',
    '&:hover': {
      backgroundColor: theme.color1.hex
    }
  })

  let active = css({
    display: 'block'
  })

  let inactive = css({
    display: 'none'
  })

  let collapsibleContent = css({
    padding: '0 10px',
    overflow: 'hidden',
    backgroundColor: '#f1f1f1',
    border: `1px solid ${theme.color4.hex}`
  })

  // Program Form ****************************************************** /
  let programForm = css({
    boxSizing: 'border-box'
  })

  // export let input[type=text], select, textarea = css({
  let formInput = css({
    fontSize: '1.0em',
    width: '100%',
    padding: '8px',
    border: `1px solid #aeaeae`,
    borderRadius: '3px',
    boxShadow: `inset 0 2px 2px #e9e9e9`,
    resize: 'vertical'
  })

  let selectInput = css({
    fontSize: '1.0em',
    padding: '12px',
    width: '100%',
    border: `1px solid #ccc`,
    borderRadius: '2px'
  })

  let label = css({
    padding: '12px 12px 12px 0',
    display: 'inline-grid'
    // display: 'inline-block'
  })

  let basicButtonFx = colors => {
    return css({
      padding: '6px 20px',
      fontSize: 'inherit',
      backgroundColor: colors.color4.hex,
      color: colors.color4_text.hex,
      border: `1px solid ${colors.color3.hex}`,
      borderRadius: '2px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: colors.color3.hex,
        color: colors.color3_text.hex
      }
    })
  }

  let basicButton = css({
    padding: '6px 20px',
    fontSize: 'inherit',
    backgroundColor: theme.color3.hex,
    color: theme.color3_text.hex,
    border: `1px solid ${theme.color2.hex}`,
    borderRadius: '2px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.color2.hex,
      color: theme.color2_text.hex
    }
  })

  let basicButtonSmall = css({
    padding: '1px 5px',
    fontSize: '.9em',
    backgroundColor: theme.color4.hex,
    color: theme.color4_text.hex,
    border: `1px solid ${theme.color3.hex}`,
    borderRadius: '2px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.color3.hex,
      color: theme.color3_text.hex
    }
  })

  let formButton = css({
    fontSize: 'inherit',
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex,
    padding: '8px 20px',
    margin: '3px 10px',
    // border: 'none',
    border: `1px solid ${theme.color2.hex}`,
    borderRadius: '2px',
    cursor: 'pointer',
    // float: 'left',
    '&:hover': {
      backgroundColor: theme.color4.hex,
      color: '#fff'
    }
  })

  let formContainer = css({
    borderRadius: '2px',
    borderTop: `1px solid ${theme.color2.hex}`,
    borderBottom: `1px solid ${theme.color2.hex}`,
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex,
    padding: '20px'
  })

  let col10 = css({
    float: 'left',
    marginTop: '6px',
    width: '10%'
  })

  let col20 = css({
    float: 'left',
    marginTop: '6px',
    width: '20%'
  })

  let col25 = css({
    float: 'left',
    marginTop: '6px',
    width: '25%'
  })

  let col50 = css({
    float: 'left',
    width: '50%',
    marginTop: '6px'
  })

  let col70 = css({
    float: 'left',
    marginTop: '6px',
    width: '70%'
  })

  let col75 = css({
    float: 'left',
    width: '75%',
    marginTop: '6px'
  })

  let pointer = {
    cursor: 'pointer'
  }

  /* Clear floats after the columns */
  let row = css({
    '&:after': {
      content: '""',
      display: 'table',
      clear: 'both'
    }
  })

  /*the container must be positioned relative:*/
  let customSelect = {
    border: `1px solid ${theme.color2.hex}`,
    position: 'relative',
    fontFamily: 'Arial',
    '& select': {
      display: 'none' /*hide original SELECT element:*/
    }
  }

  let selectSelected = {
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex,
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

  let selectArrowActive = {}

  /*style items (options):*/
  let selectItems = {
    position: 'absolute',
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex,
    top: '100%',
    left: '0',
    right: '0',
    zIndex: '99',
    /*style the items (options), including the selected item:*/
    '& div,.selectSelected': {
      color: theme.color5_text.hex,
      padding: '8px 16px',
      border: '1px solid transparent',
      borderColor: `transparent transparent ${theme.color5.rgba(
        0.1
      )} transparent`,
      cursor: 'pointer',
      userSelect: 'none'
    },
    '& div:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
  }

  let sameAsSelected = {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  }

  /*hide the items when the select box is closed:*/
  let selectHide = {
    display: 'none'
  }

  /* The Close Button */
  let closeButton = {
    color: theme.color3.hex,
    float: 'right',
    fontSize: '24px',
    fontWeight: 'bold',
    position: 'relative',
    top: '-16px',
    right: '5px',
    '&:hover': {
      color: theme.color5.hex,
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
  let editIcon = {
    cursor: 'pointer',
    margin: '5px',
    float: 'left'
  }

  return {
    active,
    basics,
    basicButton,
    basicButtonFx,
    basicButtonSmall,
    card,
    cardNoHover,
    cardTitle,
    cardInfo,
    container,
    closeButton,
    col10,
    col20,
    col25,
    col50,
    col70,
    col75,
    collapsible,
    collapsibleContent,
    customSelect,
    detailCard,
    editIcon,
    formButton,
    formContainer,
    formInput,
    inactive,
    label,
    miniCard,
    pointer,
    programForm,
    promo,
    row,
    sameAsSelected,
    section,
    selectArrowActive,
    selectedMiniCard,
    selectHide,
    selectInput,
    selectItems,
    selectSelected,
    stripe,
    viewContainer,
    warn
  }
}
