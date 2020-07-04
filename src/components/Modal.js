/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import { styles } from '../styles/ModalStyles'

const Modal = props => {
  let context = useContext(ThemeContext)
  let { modal, modalContent, close } = styles(context.theme)
  return props.showModal ? (
    <React.Fragment>
      <div id='myModal' css={modal}>
        <div css={modalContent}>
          <span css={close} onClick={props.handleClose}>&times;</span>
          {props.children}
        </div>
      </div>
    </React.Fragment>
    ) : null
}

export default Modal
