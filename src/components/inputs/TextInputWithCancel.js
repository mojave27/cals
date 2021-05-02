import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { IconButton, InputAdornment, TextField } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear';

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

const TextInputWithCancel = props => {
  const classes = useStyles()
  return (
    <TextField
      value={props.data ? props.data : ''}
      id={props.id}
      label={props.name}
      name={props.name}
      onChange={props.onChange}
      size='small'
      type='text'
      variant='outlined'
      InputProps={{ 
       classes: classes,
       endAdornment:
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={props.handleCancel}
            // onMouseDown={props.handleClear}
          >
            {<ClearIcon />}
          </IconButton>
        </InputAdornment>
      }}
      InputLabelProps={{
        shrink: true
      }}
    />
  )
}

export default TextInputWithCancel
