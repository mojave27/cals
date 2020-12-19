/** @jsx jsx */
import { css } from '@emotion/core'
import { jsx } from '@emotion/core'
import { Fragment, useContext } from 'react'
import { row } from '../../styles/main-styles'
import ThemeContext from '../../context/ThemeContext'

const Themer = props => {
  let context = useContext(ThemeContext)

  let styles = {
    formContainer: css({
      borderRadius: '2px',
      borderTop: `1px solid ${context.theme.color2.hex}`,
      borderBottom: `1px solid ${context.theme.color2.hex}`,
      backgroundColor: context.theme.color5.hex,
      color: context.theme.color5_text.hex,
      padding: '20px'
    })
  }

  return (
    <div css={styles.formContainer} style={{minHeight: '100vh'}}>
      <div css={row} style={{marginTop:'25px'}}>Themer Page</div>
      <ChangeTheme theme={'stormTrooper'} />
      <ChangeTheme theme={'stormTrooperInverse'} />
      <ChangeTheme theme={'siberianWinter'} />
      <ChangeTheme theme={'woSheet'} />
      <ChangeTheme theme={'crystal'} />
      <ChangeTheme theme={'bakery'} />
      <ChangeTheme theme={'lake'} />
      <ChangeTheme theme={'villa'} />
      <div style={{ color: context.theme.color1, margin:'50px' }}>{context.theme.name}</div>
      <hr/>
      <div style={{backgroundColor: context.theme.color1.hex, color: context.theme.color1_text.hex, height:'100px', width:'200px'}}>color1</div>
      <div style={{backgroundColor: context.theme.color2.hex, color: context.theme.color2_text.hex, height:'100px', width:'200px'}}>color2</div>
      <div style={{backgroundColor: context.theme.color3.hex, color: context.theme.color3_text.hex, height:'100px', width:'200px'}}>color3</div>
      <div style={{backgroundColor: context.theme.color4.hex, color: context.theme.color4_text.hex, height:'100px', width:'200px'}}>color4</div>
      <div style={{backgroundColor: context.theme.color5.hex, color: context.theme.color5_text.hex, border: `1px solid ${context.theme.color4.hex}`, height:'100px', width:'200px'}}>color5</div>
    </div>
  )
}

const ChangeTheme = props => {
  let context = useContext(ThemeContext)
  const changeMyTheme = () => {
    context.changeTheme(props.theme)
  }
  return (
    <Fragment>
      <div style={{ maxWidth: '150px', display: 'inline-block', marginTop:'25px' }}>
        <button name='changeTheme' onClick={changeMyTheme}>{props.theme}</button>
      </div>
    </Fragment>
  )
}

export default Themer