/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { gridStyles } from '../../styles/gridStyles'
import { styles } from '../../styles/MainStyles'

const ProgramHighlightCard = props => {
  const themeContext = useContext(ThemeContext)
  let { gridItem } = gridStyles(themeContext.theme)
  let { cardNoHover, cardTitle, cardInfo } = styles(themeContext.theme)

  return (
    <div style={{margin:'5px', borderRadius:'3px'}} css={[cardNoHover, gridItem]} id={props.program.id} onClick={props.onClick}>
      <div css={cardTitle}>{props.program.name}</div>
      <div css={cardInfo}>{props.program.description}</div>
    </div>
  )
}

export default ProgramHighlightCard
