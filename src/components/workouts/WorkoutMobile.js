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
  let { woHeader, woInput, woTable } = woDayStyles(context.theme)
  const classes = useStyles(context)

  const COL_1_TITLE = 'exercise'
  const COL_2_TITLE = 'reps'
  // const COL_2_TITLE = 'targets'

  const renderTableOneHeaderRows = () => {
    let headers = [COL_1_TITLE, COL_2_TITLE]
    return (
      <tr key={'firstHeaderRow'}>
        {headers.map((header, index) => {
          const colWidth = header === COL_2_TITLE ? '10px' : '50px'
          return (
            <th
              key={`${header}-${index}`}
              css={woHeader}
              style={{ maxWidth: colWidth }}
            >
              {header}
            </th>
          )
        })}
      </tr>
    )
  }

  const renderTableOneHeaderRowsMobile = exGroup => {
    let headers = [COL_1_TITLE, COL_2_TITLE]
    let headerCells = []
    let secondRowHeaderCells = []

    exGroup.exercises.forEach(exercise => {
      let exHeaders = headers.map((header, index) => {
        const colWidth = header === COL_2_TITLE ? '10px' : '50px'
        return (
          <th
            key={`${exercise}-${header}-${index}`}
            css={woHeader}
            style={{ maxWidth: colWidth }}
          >
            {header}
          </th>
        )
      })
      headerCells.push(exHeaders)

      secondRowHeaderCells.push(
        <React.Fragment key={`${exercise}-weight`}>
          <th css={woHeader}>{'weight'}</th>
          <th css={woHeader}>{'reps'}</th>
        </React.Fragment>
      )
    })

    return (
      <React.Fragment>
        <tr key={'firstHeaderRow'}>{headerCells}</tr>
        <tr key={'secondHeaderRow'}>{secondRowHeaderCells}</tr>
      </React.Fragment>
    )
  }

  const renderTableOneRows = () => {
    return props.wo.exerciseGroups.map((exGroup, index) => {
      return exGroup.exercises.map(ex => {
        return (
          <tr key={ex.id} id={ex.id} style={{ border: '1px solid yellow' }}>
            <td>
              <input
                name={'name'}
                data-exgroupid={exGroup.id}
                type='text'
                value={ex.name}
                css={[woInput, { width: '75px' }]}
                onChange={props.onLeadCellChange}
                autoComplete={'off'}
              />
            </td>
            <td>
              <input
                name={'reps'}
                data-exgroupid={exGroup.id}
                type='text'
                value={ex.reps}
                css={[woInput, { width: '15px' }]}
                onChange={props.onLeadCellChange}
                autoComplete={'off'}
              />
            </td>
          </tr>
        )
      })
    })
  }

  const renderHeaderRows = () => {
    return (
      <tr key={'secondHeaderRow'}>
        {props.wo.sets.map((set, index) => {
          return (
            <React.Fragment key={`${set}-${index}`}>
              <th key={`${set}-${index}-weight`} css={woHeader}>
                {'weight'}
              </th>
              <th key={`${set}-${index}-reps`} css={woHeader}>
                {'reps'}
              </th>
            </React.Fragment>
          )
        })}
      </tr>
    )
  }


  const renderRows = () => {
    return props.wo.exerciseGroups.map((exGroup, index) => {
      return exGroup.exercises.map(ex => {
        return (
          <tr key={ex.id} id={ex.id} style={{ border: '1px solid yellow' }}>
            {props.wo.sets.map(set => {
              let exercise = set.exerciseGroups[index].exercises.find(
                setEx => Number(setEx.id) === Number(ex.id)
              )
              return (
                <React.Fragment key={`${set.id}`}>
                  <td>
                    <input
                      data-setid={set.id}
                      data-exgroupid={exGroup.id}
                      name={'weight'}
                      type='text'
                      placeholder={'enter weight'}
                      value={exercise.weight}
                      css={woInput}
                      onChange={props.onChange}
                      autoComplete={'off'}
                    />
                  </td>

                  <td>
                    <input
                      data-setid={set.id}
                      data-exgroupid={exGroup.id}
                      name={'reps'}
                      type='text'
                      placeholder={'enter reps'}
                      value={exercise.reps}
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
    })
  }

  const renderRowsMobile = (exGroup, index) => {


    // need to render the sets matching the exGroup
    

      return exGroup.exercises.map(ex => {
        return (
          <tr key={ex.id} id={ex.id} style={{ border: '1px solid yellow' }}>
            {props.wo.sets.map(set => {
              let exercise = set.exerciseGroups[index].exercises.find(
                setEx => Number(setEx.id) === Number(ex.id)
              )
              return (
                <React.Fragment key={`${set.id}`}>
                  <td>
                    <input
                      data-setid={set.id}
                      data-exgroupid={exGroup.id}
                      name={'weight'}
                      type='text'
                      placeholder={'enter weight'}
                      value={exercise.weight}
                      css={woInput}
                      onChange={props.onChange}
                      autoComplete={'off'}
                    />
                  </td>

                  <td>
                    <input
                      data-setid={set.id}
                      data-exgroupid={exGroup.id}
                      name={'reps'}
                      type='text'
                      placeholder={'enter reps'}
                      value={exercise.reps}
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
        <React.Fragment>
          <h4>{'exercise group 1'}</h4>
          <table border='1'>
            <tbody>
            {renderTableOneHeaderRowsMobile(exGroup)}
            {renderRowsMobile(exGroup, index)}
            </tbody>
          </table>
        </React.Fragment>
      )
    })
  }

  return (
    <div className={classes.root}>
      <h1>Mobile</h1>
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
      <br />
      <div style={{ display: 'inline-block' }}>
        <table css={woTable}>
          <tbody>
            {renderTableOneHeaderRows()}
            {renderTableOneRows()}
          </tbody>
        </table>
      </div>
      <div
        style={{
          maxWidth: '600px',
          display: 'inline-block',
          overflow: 'scroll'
        }}
      >
        <table css={woTable}>
          <tbody>
            {renderHeaderRows()}
            {renderRows()}
          </tbody>
        </table>
      </div>

      {renderExerciseGroups()}

      <h4>{'exercise group 1'}</h4>
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
      </table>

      <h4>{'exercise group 2'}</h4>
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
      </table>
    </div>
  )
}

export default WorkoutMobile
