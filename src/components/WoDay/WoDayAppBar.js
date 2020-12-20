import React, { useContext } from 'react'
import StopWatch from '../Admin/StopWatch'
import { AppBar, Button, Grid, Toolbar } from '@material-ui/core'
import ThemeContext from '../../context/ThemeContext'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex
  }
}))

const WoDayAppBar = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)
  return (
    <AppBar position='sticky' className={classes.appBar}>
      <Toolbar>
        <Grid
          container
          spacing={2}
          justify='center'
          alignItems='center'
          direction='row'
        >
          <Grid item xs={10} sm={8}>
            <StopWatch />
          </Grid>
          <Grid item xs={2} sm={4} alignContent='flex-end'>
            <div style={{float:'right', margin:'0px'}}>
              <Button color={'inherit'} onClick={props.onSave}>
                {'Save'}
              </Button>
              <Button color={'inherit'} onClick={props.onClose}>
                {'Close'}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default WoDayAppBar
