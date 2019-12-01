/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import Table from '../tables/SimpleTable'

import { workoutBlock, workoutHeader, setBlock } from '../../styles/program'

class ProgramOverview extends React.Component {
  state = { sections: {}, expandText: 'Expand', expandAll: false }

  render() {
    return (
      <React.Fragment>
        {this.renderWorkouts(this.props.program.workouts)}
      </React.Fragment>
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
}

export default ProgramOverview
