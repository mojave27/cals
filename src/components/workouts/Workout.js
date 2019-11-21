/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import { detailCard, container, stripe, promo, warn } from '../../styles/theme'

const Workout = props => {
  return (
    <React.Fragment>
    <div css={detailCard}>
    <div css={container}>
      <h3>Ho Ho Ho! Happy Workout!</h3>
    </div>
    <div css={stripe} />
    {/* <div css={container} style={{backgroundColor:'white'}}> */}
    <div css={container}>
      <p>Lorem ipsum..</p>
    </div>
    <div css={container}>
      <p>Use Promo Code: <span css={promo}>BOH232</span></p>
      <p css={warn}>Expires: Jan 03, 2021</p>
    </div>
  </div>
  </React.Fragment>
  )
}

export default Workout
