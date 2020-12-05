/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext } from 'react'
import { woDayStyles } from '../../styles/WoDayStyles'
import { styles } from '../../styles/MainStyles'
import ThemeContext from '../../context/ThemeContext'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import StopWatch from './StopWatch'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  }
}))

const Test = props => {
  let context = useContext(ThemeContext)
  let { formContainer, row } = styles(context.theme)

  return (
    <div css={formContainer}>
      <div css={row}>Test Page</div>
      <Table />
    </div>
  )
}

export default Test

const Table = () => {
  let context = useContext(ThemeContext)
  let { woHeader, woInput, woTable } = woDayStyles(context.theme)
  const classes = useStyles(context.theme)

  return (
    <div className={classes.root}>
      <StopWatch />
    <Grid container spacing={2}>
      <Grid item>
        {/* <div style={{ display: 'inline-block' }}> */}
        <div>
          <table css={woTable}>
            <tbody>
              <tr>
                <th style={{ maxWidth: '50px' }} css={woHeader}>
                  exercise
                </th>
                <th style={{ maxWidth: '15px' }} css={woHeader}>
                  reps
                </th>
              </tr>
              <tr id='20' style={{ border: '1px solid yellow' }}>
                <td>
                  <input
                    name='name'
                    data-exgroupid='0'
                    type='text'
                    css={[woInput, { width: '75px' }]}
                    value='incline bench press'
                  />
                </td>
                <td>
                  <input
                    name='reps'
                    data-exgroupid='0'
                    type='text'
                    css={[woInput, { width: '75px' }]}
                    value='10'
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Grid>
      <Grid item>
        <div
          style={{
            maxWidth: '400px',
            // display: 'inline-block',
            overflow: 'scroll'
          }}
        >
          <table css={woTable}>
            <tbody>
              <tr>
                <th css={woHeader}>weight</th>
                <th css={woHeader}>reps</th>
                <th css={woHeader}>weight</th>
                <th css={woHeader}>reps</th>
                <th css={woHeader}>weight</th>
                <th css={woHeader}>reps</th>
              </tr>
              <tr id='20' style={{ border: '1px solid yellow' }}>
                <td>
                  <input
                    data-setid='0'
                    data-exgroupid='0'
                    name='weight'
                    type='text'
                    placeholder='enter weight'
                    css={[woInput, { width: '75px' }]}
                    value='47'
                  />
                </td>
                <td>
                  <input
                    data-setid='0'
                    data-exgroupid='0'
                    name='reps'
                    type='text'
                    placeholder='enter reps'
                    css={[woInput, { width: '75px' }]}
                    value='0'
                  />
                </td>
                <td>
                  <input
                    data-setid='0'
                    data-exgroupid='0'
                    name='weight'
                    type='text'
                    placeholder='enter weight'
                    css={[woInput, { width: '75px' }]}
                    value='47'
                  />
                </td>
                <td>
                  <input
                    data-setid='0'
                    data-exgroupid='0'
                    name='weight'
                    type='text'
                    placeholder='enter weight'
                    css={[woInput, { width: '75px' }]}
                    value='47'
                  />
                </td>
                <td>
                  <input
                    data-setid='0'
                    data-exgroupid='0'
                    name='reps'
                    type='text'
                    placeholder='enter reps'
                    css={[woInput, { width: '75px' }]}
                    value='0'
                  />
                </td>
                <td>
                  <input
                    data-setid='0'
                    data-exgroupid='0'
                    name='reps'
                    type='text'
                    placeholder='enter reps'
                    css={[woInput, { width: '75px' }]}
                    value='0'
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Grid>
    </Grid>
    </div>
  )
}
