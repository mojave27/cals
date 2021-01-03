/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useState } from 'react'
// import SetCard from '../sets/SetCard'
import SetDialog from './SetDialog'
import {
  findIndexOfId,
  retrieveItemById,
  updateItemById,
  generateNewId
} from '../ArrayUtils'
import { addWorkout, updateWorkout } from '../../api/workoutsApi'
import Table from '../tables/SimpleTable'
import { setBlock } from '../../styles/program'
import WoContext from '../../context/WoContext'
import SetContext from '../../context/SetContext'
import { styles } from '../../styles/MainStyles'
import ThemeContext from '../../context/ThemeContext'
import { makeStyles } from '@material-ui/core/styles'
// import { Card, CardContent, CardHeader} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  container: {
    marginBottom: '10px'
  },
  table: {
    backgroundColor: theme.color4.hex
  },
  th: {
    backgroundColor: theme.color3.hex,
    color: theme.color3_text.hex,
    textAlign: 'left'
  },
  thLeft: {
    width: '70%',
  },
  td: { 
    textAlign: 'left',
    color: theme.color4_text.hex
  },
  tdLeft: { 
    width: '70%',
  },
  cardHeader:{
    padding: '6px 16px 0px 16px'
  },
  cardContent: {
    padding: '8px 16px 0px 16px'
  }
}))

