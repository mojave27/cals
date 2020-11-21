/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { woDayStyles } from '../../styles/WoDayStyles'
import ThemeContext from '../../context/ThemeContext'

const RangeSliderInput = props => {
  let context = useContext(ThemeContext)

  let { slider } = woDayStyles(context.theme)

  const getCss = () => {
    let returnCss = [slider]
    let jssClass = get(props, 'jssClass', null)
    returnCss.push(jssClass)
    return returnCss
  }

  return (
    <React.Fragment>
      <label
        style={{
          float: 'left',
          display: 'inline',
          fontWeight: '700',
          // width: '15%',
          marginRight: '5px'
        }}
      >
        {props.label}
      </label>
      <input
        type='range'
        min={get(props, 'min', '0')}
        max={get(props, 'max', '10')}
        value={props.value}
        onChange={props.onChange}
        css={getCss()}
        id={props.id}
      />
      <label>{props.value}</label>
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
