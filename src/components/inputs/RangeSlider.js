import React, {useContext} from 'react'
import ThemeContext from 'context/ThemeContext'
import PropTypes from 'prop-types'
import { Box, Slider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  box: {
    color: theme.color4.hex,
    margin: 'auto',
    padding: '20px'
  },
  root: {
    color: theme.color4.hex,
    margin: 'auto',
    // padding: '20px'
  },
  thumb: { color: theme.color4.hex },
  margin: {
    height: theme.spacing(3)
  }
}))

const RangeSliderInput = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)

  function valuetext(value) {
    return `${value}`
  }

  return (
    <React.Fragment>
      <Box className={ classes.box }>
        <Typography gutterBottom>{props.label}</Typography>
        <Slider
          classes={{ root: classes.root, thumb: classes.thumb }}
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
