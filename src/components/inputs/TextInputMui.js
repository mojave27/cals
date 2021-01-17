import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { fade, makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    borderRadius: 4,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&$focused': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    }
  },
  focused: {}
}))

const TextInput = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)
  return (
    <TextField
      // inputProps={{'data-setid': props.setid}}
      id={props.id}
      name={props.name}
      label={props.name}
      defaultValue={props.data ? props.data : ''}
      type='text'
      InputProps={{ classes: classes }}
      InputLabelProps={{
        shrink: true
      }}
      variant='outlined'
      onChange={props.onChange}
      size='small'
    />
  )
}

export default TextInput
