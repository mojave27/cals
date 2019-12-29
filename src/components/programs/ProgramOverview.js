/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { navigate } from '@reach/router'
import Table from '../tables/SimpleTable'
import { isUndefined } from 'lodash'
import {
  cardNoHover,
  cardTitle,
  cardInfo,
  closeButton,
  formButton
} from '../../styles/main-styles'
import { workoutBlock, blockHeader, setBlock } from '../../styles/program'
import { gridContainer, gridItemNoHover } from '../../styles/gridStyles'

class ProgramOverview extends React.Component {
  state = { sections: {}, expandText: 'Expand', expandAll: false }

  render() {
    // console.log(JSON.stringify(this.props.program))
    return (
      <div
        css={cardNoHover}
        id={this.props.program.id}
      >
        <span css={closeButton} onClick={this.props.handleClose}>
          &times;
        </span>
        <div>
          <div css={cardTitle}>{this.props.program.name}</div>
          <div css={cardInfo}>{this.props.program.description}</div>
          <div css={gridContainer}>
            {this.renderWorkouts(this.props.program.workouts)}
            <br />
          </div>
          {this.props.edit ? (
            <button css={formButton} onClick={this.editProgram}>
              Edit
            </button>
          ) : null}
          {this.props.select ? (
            <button
              id={this.props.program.id}
              css={formButton}
              onClick={this.props.selectProgram}
            >
              Select
            </button>
          ) : null}
        </div>
      </div>
    )
  }

  renderWorkouts = workouts => {
    if (!isUndefined(workouts)) {
      return workouts.map(wo => {
        return (
          <div key={`${wo.id}`} css={[workoutBlock, gridItemNoHover]}>
            <div css={blockHeader}>{wo.name}</div>
            <div>{this.renderSets(wo.sets)}</div>
          </div>
        )
      })
    }
    return null
  }

  renderSets = sets => {
    return sets.map(set => {
      let data = {
        headers: ['name', 'reps'],
        rows: [...set.exercises]
      }
      return (
        <div key={set.id} css={setBlock}>
          <Table data={data} disabled={true} />
        </div>
      )
    })
  }

  editProgram = () => {
    navigate(`/program-form/${this.props.program.id}`)
  }
}

export default ProgramOverview
