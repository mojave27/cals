import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Box, Slider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from '../../context/ThemeContext'

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    margin: 'auto'
  },
  margin: {
    height: theme.spacing(3)
  }
}))

const RangeSliderInput = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme)

  function valuetext(value) {
    return `${value}`
  }

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Typography gutterBottom>{props.label}</Typography>
        <Slider
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          getAriaValueText={valuetext}
          aria-labelledby={props.id}
          step={1}
          marks
          min={props.min}
          max={props.max}
          valueLabelDisplay='on'
        />
      </Box>
    </React.Fragment>
  )
}

RangeSliderInput.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func
}

RangeSliderInput.defaultProps = {
  name: '',
  id: 'RangeSliderInput',
  label: '',
  value: '10'
}

export default RangeSliderInput
