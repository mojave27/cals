/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React, { useState } from 'react'
import Set from '../sets/Set'
import {
  detailCard,
  container,
  formButton,
  stripe
} from '../../styles/main-styles'

const Workout = props => {
  const [workout, setWorkout] = useState({})
  const [sets, setSets] = useState([])
  const [showSetDialog, setShowSetDialog] = useState(false)
  
  const toggleSetDialog = () => {
    setShowSetDialog(true)
  }

  return (
    <React.Fragment>
      <div css={detailCard}>
        <div css={container}>
          <h3>Workout Name goes here</h3>
        </div>
        <div css={stripe} />

        <div css={container}>
          <div style={{ display: 'block', paddingBottom: '10px' }}>
            <div style={{ paddingBottom: '10px' }}>Sets go here</div>
            <input
              type='button'
              value='Add Set'
              css={formButton}
              onClick={toggleSetDialog}
              style={{ display: 'block' }}
            />
            {showSetDialog ? <Set /> : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Workout
