import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from '../../context/ThemeContext'

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  accordion: {
    backgroundColor: theme.color4.hex,
    color: theme.color4_text.hex,
    borderBottom: `1px solid ${theme.color3.rgba(.5)}`
  },
  expandIcon: {
    color: theme.color4_text.hex
  }
}))

const AccordionWrapper = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon classes={{ root: classes.expandIcon }} />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography className={classes.heading}>{props.label}</Typography>
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  )
}

export default AccordionWrapper
