/** @jsx jsx */
import { jsx } from '@emotion/core'
import { card, cardTitle, cardInfo } from '../../styles/main-styles'
import { gridItem } from '../../styles/gridStyles'

const ProgramHighlightCard = props => {
  return (
    <div style={{margin:'5px', borderRadius:'3px'}} css={[card, gridItem]} id={props.program.id} onClick={props.onClick}>
      <div css={cardTitle}>{props.program.name}</div>
      <div css={cardInfo}>{props.program.description}</div>
    </div>
  )
}

export default ProgramHighlightCard
