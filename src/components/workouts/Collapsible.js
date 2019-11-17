/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import { detailCard, container, stripe, promo, expire } from '../../config/theme'

const Set = props => {
  return (
    <React.Fragment>
    <div css={detailCard}>
    <div css={container}>
      <h3>{props.program.name}</h3>
    </div>
    {/* <img css={tempImage} src="hamburger.jpg" alt="Avatar" /> */}
    <div css={stripe} />
    <div css={container} style={{backgroundColor:'white'}}>
      <h3><b>{props.program.description}</b></h3>
      {/* <p>Lorem ipsum..</p> */}
    </div>
    <div css={container}>
      <p>Use Promo Code: <span css={promo}>BOH232</span></p>
      <p css={expire}>Expires: Jan 03, 2021</p>
    </div> */}
  </div>
  </React.Fragment>
  )
}

export default Set
