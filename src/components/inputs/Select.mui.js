import React from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

const Select = props => {
  const classes = useStyles()

  const handleChange = e => {
    if (props.onChange) props.onChange(e)
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id='demo-simple-select-label'>{props.label}</InputLabel>
      <MuiSelect
        labelId='simple-select-label'
        id='simple-select'
        value={props.value}
        onChange={handleChange}
      >
        {props.options.map((option, index) => {
          return (
            <MenuItem key={`${option}-${index}`} value={option}>
              {option}
            </MenuItem>
          )
        })}
      </MuiSelect>
    </FormControl>
  )
}

export default Select
