/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import SetTable from '../tables/SetTable'
import SetEditor from './SetEditor'
import Modal from '../Modal'
import ExerciseTable from '../tables/ExerciseTable'
import { setBlock } from '../../styles/program'
import { trackerSet } from '../../styles/programTracker.styles'
import { topRight } from '../../styles/buttonStyles'
import { isEmpty } from 'lodash'
import {
  formButton,
  container,
  detailCard,
  row,
  stripe,
  basicButtonSmall
} from '../../styles/main-styles'
import { Row } from '../../styles/table'

const WorkoutTracker = props => {
  const [showModal, setShowModal] = useState(false)
  const [activeSet, setActiveSet] = useState({})

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const done = async () => {
    await setActiveSet({})
    toggleModal()
  }

  const handleCellChange = update => {
    update.workoutId = props.workout.id
    props.update(update)
  }

  const addDate = () => {
    props.addDate(props.workout.id)
  }

  const addSet = event => {
    // let setId = event.target.parentNode.id
    console.log(`add set to workout: ${props.workout.id}`)
  }

  const editSet = async event => {
    let setId = event.target.parentNode.id
    let set = props.workout.sets.find(set => Number(set.id) === Number(setId))
    await setActiveSet(set)
    toggleModal()
  }

  const updateSet = update => {
    console.log(`update for set: ${JSON.stringify(update)}`)
    setActiveSet(update)
  }

  // const saveSet = setId => {
  const saveSet = () => {
    let update = {
      workoutId: props.workout.id,
      set: activeSet
    }
    props.updateSet(update)
    toggleModal()
  }

  const renderSets = workout => {
    if (workout.sets && workout.sets.length > 0) {
      return workout.sets.map(set => {
        let data = {
          days: workout.days,
          setId: set.id,
          headers: ['name', 'reps', 'weight', 'actual reps'],
          rows: [...set.exercises]
        }
        return (
          <div key={set.id} css={[Row, setBlock, trackerSet]}>
            <SetTable data={data} editSet={editSet} />
            <ExerciseTable data={data} onCellChange={handleCellChange} />
          </div>
        )
      })
    } else {
      return null
    }
  }

  return (
    <React.Fragment>
      <Modal showModal={!isEmpty(activeSet)} handleClose={toggleModal}>
        <SetEditor
          set={activeSet}
          updateSet={updateSet}
          saveSet={saveSet}
          done={done}
        />
      </Modal>
      <div css={detailCard}>
        <DisplayHeader done={props.done} workout={props.workout} />
        <Stripe />
        <div
          css={container}
          style={{
            margin: '20px 25px',
            display: 'inline-block',
            maxWidth: '90%'
          }}
        >
          <div css={row} style={{ padding: '5px' }}>
            <input
              type='submit'
              value='Add Day'
              css={[basicButtonSmall, { float: 'left' }]}
              onClick={addDate}
            />
            <input
              type='submit'
              value='Add Set'
              css={[basicButtonSmall, { float: 'left' }]}
              onClick={addSet}
            />
          </div>
          <div style={{ display: 'block', padding: '10px 0px' }}>
            {renderSets(props.workout)}
          </div>
        </div>
        <div css={row}>
          <input
            type='submit'
            value='Save'
            css={[formButton, { float: 'right' }]}
            onClick={props.save}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default WorkoutTracker

const Stripe = () => {
  return (
    <div css={stripe} style={{ paddingTop: '5px', paddingBottom: '5px' }} />
  )
}

const DisplayHeader = props => {
  return (
    <div className={'container'} css={container}>
      <div onClick={props.done} css={topRight}>
        &times;
      </div>
      <div css={row}>{props.workout.name}</div>
      <div css={row}>{props.workout.description}</div>
    </div>
  )
}
