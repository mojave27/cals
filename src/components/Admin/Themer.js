/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment, useContext } from 'react'
import { formContainer, row } from '../../styles/main-styles'
import ThemeContext from '../../context/ThemeContext'

const Themer = props => {
  // const [reportData, setReportData] = useState({})

  return (
    <div css={formContainer}>
      <div css={row}>Test Page</div>
      <ChangeTheme />
    </div>
  )
}

export default Themer

const ChangeTheme = () => {
  let context = useContext(ThemeContext)
  const changeMyTheme = () => {
    context.changeTheme('stormTrooper')
  }
  return (
    <Fragment>
      <div style={{ maxWidth: '150px', display: 'inline-block' }}>
        <button name='changeTheme' onClick={changeMyTheme}>changeTheme</button>
      </div>
    </Fragment>
  )
}
