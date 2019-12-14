/** @jsx jsx */
import { jsx } from '@emotion/core'
import Table from '../tables/SimpleTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { row, col25, col75, card } from '../../styles/main-styles'
import { workoutHeader } from '../../styles/program'

const SetViewer = props => {

  const renderExercises = exercises => {
    let data = {
      headers: ['name', 'reps'],
      rows: exercises
    }
    return (
      <div style={{maxWidth: '200px', margin: '0px auto'}}>
        <Table data={data} />
      </div>
    )
  }

  return (
    <div css={card} style={{maxWidth:'300px', margin: '0px auto'}} id={props.id} onClick={props.selectSet}>
      <div css={row}>
        <div css={workoutHeader}>
            {props.set.id}
            <FontAwesomeIcon alt={'delete set'} id={props.set.id} style={{ marginLeft:'10px', float:'right' }} icon={faTrashAlt}  onClick={props.deleteSet} />
            <FontAwesomeIcon alt={'edit set'} id={props.set.id} style={{ marginLeft:'10px', float:'right' }} icon={faEdit}  onClick={props.selectSet} />
          </div>
      </div>
      <div css={row}>
        <div css={col25}> 
          <label htmlFor='whatevs'>set {props.set.id}</label>
        </div>
        <div css={col75}>
          <div css={row}>
            {/* handle when exercises aren't loaded yet */}
            {props.set.exercises.length > 0
            ? renderExercises(props.set.exercises)
            : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetViewer
