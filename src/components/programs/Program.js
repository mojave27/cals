import React from 'react'
import Card from '../Cards/Card'

const Program = props => {
  return(
    <Card 
      id={props.program.id}
      title={props.program.name}
      description={props.program.description} 
      onClick={props.onClick}
    />
  )
}

export default Program
