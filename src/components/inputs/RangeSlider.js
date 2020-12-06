/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { woDayStyles } from '../../styles/WoDayStyles'
import ThemeContext from '../../context/ThemeContext'

const styles = {
  label: {
    textAlign: 'right',
    paddingRight: '30px',
    display: 'inline-block',
    fontWeight: '700',
    float:'left',
    padding:'5px 10px',
    width:'75px'
  },
  input: {
    display: 'inline-block',
    lineHeight:'23px'
  }
}

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
      <div style={styles.label}>
        <label htmlFor={props.value}>{props.label}</label>
      </div>
      <div style={styles.input}>
      <input
        type='range'
        min={get(props, 'min', '0')}
        max={get(props, 'max', '10')}
        value={props.value}
        onChange={props.onChange}
        css={getCss()}
        id={props.id}
      />
      <label style={{marginLeft: '5px'}}>{props.value}</label>
      </div>
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
