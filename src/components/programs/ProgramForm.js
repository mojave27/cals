/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { useContext, useState } from 'react'
import { findIndexOfId, updateItemById } from '../ArrayUtils'
import WoContext from '../../context/WoContext'
import ProgramContext from '../../context/ProgramContext'
import { workoutBlock, blockHeader, setBlock } from '../../styles/program'
import { updateProgram, addProgram } from '../../api/programsApi'
import {
  deleteWorkout as deleteWorkoutApi,
  retrieveWorkoutById
} from '../../api/workoutsApi'
import Table from '../tables/SimpleTable'
import Modal from '../Modal'
import WorkoutForm from '../workouts/WorkoutForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { isUndefined } from 'lodash'
import { navigate } from '@reach/router'

import { gridContainer, gridItem } from '../../styles/gridStyles'
import {
  basicButton,
  card,
  closeButton,
  row,
  col25,
  col75,
  formInput,
  formButton
} from '../../styles/main-styles'

const ProgramForm = props => {
  let programContext = useContext(ProgramContext)
  let woContext = useContext(WoContext)
  const [showWorkoutModal, setShowWorkoutModal] = useState(false)

  const saveProgram = () => {
    if (typeof programContext.program.id !== 'undefined') {
      updateProgram(programContext.program)
    } else {
      addProgram(programContext.program)
    }
  }

  const addWorkout = async () => {
    await woContext.setEmptyWorkout()
    toggleWorkoutModal()
  }

  const saveWorkout = () => {
    let updatedProgram = { ...programContext.program }
    let index = findIndexOfId(woContext.workout.id, updatedProgram.workouts)
    if (index > -1) {
      let workouts = updateItemById(
        woContext.workout,
        woContext.workout.id,
        updatedProgram.workouts
      )
      updatedProgram.workouts = workouts
    } else {
      updatedProgram.workouts.push(woContext.workout)
    }
    programContext.updateProgram(updatedProgram)
    saveProgram()
  }

  const editWorkout = async event => {
    let id = event.currentTarget.id
    let workout = await retrieveWorkoutById(id)
    await woContext.updateWorkout(workout)
    toggleWorkoutModal()
  }

  const deleteWorkout = event => {
    let id = event.currentTarget.id
    console.log(`deleting workout with id: ${id}`)
    deleteWorkoutApi(id)
    removeWorkoutFromProgramInContext(id)
  }

  const removeWorkoutFromProgramInContext = workoutId => {
    let program = programContext.program
    let workouts = program.workouts
    let indexOfWorkout = findIndexOfId(workoutId, workouts)
    workouts.splice(indexOfWorkout, 1)
    program.workouts = workouts
    programContext.updateProgram(program)
  }

  const handleTextChange = e => {
    let { id, value } = e.target
    let updatedProgram = { ...programContext.program }
    updatedProgram[id] = value
    programContext.updateProgram(updatedProgram)
  }

  const toggleWorkoutModal = () => {
    setShowWorkoutModal(!showWorkoutModal)
  }

  const handleClose = () => {
    navigate('/programs')
  }

  const renderWorkouts = workouts => {
    return programContext.program.workouts.map(wo => {
      return (
        <div
          key={wo.id}
          id={wo.id}
          css={[workoutBlock, gridItem]}
          style={{ marginLeft: '5px' }}
        >
          <div css={blockHeader}>
            {wo.name}
            <FontAwesomeIcon
              alt={'remove workout from program'}
              id={wo.id}
              style={{ marginLeft: '10px', float: 'right' }}
              icon={faTrashAlt}
              onClick={deleteWorkout}
            />
            <FontAwesomeIcon
              alt={'edit workout'}
              id={wo.id}
              style={{ marginLeft: '10px', float: 'right' }}
              icon={faEdit}
              onClick={editWorkout}
            />
          </div>
          <div>{renderSets(wo.sets)}</div>
        </div>
      )
    })
  }

  const renderSets = sets => {
    if (sets && sets.length > 0) {
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
    } else {
      return null
    }
  }

  const renderMainForm = () => {
    return (
      <div>
        <div css={card}>
          <div css={row}>
            <span css={closeButton} onClick={handleClose}>
              &times;
            </span>
          </div>
          <div css={row}>
            <div css={col25}>
              <label htmlFor='name'>Program Name</label>
            </div>
            <div css={col75}>
              <input
                css={formInput}
                type='text'
                id='name'
                name='name'
                value={
                  isUndefined(programContext.program.name)
                    ? 'program name...'
                    : programContext.program.name
                }
                placeholder='program name..'
                onChange={handleTextChange}
              />
            </div>
          </div>
          <div css={row}>
            <div css={col25}>
              <label htmlFor='description'>Description</label>
            </div>
            <div css={col75}>
              <textarea
                css={formInput}
                id='description'
                name='description'
                value={
                  isUndefined(programContext.program)
                    ? 'program description...'
                    : programContext.program.description
                }
                placeholder='program description..'
                onChange={handleTextChange}
                style={{ height: '42px' }}
              ></textarea>
            </div>
          </div>
          <div css={row}>
            <div css={col25}>
              <label htmlFor='workouts'>Workouts</label>
            </div>
            <div css={col75}>
              {programContext.program.workouts &&
              programContext.program.workouts.length > 0 ? (
                <div css={gridContainer}>
                  {renderWorkouts(programContext.program.workouts)}
                </div>
              ) : null}
              <input
                style={{ display: 'block' }}
                type='button'
                value='Add Workout'
                css={formButton}
                onClick={addWorkout}
              />
            </div>
          </div>
          <div css={row}>
            <input
              type='submit'
              value='Save Program'
              css={[basicButton, { float: 'right' }]}
              onClick={saveProgram}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Modal showModal={showWorkoutModal} handleClose={toggleWorkoutModal}>
        <WorkoutForm saveWorkout={saveWorkout} />
      </Modal>
      {renderMainForm()}
    </React.Fragment>
  )
}

export default ProgramForm
