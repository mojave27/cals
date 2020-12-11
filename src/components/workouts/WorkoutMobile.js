/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import { woDayStyles } from '../../styles/WoDayStyles'
import ThemeContext from '../../context/ThemeContext'
import { makeStyles } from '@material-ui/core/styles'
import { basicButton, basicButtonSmall } from '../../styles/Styles'

const useStyles = makeStyles(context => ({
  root: {
    flexGrow: 1,
    width: `${context.mobile === true ? '100%' : 'auto'}`
  },
  basicButtonSmall: basicButtonSmall(context),
  basicButton: basicButton(context)
}))

const WorkoutMobile = props => {
  let context = useContext(ThemeContext)
  let { woHeader, woInput } = woDayStyles(context.theme)
  const classes = useStyles(context)

  const renderTableOneHeaderRowsMobile = exGroup => {
    let headerCells = []
    let secondRowHeaderCells = []

    exGroup.exercises.forEach(exercise => {
      headerCells.push(
        <th key={`${exercise.id}-header`} css={woHeader} colSpan='2'>
          {exercise.name}
        </th>
      )

      secondRowHeaderCells.push(
        <React.Fragment key={`${exercise.id}-weight`}>
          <th css={woHeader}>{'weight'}</th>
          <th css={woHeader}>{'reps'}</th>
        </React.Fragment>
      )
    })

    return (
      <React.Fragment>
        <tr>{headerCells}</tr>
        <tr>{secondRowHeaderCells}</tr>
      </React.Fragment>
    )
  }

  const renderRowsMobile = (exGroup, index) => {
    return props.wo.sets.map(set => {
      let matchingSetExGroup = set.exerciseGroups.find(
        setExGrp => setExGrp.id === exGroup.id
      )
      return (
        <tr
          key={`${set.id}-${matchingSetExGroup.id}`}
          id={matchingSetExGroup.id}
          style={{ border: '1px solid yellow' }}
        >
          {matchingSetExGroup.exercises.map(ex => {
            return (
              <React.Fragment key={`${set.id}-${ex.id}`}>
                <td>
                  <input
                    data-setid={set.id}
                    data-exgroupid={exGroup.id}
                    data-exerciseid={ex.id}
                    name={'weight'}
                    type='text'
                    placeholder={'enter weight'}
                    value={ex.weight}
                    css={woInput}
                    onChange={props.onChange}
                    autoComplete={'off'}
                  />
                </td>

                <td>
                  <input
                    data-setid={set.id}
                    data-exgroupid={exGroup.id}
                    data-exerciseid={ex.id}
                    name={'reps'}
                    type='text'
                    placeholder={'enter reps'}
                    value={ex.reps}
                    css={woInput}
                    onChange={props.onChange}
                    autoComplete={'off'}
                  />
                </td>
              </React.Fragment>
            )
          })}
        </tr>
      )
    })
  }

  const addSet = () => {
    props.addSet()
  }

  const addExercise = () => {
    props.addExercise()
  }

  const showWorkoutChooser = () => {
    props.showWorkoutChooser()
  }

  const renderExerciseGroups = () => {
    return props.wo.exerciseGroups.map((exGroup, index) => {
      return (
        <React.Fragment key={`${exGroup}-${index}`}>
          <div style={{padding:'10px',margin:'auto'}}>
          <label style={{fontWeight:'700', paddingBottom:'5px'}}>{`exercise group ${index}`}</label>
          <table border='1' style={{margin:'auto'}}>
            <tbody>
              {renderTableOneHeaderRowsMobile(exGroup)}
              {renderRowsMobile(exGroup, index)}
            </tbody>
          </table></div>
        </React.Fragment>
      )
    })
  }

  return (
    <div className={classes.root}>
      <div style={{ margin: 'auto' }}>
        <input
          className={classes.basicButton}
          type='button'
          value='Choose Workout'
          onClick={showWorkoutChooser}
          autoComplete={'off'}
        />
        <input
          style={{ margin: '5px' }}
          type='button'
          value='Add Set'
          className={classes.basicButton}
          onClick={addSet}
          autoComplete={'off'}
        />
        <input
          style={{ margin: '5px' }}
          type='button'
          value='Add Exercise'
          className={classes.basicButton}
          onClick={addExercise}
          autoComplete={'off'}
        />
      </div>

      <div style={{ margin: 'auto' }}>{renderExerciseGroups()}</div>
      {/* <h4>{'exercise group 2'}</h4>
      <table border='1'>
        <tbody>
          <tr>
            <th>ex1 name</th>
            <th>ex1 targets</th>
            <th>ex2 name</th>
            <th>ex2 targets</th>
          </tr>
          <tr>
            <th>ex1 weights</th>
            <th>ex1 reps</th>
            <th>ex2 weights</th>
            <th>ex2 reps</th>
          </tr>
          <tr>
            <td>25</td>
            <td>8</td>
            <td>50</td>
            <td>8</td>
          </tr>
          <tr>
            <td>25</td>
            <td>8</td>
            <td>50</td>
            <td>7</td>
          </tr>
        </tbody>
      </table> */}
    </div>
  )
}

export default WorkoutMobile
