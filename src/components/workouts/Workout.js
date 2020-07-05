/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext } from 'react'
import { woDayStyles } from '../../styles/WoDayStyles'
import { styles } from '../../styles/MainStyles'
import ThemeContext from '../../context/ThemeContext'

const Workout = props => {
  let context = useContext(ThemeContext)
  let { woHeader, woInput, woTable } = woDayStyles(context.theme)
  let { basicButtonSmall } = styles(context.theme)

  const COL_1_TITLE = 'exercise'
  const COL_2_TITLE = 'reps'
  // const COL_2_TITLE = 'targets'

  const renderHeaderRows = () => {
    let headers = [COL_1_TITLE, COL_2_TITLE]
    props.wo.sets.forEach(set => {
      headers.push('set')
    })
    let firstHeaderRow = (
      <tr key={'firstHeaderRow'}>
        {headers.map((header, index) => {
          if (header === COL_1_TITLE || header === COL_2_TITLE) {
            return (
              <th rowSpan={2} key={`${header}-${index}`} css={woHeader}>
                {header}
              </th>
            )
          } else {
            return (
              <th colSpan={2} key={`${header}-${index}`} css={woHeader}>
                {header}
              </th>
            )
          }
        })}
      </tr>
    )
    let secondHeaderRow = (
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
    return [firstHeaderRow, secondHeaderRow]
  }

  const renderRows = () => {
    // console.log(JSON.stringify(props.wo))
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
              />
            </td>
            <td>
              <input
                name={'reps'}
                data-exgroupid={exGroup.id}
                type='text'
                value={ex.reps}
                css={[woInput, { width: '75px' }]}
                onChange={props.onLeadCellChange}
              />
            </td>
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

  const addSet = () => {
    props.addSet()
  }

  const addExercise = () => {
    props.addExercise()
  }

  const showWorkoutChooser = () => {
    props.showWorkoutChooser()
  }

  return (
    <React.Fragment>
      <div style={{ display: 'inline-block', margin: 'auto' }}>
        <input
          style={{ margin: '5px' }}
          type='button'
          value='Choose Workout'
          css={[basicButtonSmall, { float: 'left' }]}
          onClick={showWorkoutChooser}
        />
        <input
          style={{ margin: '5px' }}
          type='button'
          value='Add Set'
          css={[basicButtonSmall, { float: 'left' }]}
          onClick={addSet}
        />
        <input
          style={{ margin: '5px' }}
          type='button'
          value='Add Exercise'
          css={[basicButtonSmall, { float: 'left' }]}
          onClick={addExercise}
        />
      </div>
      <table css={woTable}>
        <tbody>
          {renderHeaderRows()}
          {renderRows()}
        </tbody>
      </table>
    </React.Fragment>
  )
}

export default Workout
