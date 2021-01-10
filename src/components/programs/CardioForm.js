import React, { useContext, useState } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { fade, makeStyles } from '@material-ui/core/styles'
import FormButton from '../inputs/FormButton'
import { Card, CardContent, TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {}
}))

const useStylesInput = makeStyles(theme => ({
  root: {
    // color: theme.color1_text.hex,
    border: `1px solid ${theme.palette.primary.light}`,
    overflow: 'hidden',
    borderRadius: 4,
    // backgroundColor: theme.color1.hex,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      // backgroundColor: '#eee'
    },
    '&$focused': {
      // backgroundColor: '#eee',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.light
    }
  },
  focused: {}
}))

const CardioForm = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  const inputClasses = useStylesInput(themeContext.theme)

  const [workout, setWorkout] = useState({name:'', description: '', targets: ''})

  const saveCardio = () => {
    console.log('saving cardio')
    console.log(workout)
    if (props.saveWorkout) props.saveWorkout(workout)
  }

  const handleTextChange = e => {
    let { id, value } = e.target
    setWorkout(prevState => {
      let newState = {...prevState}
      newState[id] = value
      return {...newState}
    })
  }

  return (
    <form id={'topLevelDiv'} className={classes.root} autoComplete='off'>
      <Card variant='outlined'>
        <CardContent style={{ overflow: 'scroll' }}>
          <div style={{ marginTop: '30px' }} />

          <TextField
            InputProps={{ classes: inputClasses }}
            id='name'
            label='Name'
            defaultValue={workout.name}
            onChange={handleTextChange}
            variant='outlined'
            size='small'
          />
          <div style={{ marginTop: '10px' }} />
          <TextField
            InputProps={{ classes: inputClasses }}
            id='description'
            label='Description'
            defaultValue={workout.description}
            onChange={handleTextChange}
            variant='outlined'
            size='small'
          />
          <div style={{ marginTop: '10px' }} />
          <TextField
            InputProps={{ classes: inputClasses }}
            id='targets'
            label='Targets'
            defaultValue={workout.targets}
            onChange={handleTextChange}
            variant='outlined'
            size='small'
          />
          <div style={{ marginTop: '10px' }} />
          <FormButton
            type='submit'
            styleProps={{ float: 'right' }}
            value={'Save'}
            onClick={saveCardio}
          />
          <div style={{ marginTop: '30px' }} />
        </CardContent>
      </Card>
    </form>
  )
}

export default CardioForm