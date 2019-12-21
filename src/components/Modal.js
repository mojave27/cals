/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { modal, modalContent, close } from '../styles/modal'

const Modal = props => {
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
