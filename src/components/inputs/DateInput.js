/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'


const DateInput = props => {
  return (
    <React.Fragment>
      <label
        style={{
          textAlign: 'right',
          paddingRight: '30px',
          display: 'inline-block',
          fontWeight: '700',
          float:'left',
          padding:'5px 10px',
          width:'75px'
        }}
      >
        {props.label}
      </label>
      <DatePicker
        selected={props.startDate}
        onChange={date => props.setStartDate(date)}
      />
    </React.Fragment>
  )
}

DateInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  startDate: PropTypes.any,
  setStartDate: PropTypes.func
}

DateInput.defaultProps = {
  id: 'DateInput',
  label: 'Date'
}

export default DateInput
