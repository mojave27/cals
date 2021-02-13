import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  spinner: {
    animationDuration: '1250ms',
    position: 'absolute',
    left: '50%',
    top: '40%'
  }
}))

const BasicSpinner = props => {
  const classes = useStyles()
  const { show } = props

  return (
    show === true ?
    <Container >
      <CircularProgress
        color={'secondary'}
        className={classes.spinner}
        size={40}
        thickness={4}
        value={100}
      />
    </Container>
    : null 
  )
}

export default BasicSpinner
