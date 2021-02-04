import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from 'context/ThemeContext'

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
    borderBottom: `1px solid ${theme.palette.primary.main}`
  },
  accordionDetails: {
    padding: '0px'
  }
}))

const AccordionWrapper = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography>{props.label}</Typography>
      </AccordionSummary>
      <AccordionDetails classes={{ root: classes.accordionDetails}}>{props.children}</AccordionDetails>
    </Accordion>
  )
}

export default AccordionWrapper
