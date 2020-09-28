import React, { useContext, useState } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import ThemeContext from '../../context/ThemeContext'
import Modal from '../Modal'
import WoDayList from '../WoDay/WoDayList'
import { Link, navigate } from '@reach/router'
import { styles } from '../../styles/MainStyles'

const WODAY_PATH = '/admin/test/woday'

const WoDayTracker = props => {
  let [showModal, setShowModal] = useState(false)
  // let woDayContext = useContext(WoDayContext)
  let themeContext = useContext(ThemeContext)

  let { cardNoHover, detailCard, row, basicButton } = styles(themeContext.theme)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const chooseWoDay = id => {
    console.log(id)
    navigate(WODAY_PATH, { state: { id: id } })
  }

  return (
    <React.Fragment>
      {/* // make this a woday chooser, so you could edit previous wodays if needed */}
      <Modal showModal={showModal} handleClose={toggleModal}>
        <WoDayList done={toggleModal} chooseWoDay={chooseWoDay} />
      </Modal>
      <div css={detailCard}>
        <div css={cardNoHover}>
          <div css={row} style={{ border: '1px solid #eee' }}>
            <Link to={WODAY_PATH} state={{ new: true }}>
              <input
                style={{ margin: '5px' }}
                type='button'
                value='New WoDay'
                css={[basicButton]}
              />
            </Link>
              <input
                style={{ margin: '5px' }}
                type='button'
                value='Existing WoDay'
                css={[basicButton]}
                onClick={toggleModal}
              />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default WoDayTracker