const WorkoutForm = props => {
  const [showExerciseGroupDialog, setShowExerciseGroupDialog] = useState(false)
  let woContext = useContext(WoContext)
  let setContext = useContext(SetContext)
  let themeContext = useContext(ThemeContext)
  const { container, detailCard, stripe } = styles(themeContext.theme)
  /* eslint-disable-next-line */
  const classes = useStyles(themeContext.theme)

  const toggleSetDialog = () => {
    setShowExerciseGroupDialog(!showExerciseGroupDialog)
  }

  const editSet = id => {
    console.log(id)
    let index = findIndexOfId(id, woContext.workout.exerciseGroups)
    setContext.updateSet(woContext.workout.exerciseGroups[index])
    toggleSetDialog()
  }

  const showSetCard = () => {
    setContext.clearSet()
    toggleSetDialog()
  }

  const saveWorkout = async () => {
    let response = {}
    if (woContext.workout.id) {
      response = await updateWorkout(woContext.workout)
    } else {
      response = await addWorkout(woContext.workout)
    }
    // update context because addWorkout will have added an id
    await woContext.updateWorkout(response)

    if (props.saveWorkout) {
      props.saveWorkout(response)
    }
  }

  const handleTextChange = event => {
    let { id, value } = event.target
    let updatedWorkout = { ...woContext.workout }
    updatedWorkout[id] = value
    woContext.updateWorkout(updatedWorkout)
  }

  // add/update exercise group in workout context
  const addExerciseGroupToWorkout = exGroup => {
    if (typeof exGroup.id === 'undefined') {
      addSetToWorkout(exGroup)
    } else {
      updateSetInWorkout(exGroup)
    }
  }

  const addSetToWorkout = exGroup => {
    exGroup = setExGroupId(exGroup)
    let updatedWorkout = { ...woContext.workout }
    updatedWorkout.exerciseGroups.push(exGroup)
    woContext.updateWorkout(updatedWorkout)
    setShowExerciseGroupDialog(false)
  }

  const updateSetInWorkout = exGroup => {
    let updatedWorkout = { ...woContext.workout }
    let index = findIndexOfId(exGroup.id, updatedWorkout.exerciseGroups)
    updatedWorkout.exerciseGroups[index] = exGroup
    woContext.updateWorkout(updatedWorkout)
    setShowExerciseGroupDialog(false)
  }

  const setExGroupId = exGroup => {
    if (typeof exGroup.id === 'undefined') {
      console.log(`exGroup id is undefined`)
      let newId = generateNewId(woContext.workout.exerciseGroups)
      exGroup.id = newId
    }
    return exGroup
  }

  const handleRowClick = event => {
    let id = event.currentTarget.id
    console.log(id)
  }

  // lots of changes going on here...
  const handleSetChange = update => {
    // get set with matching id
    let set = { ...retrieveItemById(update.setId, woContext.workout.sets) }

    // find exercise with matching id
    let targetExercise = { ...retrieveItemById(update.id, set.exercises) }

    // update the appropriate value (based on name field - which will be either 'name' or 'reps')
    //   set that value to update.value
    targetExercise[update.name] = update.value

    // update set
    let updatedExerciseList = updateItemById(
      targetExercise,
      update.id,
      set.exercises
    )
    set.exercises = updatedExerciseList

    let updatedSetList = updateItemById(
      set,
      update.setId,
      woContext.workout.sets
    )

    //update context
    woContext.updateExerciseGroupsForWorkout(updatedSetList)
  }

  const deleteExercise = id => {
    console.log(id)
  }

  const deleteSet = id => {
    let exGroups = woContext.workout.exerciseGroups
    // throw up confirmation modal
    // find set in woContext.workout.sets
    let index = findIndexOfId(id, exGroups)
    if (index > -1) {
      // delete the set
      exGroups.splice(index, 1)
      woContext.updateExerciseGroupsForWorkout(exGroups)
      updateWorkout(woContext.workout)
    } else {
      console.log(
        `set with id ${id} not found in woContext.workout.exerciseGroups`
      )
    }
  }

  const renderSets = exGroups => {
    if (exGroups && exGroups.length > 0) {
      return exGroups.map(exGroup => {
        // console.log(`set: ${JSON.stringify(set)}`)
        let data = {
          setId: exGroup.id,
          headers: ['name', 'reps'],
          rows: [...exGroup.exercises]
        }
        return (
          <div key={exGroup.id} css={setBlock}>
            <Table
              disabled={false}
              data={data}
              handleSetChange={handleSetChange}
              onClick={handleRowClick}
              deleteRow={deleteExercise}
              deleteItem={deleteSet}
              editItem={editSet}
            />
          </div>
        )
      })
    } else {
      return null
    }
  }

  return (
    <React.Fragment>
    {/* <Card className={classes.root} onClick={handleClick} key={props.id}>
      <CardHeader
      className={classes.cardHeader}
        title={props.item.name}
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <React.Fragment>
            <IconButton aria-label='Edit' onClick={() => editItem(props.item.id)}>
              <EditIcon color='inherit' fontSize='small' />
            </IconButton>
            <IconButton aria-label='Delete' onClick={() => deleteItem(props.item.id)}>
              <DeleteForeverIcon color='inherit' fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
      <CardContent className={classes.cardContent}>
        <div>{renderExerciseGroups(props.item.exerciseGroups)}</div>
      </CardContent>
    </Card> */}

      {/* <div css={detailCard} style={{maxWidth: '60%'}}> */}
      <div css={detailCard}>
        <WorkoutHeader workout={woContext.workout} onChange={handleTextChange} />

        <div css={stripe} style={{ marginTop: '10px', marginBottom: '5px' }} />

        <div css={container}>
          <div style={{ display: 'block', paddingBottom: '10px' }}>
            <div style={{ paddingBottom: '10px' }}>Sets</div>

            {renderSets(woContext.workout.exerciseGroups)}

            <div style={{ marginTop: '25px', marginBottom: '25px' }} />
            <Button value='Add Set' onClick={showSetCard} />
            <Button value='Save Workout' onClick={saveWorkout} />

              <SetDialog
                open={showExerciseGroupDialog}
                onSave={addExerciseGroupToWorkout}
                onClose={toggleSetDialog}
              />

          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default WorkoutForm

const Button = props => {
  let themeContext = useContext(ThemeContext)
  const { formButton } = styles(themeContext.theme)
  return (
    <input
      type='button'
      value={props.value}
      css={formButton}
      onClick={props.onClick}
      style={{ display: 'block' }}
    />
  )
}

const WorkoutHeader = props => {
  let themeContext = useContext(ThemeContext)
  const { container, formInput, row, col25, col75 } = styles(themeContext.theme)
  return (
        <div css={container}>
          <div css={row}>
            <div css={col25}>
              <label htmlFor='workoutName'>Workout Name</label>
            </div>
            <div css={col75}>
              <input
                css={formInput}
                type='text'
                id='name'
                name='name'
                value={props.workout.name ? props.workout.name : ''}
                placeholder='workout name..'
                onChange={props.onChange}
              />
            </div>
          </div>
          <div css={row}>
            <div css={col25}>
              <label htmlFor='workoutDescription'>Workout Description</label>
            </div>
            <div css={col75}>
              <input
                css={formInput}
                type='text'
                id='description'
                name='description'
                value={
                  props.workout.description
                    ? props.workout.description
                    : ' '
                }
                placeholder='workout description..'
                onChange={props.onChange}
              />
            </div>
          </div>
        </div>
  )
}