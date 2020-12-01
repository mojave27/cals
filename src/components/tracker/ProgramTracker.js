/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { styles } from '../../styles/MainStyles'
import { styles as programStyles } from '../../styles/ProgramStyles'
import { generateNewId } from '../ArrayUtils'
import TrackerContext from '../../context/TrackerContext'
import ThemeContext from '../../context/ThemeContext'
import { get, isEmpty } from 'lodash'
import WorkoutCard from '../workouts/WorkoutCard'

const ProgramTracker = props => {
  let themeContext = useContext(ThemeContext)
  let context = useContext(TrackerContext)
  let { cardTitle, cardInfo, closeButton } = styles(themeContext.theme)
  const { tab } = programStyles(themeContext.theme)

  const renderTabs = () => {
    let tabs = context.program.workouts.map( (wo,index) => {
      let activeWorkoutId = get(context.program, 'activeWorkout.id', -1)
      let active = activeWorkoutId === wo.id
      let className = active ? 'active' : 'inactive'
      return (
        <button
          key={wo.id}
          id={wo.id}
          className={className}
          name={wo.name === "" ? `workout-${index}` : wo.name}
          onClick={openWorkout}
        >
          {wo.name === "" ? `workout-${index}` : wo.name}
        </button>
      )
    })
    tabs.push(
      <button key={'addTab'} name={'addTab'} onClick={addTab}>
        <FontAwesomeIcon alt={'add date'} icon={faPlus} onClick={addTab} />
      </button>
    )
    return tabs
  }

  const renderWorkout = () => {
    if (!isEmpty(context.activeWorkout)) {
      return (
        <WorkoutCard
          key={context.activeWorkout.id}
          id={context.activeWorkout.id}
          item={context.activeWorkout}
          deleteItem={props.deleteWorkout}
          editItem={props.editWorkout}
        />
      )
    }
  }

  const addTab = async () => {
    console.log('add tab')
    let id = generateNewId(context.program.workouts)
    let newWorkout = {
      id: id,
      name: '',
      description: '',
      sets: [],
      days: []
    }
    await context.updateNewWorkout(newWorkout)
  }

  const openWorkout = event => {
    let id = event.target.id
    context.setActiveWorkout(id)
  }

  const handleClose = () => {
    props.close()
  }

  return (
    <React.Fragment>
      <div id={context.program.id}>
        <span css={closeButton} onClick={handleClose}>
          &times;
        </span>
        <div css={cardTitle}>{context.program.name}</div>
        <div css={cardInfo}>{context.program.description}</div>

        <div css={tab}>{renderTabs()}</div>
        <div style={{ padding: '25px' }}>{renderWorkout()}</div>
      </div>
    </React.Fragment>
  )
}

export default ProgramTracker
