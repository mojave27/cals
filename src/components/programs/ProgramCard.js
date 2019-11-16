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
  state = { sections: {} }

  render() {
    // console.log(`workouts: ${JSON.stringify(this.props.program.workouts)}`)

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
          </div>
          <div css={container}>
            {this.renderWorkouts(this.props.program.workouts)}
            <p>
              Use Promo Code: <span css={promo}>BOH232</span>
            </p>
            <p css={expire}>Expires: Jan 03, 2021</p>
          </div>
        </div>
      </React.Fragment>
    )
  }

  renderWorkouts = workouts => {
    return workouts.map(workout => {
      let id=`${workout.name}-${workout.id}`
      return (
        <React.Fragment key={id}>
          <button
            id={id}
            type='button'
            css={collapsible}
            onClick={this.handleCollapseExpand}
          >
            Workout id or name here
          </button>
          <div css={this.getClassName(id)}>
            workout component here
          </div>
        </React.Fragment>
      )
    })
  }

  getClassName = (id) => {
    console.log(id)
    let collapseClass = [collapsibleContent, inActive]
    if(this.state.sections[id] && this.state.sections[id].active){
      collapseClass = [collapsibleContent, active]
    }
    return collapseClass
  }

  handleCollapseExpand = event => {
    let id = event.target.id
    let isActive = this.state.sections[id] && this.state.sections[id].active ? false : true
    this.setState(prevState => {
      let sections = prevState.sections
      sections[id] = { active: isActive}
      return { sections }
    })
  }
}

export default ProgramCard
