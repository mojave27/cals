/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import { formInput } from '../../styles/main-styles'

const styles = {
  label: {
    textAlign: 'right',
    paddingRight: '30px',
    width: '25%',
    display: 'inline-block',
    fontWeight: '700'
  },
  input: {
    width: '75%',
    display: 'inline-block'
  }
}

const TextInput = props => {
  return (
    <React.Fragment>
      <div style={styles.label}>
        <label htmlFor={props.value}>{props.label}</label>
      </div>
      <div style={styles.input}>
        <input
          css={formInput}
          type='text'
          id={props.id}
          name={props.name}
          value={props.value}
          placeholder='enter value..'
          onChange={props.onChange}
        />
      </div>
    </React.Fragment>
  )
}

TextInput.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

TextInput.defaultProps = {
  name: '',
  id: 'TextInput',
  label: '',
  value: ''
}

export default TextInput
