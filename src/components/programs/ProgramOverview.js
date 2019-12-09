/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { navigate } from "@reach/router"
import Table from '../tables/SimpleTable'
import { card, cardTitle, cardInfo, closeButton, formButton } from '../../styles/main-styles'

import { workoutBlock, workoutHeader, setBlock } from '../../styles/program'

class ProgramOverview extends React.Component {
  state = { sections: {}, expandText: 'Expand', expandAll: false }

  render() {
    return (
      // <React.Fragment>
      <div css={card} id={this.props.program.id} >
        <span css={closeButton} onClick={this.props.handleClose}>&times;</span>
        <div css={cardTitle}>{this.props.program.name}</div>
        <div css={cardInfo}>{this.props.program.description}</div>
        {this.renderWorkouts(this.props.program.workouts)}<br />
        <button css={formButton} onClick={this.editProgram}>Edit</button>
      </div>
      // </React.Fragment>
    )
  }

  renderWorkouts = workouts => {
    return workouts.map(wo => {
      return (
        <div key={wo.id} css={workoutBlock}>
          <div css={workoutHeader}>{wo.name}</div>
          <div>{this.renderSets(wo.sets)}</div>
        </div>
      )
    })
  }

  renderSets = sets => {
    return sets.map(set => {
      let data = {
        headers: ['name', 'reps'],
        rows: [...set.exercises]
      }
      return (
        <div key={set.id} css={setBlock}>
          <Table data={data} />
        </div>
      )
    })
  }

  editProgram = () => {
    navigate(`/program-form/${this.props.program.id}`)
  }

}

export default ProgramOverview
