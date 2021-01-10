import React, { useContext, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import DateInput from '../inputs/DateInput'
import TextInput from '../inputs/TextInput'
import RangeSlider from '../inputs/RangeSlider'
import ThemeContext from '../../context/ThemeContext'
import FormButton from '../inputs/FormButton'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.color2_text.hex,
    backgroundColor: theme.color2.hex,
    margin: '3px'
  },
  container: {
    backgroundColor: theme.color4.hex,
    padding: '20px'
  }
}))

const Themer = props => {
  let context = useContext(ThemeContext)
  let classes = useStyles(context)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ minHeight: '100vh' }}>
      <Grid container spacing={2} justify='center'>
      <Grid item>
        <ChangeTheme theme={'vader'} />
      </Grid>
      <Grid item>
        <ChangeTheme theme={'stormTrooper'} />
      </Grid>
      <Grid item>
      <ChangeTheme theme={'stormTrooperInverse'} />
      </Grid>
      <Grid item>
      <ChangeTheme theme={'siberianWinter'} />
      </Grid>
      <Grid item>
      <ChangeTheme theme={'woSheet'} />
      </Grid>
      <Grid item>
      <ChangeTheme theme={'crystal'} />
      </Grid>
      <Grid item>
      <ChangeTheme theme={'bakery'} />
      </Grid>
      <Grid item> <ChangeTheme theme={'lake'} /> </Grid>
      <Grid item> <ChangeTheme theme={'light'} /> </Grid>
      <Grid item> <ChangeTheme theme={'dark'} /> </Grid>
      <Grid item>
      <ChangeTheme theme={'snow'} />
      </Grid>
      <Grid item>
      <ChangeTheme theme={'sea'} />
      </Grid>
      </Grid>
      <div style={{ color: context.theme.color1, margin: '50px' }}>
        {context.theme.name}
      </div>
      <hr />
      <Grid container spacing={1} justify='center'>
        <Grid item xs={12} sm={2}>
          <div
            style={{
              backgroundColor: context.theme.color1.hex,
              color: context.theme.color1_text.hex,
              height: '100px'
            }}
          >
            color1
          </div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div
            style={{
              backgroundColor: context.theme.color2.hex,
              color: context.theme.color2_text.hex,
              height: '100px'
            }}
          >
            color2
          </div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div
            style={{
              backgroundColor: context.theme.color3.hex,
              color: context.theme.color3_text.hex,
              height: '100px'
            }}
          >
            color3
          </div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div
            style={{
              backgroundColor: context.theme.color4.hex,
              color: context.theme.color4_text.hex,
              height: '100px'
            }}
          >
            color4
          </div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div
            style={{
              backgroundColor: context.theme.color5.hex,
              color: context.theme.color5_text.hex,
              border: `1px solid ${context.theme.color4.hex}`,
              height: '100px'
            }}
          >
            color5
          </div>
        </Grid>
      </Grid>
      <div style={{ marginTop: '30px' }} />
      <div className={classes.container}>
        <Grid container spacing={1} justify='flex-start'>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <DateInput
                label={'Date'}
                setStartDate={() => new Date()}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <TextInput
                label={'Duration'}
                name={'duration'}
                id={'duration'}
                placeholder={'workout duration...'}
                value={'0'}
                styles={{ width: '50%' }}
                onChange={() => {}}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <TextInput
                label={'Goals'}
                name={'goals'}
                id={'goals'}
                placeholder={'enter goals here'}
                value={'some goals'}
                styles={{ width: '100%' }}
                onChange={() => {}}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <TextInput
                label={'Weight'}
                name={'weight'}
                id={'weight'}
                value={'0'}
                placeholder={'enter weight'}
                styles={{ width: '100%' }}
                onChange={() => {}}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <RangeSlider
                label={'Energy'}
                id='energyRange'
                min={0}
                max={10}
                value={7}
                onChange={() => {}}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <RangeSlider
                label={'Sleep'}
                id='sleepRange'
                min={0}
                max={10}
                value={8}
                onChange={() => {}}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

const ChangeTheme = props => {
  let context = useContext(ThemeContext)
  const changeMyTheme = () => {
    context.changeTheme(props.theme)
  }
  return (
    <FormButton value={props.theme} onClick={changeMyTheme} />
  )
}

export default Themer
