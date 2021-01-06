import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import ThemeContext from '../../context/ThemeContext'

const useStyles = makeStyles(theme => ({
  bottom: {
    // color: theme.name === 'snow' ? 'red' : theme.color1.hex,
    animationDuration: '1250ms',
    position: 'absolute',
    left: '50%',
    top: '40%'
  }
}))

const BasicSpinner = props => {
  let context = useContext(ThemeContext)
  const classes = useStyles({ theme: context.theme })
  const { show } = props

  return (
    show === true ?
    <Container>
      <CircularProgress
        className={classes.bottom}
        size={40}
        thickness={4}
        value={100}
      />
    </Container>
    : null 
  )
}

export default BasicSpinner
