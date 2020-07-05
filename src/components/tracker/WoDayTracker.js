import React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { Link } from '@reach/router'
import { styles } from '../../styles/MainStyles'

const WoDayTracker = props => {
  // let [showModal, setShowModal] = useState(false)
  // let woDayContext = useContext(WoDayContext)
  let themeContext = useContext(ThemeContext)

  let { cardNoHover, detailCard, row, basicButton } = styles(themeContext.theme)

  return (
    <React.Fragment>
      {/* <Modal showModal={showModal} handleClose={toggleModal}>
      // make this a woday chooser, so you could edit previous wodays if needed
        <WoDayChooser done={done} chooseWoDay={chooseWoDay} />
      </Modal> */}
      <div css={detailCard}>
        <div css={cardNoHover}>
          <div css={row} style={{ border: '1px solid #eee' }}>
            <Link to='/admin/test/woday' state={{ new: true }}>
              <input
                style={{ margin: '5px' }}
                type='button'
                value='New WoDay'
                css={[basicButton]}
                // onClick={saveWoDay}
              />
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default WoDayTracker
