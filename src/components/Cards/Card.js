import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { card, cardTitle, cardInfo } from '../../config/theme'

const Card = props => {
  return (
    <div css={card}>
      <div css={cardTitle}>{props.title}</div>
      <div css={cardInfo}>{props.description}</div>
    </div>
  )
}

export default Card
