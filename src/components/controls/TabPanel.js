import React from 'react'
import { Box, Container } from '@material-ui/core'

const TabPanel = props => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
        <Box p={3}>
          {children}
        </Box>
        </Container>
      )}
    </div>
  )
}

export default TabPanel