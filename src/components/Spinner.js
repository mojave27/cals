import React from 'react'
import '../styles/spinner.css'

const Spinner = props => {
  return props.show ? <div className={'spinner'}>Loading...</div> : null
}

export default Spinner
