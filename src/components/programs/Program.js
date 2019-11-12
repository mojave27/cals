import React from 'react'
import Card from '../Cards/Card'

const Program = props => {
  return(
    <Card title={props.program.name} description={props.program.description} />
  )
}

export default Program
