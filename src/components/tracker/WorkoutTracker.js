/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useState } from 'react'
import Spinner from '../Spinner'
import TrackerContext from '../../context/TrackerContext'
import SetTable from '../tables/SetTable'
import SetEditor from './SetEditor'
import Modal from '../Modal'
import ExerciseTable from '../tables/ExerciseTable'
import { setBlock } from '../../styles/program'
import { trackerSet } from '../../styles/programTracker.styles'
import { topRight } from '../../styles/buttonStyles'
import { cloneDeep, isEmpty } from 'lodash'
import {
  formButton,
  container,
  detailCard,
  row,
  stripe,
  basicButtonSmall
} from '../../styles/main-styles'
import { Row } from '../../styles/table'
import { isUndefined } from 'lodash'

const WorkoutTracker = props => {
  let context = useContext(TrackerContext)
  const [showSpinner, setShowSpinner] = useState(false)
  const [activeSet, setActiveSet] = useState({})

  const toggleSpinner = show => {
    if (isUndefined(show)){ 
      console.log(`toggling showSpinner from ${showSpinner} to ${!showSpinner}`)
      setShowSpinner(!showSpinner)
    }else{
      console.log(`toggling showSpinner from ${showSpinner} to ${show}`)
      setShowSpinner(show)
    }
  }

  const done = async () => {
    await setActiveSet({})
  }

  const handleCellChange = update => {
    update.workoutId = context.activeWorkout.id
    props.update(update)
  }

  const addDate = () => {
    props.addDate(context.activeWorkout.id)
  }

  const addSet = () => {
    console.log(`add set to workout: ${context.activeWorkout.id}`)

    let workout = context.activeWorkout

    // select existing?

    // create from scratch
    let ids = getIdsFromList(workout.sets)
    ids.sort()
    let newId = ids[ids.length - 1] + 1
    console.log(`new id is ${newId}`)
    let set = {
      id: newId,
      exercises: []
    }

    // add set to workout
    workout.sets.push(set)

    // add set to each day in workout
    let days = workout.days.map( day => {
      day.sets.push(set)
      return day
    })

    workout.days = days

    // update activeWorkout
    context.updateActiveWorkout(workout)

  }

  const getIdsFromList = list => {
    let ids = list.map( item => item.id)
    return ids
  }

  const copySet = async event => {
    toggleSpinner(true)
    let setId = event.target.parentNode.id
    console.log(`copy set with id ${setId} to workout: ${context.activeWorkout.id}`)

    // --------------------------------------------------------
    let workout = context.activeWorkout
    let ids = getIdsFromList(workout.sets)
    ids.sort()
    let newId = ids[ids.length - 1] + 1
    console.log(`new id is ${newId}`)
    let originalSet = context.activeWorkout.sets.find(set => Number(set.id) === Number(setId))
    let setCopy = cloneDeep(originalSet)
    setCopy.id = newId

    // add set to workout
    workout.sets.push(setCopy)

    // add set to each day in workout
    let days = workout.days.map( day => {
      day.sets.push(setCopy)
      return day
    })

    workout.days = days

    // update activeWorkout
    context.updateActiveWorkout(workout)
    // --------------------------------------------------------

    toggleSpinner(false)
  }

  const editSet = async event => {
    toggleSpinner(true)
    let setId = event.target.parentNode.id
    let set = context.activeWorkout.sets.find(
      set => Number(set.id) === Number(setId)
    )
    await setActiveSet(set)
    toggleSpinner(false)
  }

  const updateSet = update => {
    // console.log(`update for set: ${JSON.stringify(update)}`)
    setActiveSet(update)
  }

  // const saveSet = setId => {
  const saveSet = async () => {
    let update = {
      workoutId: context.activeWorkout.id,
      set: activeSet
    }
    await props.updateSet(update)
    done()
  }

  const renderSets = workout => {
    // console.log(JSON.stringify(workout))
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
            <SetTable data={data} copySet={copySet} editSet={editSet} />
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
      <Modal showModal={showSpinner} handleClose={toggleSpinner}>
        <Spinner show={showSpinner} />
      </Modal>
      <Modal showModal={!isEmpty(activeSet)} handleClose={done}>
        <SetEditor
          set={activeSet}
          updateSet={updateSet}
          saveSet={saveSet}
          done={done}
        />
      </Modal>
      <div css={detailCard}>
        <DisplayHeader done={props.done} workout={context.activeWorkout} />
        <Stripe />
        <div
          css={container}
          style={{
            margin: '20px 25px',
            display: 'inline-block',
            maxWidth: '90%'
          }}
        >
          <div css={row} style={{ padding:'5px', marginTop:'5px' }}>
            <input
              type='submit'
              value='Add Day'
              css={[basicButtonSmall, { float:'left', marginRight:'5px' }]}
              onClick={addDate}
            />
            <input
              type='submit'
              value='Add Set'
              css={[basicButtonSmall, { float: 'left' }]}
              onClick={addSet}
            />
          </div>
          {/* <div style={{ display: 'block', padding: '10px 0px' }}> */}
          <div style={{ display: 'block' }}>
            {renderSets(context.activeWorkout)}
          </div>
        </div>
        <div css={row}>
          <input
            title='Save All Program Changes'
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
    <div css={container}>
      <div onClick={props.done} css={topRight} >
        &times;
      </div>
      <div css={row} >{props.workout.name}</div>
      <div css={row} >{props.workout.description}</div>
    </div>
  )
}
