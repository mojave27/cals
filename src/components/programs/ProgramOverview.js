/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
// import Workout from '../workouts/Workout'
import Table from '../tables/Table'

import {
  active,
  collapsible,
  collapsibleContent,
  container,
  programDetailCard,
  inactive,
  stripe,
  viewContainer
} from '../../styles/program'

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
        <div style={{border:'1px solid lime', display:'inline-block'}}>
          {wo.name}
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
      return <Table data={data} />
    })
  }

}

export default ProgramOverview
