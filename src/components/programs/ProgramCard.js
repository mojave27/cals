/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import {
  detailCard,
  container,
  stripe,
  promo,
  expire,
  collapsible,
  collapsibleContent,
  active,
  inActive
} from '../../config/theme'

class ProgramCard extends React.Component {
  state = {isActive:false}

  render() {

    let collapseClass = [collapsibleContent, inActive]
    if (this.state.isActive) {
      collapseClass = [collapsibleContent, active]
    }

    return (
      <React.Fragment>
        <div css={detailCard}>
          <div css={container}>
            <h3>{this.props.program.name}</h3>
          </div>
          <div css={stripe} />
          <div css={container} style={{ backgroundColor: 'white' }}>
            <h4>
              <b>{this.props.program.description}</b>
            </h4>
            {/* <p>Lorem ipsum..</p> */}
          </div>
          <div css={container}>
            <button id={'collapse1'} type='button' css={collapsible} onClick={this.handleCollapseExpand}>
              Workout id or name here
            </button>
            <div css={collapseClass}>
              {/* <p> */}
                workout content here
              {/* </p> */}
            </div>

            <p>
              Use Promo Code: <span css={promo}>BOH232</span>
            </p>
            <p css={expire}>Expires: Jan 03, 2021</p>
          </div>{' '}
          */}
        </div>
      </React.Fragment>
    )
  }

  handleCollapseExpand = (event) => {
    // console.log(event.target.id)
    // let id = event.target.id
    // let section = this.state.sections[id]
    // this.setState()
    this.setState(prevState => {
      return { isActive: !prevState.isActive }
    })
  }

}

export default ProgramCard
