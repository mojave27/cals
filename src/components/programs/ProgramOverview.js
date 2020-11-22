/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext } from 'react'
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
import { gridStyles } from '../../styles/gridStyles'
import ThemeContext from '../../context/ThemeContext'

const ProgramOverview = props => {
  const themeContext = useContext(ThemeContext)
  const { gridItemNoHover, gridContainer } = gridStyles(themeContext)

  const renderWorkouts = workouts => {
    if (!isUndefined(workouts)) {
      return workouts.map(wo => {
        return (
          <div key={`${wo.id}`} css={[workoutBlock, gridItemNoHover]}>
            <div css={blockHeader}>{wo.name}</div>
            <div>{renderSets(wo.sets)}</div>
          </div>
        )
      })
    }
    return null
  }

  const renderSets = sets => {
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

  const editProgram = () => {
    navigate(`/program-form/${props.program.id}`)
  }

  return (
    <div css={cardNoHover} id={props.program.id}>
      <span css={closeButton} onClick={props.handleClose}>
        &times;
      </span>
      <div>
        <div css={cardTitle}>{props.program.name}</div>
        <div css={cardInfo}>{props.program.description}</div>
        <div css={gridContainer}>
          {renderWorkouts(props.program.workouts)}
          <br />
        </div>
        {props.edit ? (
          <button css={formButton} onClick={editProgram}>
            Edit
          </button>
        ) : null}
        {props.select ? (
          <button
            id={props.program.id}
            css={formButton}
            onClick={props.selectProgram}
          >
            Select
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default ProgramOverview
