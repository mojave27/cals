/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import { formInput } from '../../styles/main-styles'

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
          style={{padding:'6px', ...props.styles}}
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
