/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import {
  detailCard,
  container,
  stripe,
  promo,
  warn,
  collapsible,
  collapsibleContent,
  active,
  inactive
} from '../../styles/theme'

class ProgramCard extends React.Component {
  state = { sections: {}, expandText: 'Expand', expandAll: false }

  render() {
    return (
      <React.Fragment>
        <div css={detailCard}>
          <div css={container}>
            <h3>{this.props.program.name}</h3>
          </div>
          <div css={stripe} />
          <div css={container}>
            <h4>{this.props.program.description}</h4>
          </div>
          {/* <div onClick={this.toggleAll} style={{ color: '#fff' }}>
            {' '}
            {this.state.expandText} All
          </div> */}
          <div css={container}>
            {this.renderWorkouts(this.props.program.workouts)}
            <p>
              Use Promo Code: <span css={promo}>BOH232</span>
            </p>
            <p css={warn}>last updated: Jan 03, 2021</p>
          </div>
        </div>
      </React.Fragment>
    )
  }

  renderWorkouts = workouts => {
    return workouts.map(workout => {
      let id = `${workout.name}-${workout.id}`
      return (
        <React.Fragment key={id}>
          <button
            id={id}
            type='button'
            css={collapsible}
            onClick={this.handleCollapseExpand}
          >
            {workout.name}
          </button>
          <div css={this.getClassName(id)}>sets w/ exercises here</div>
        </React.Fragment>
      )
    })
  }

  getClassName = id => {
    let collapseClass = [collapsibleContent, inactive]
    if (this.isSectionActive(id)) {
      collapseClass = [collapsibleContent, active]
    }
    return collapseClass
  }

  isSectionActive = id => {
    // if (this.state.expandAll) {
    //   return true
    // }
    return this.state.sections[id] && this.state.sections[id].active
  }

  toggleAll = () => {
    let expandText = 'Expand'
    if (this.state.expandText === 'Expand') {
      expandText = 'Collapse'
    }

    let expandAll = !this.state.expandAll
    let sections = this.state.sections
    for (let key in this.state.sections) {
      sections[key].active = expandAll
    }

    this.setState({
      expandText: expandText,
      expandAll: expandAll,
      sections: sections
    })

    // this.setState(prevState => {
    //   return {
    //     expandText: expandText,
    //     expandAll: !prevState.expandAll
    //   }
    // })
  }

  handleCollapseExpand = event => {
    let id = event.target.id
    let isActive =
      this.state.sections[id] && this.state.sections[id].active ? false : true
    console.log(`isActive: ${isActive}`)
    this.setState(prevState => {
      let sections = prevState.sections
      sections[id] = { active: isActive }
      return { sections: sections, expandAll: !prevState.expandAll }
    })
  }
}

export default ProgramCard
