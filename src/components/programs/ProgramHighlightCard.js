/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { card, cardTitle, cardInfo } from '../../styles/main-styles'

const ProgramHighlightCard = props => {
  return (
    <div css={card} id={props.program.id} onClick={props.onClick}>
      <div css={cardTitle}>{props.program.name}</div>
      <div css={cardInfo}>{props.program.description}</div>
    </div>
  )
}

export default ProgramHighlightCard
