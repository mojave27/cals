/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { formContainer, row } from '../../styles/main-styles'
import StopWatch from './StopWatch'

const Test = props => {
  // const [reportData, setReportData] = useState({})

  return (
    <div css={formContainer}>
      <div css={row}>Test Page</div>
      <Table />
    </div>
  )
}

export default Test

const Table = () => {
  const addTab = () => {

  }
  return (
    <Fragment>
      <StopWatch />
      <div style={{ maxWidth: '150px', display: 'inline-block' }}>
        <table style={{ border: '1px solid yellow' }}>
          <tbody>
            <tr>
              <th colSpan='2'></th>
            </tr>
            <tr>
              <th>header</th>
              <th>header</th>
            </tr>
            <tr>
              <td>data</td>
              <td>data</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        style={{
          maxWidth: '300px',
          display: 'inline-block',
          overflow: 'scroll'
        }}
      >
        <table style={{ border: '1px solid lime' }}>
          <tbody>
            <tr>
              <th colSpan='2'>date</th>
              <th colSpan='2'>date</th>
              <th colSpan='2'>date</th>
              <th colSpan='2'>date</th>
              <th colSpan='2'>date</th>
            </tr>
            <tr>
              <th>header</th>
              <th>header</th>
              <th>header</th>
              <th>header</th>
              <th>header</th>
              <th>header</th>
              <th>header</th>
              <th>header</th>
              <th>header</th>
              <th>header</th>
            </tr>
            <tr>
              <td>data</td>
              <td>data</td>
              <td>data</td>
              <td>data</td>
              <td>data</td>
              <td>data</td>
              <td>data</td>
              <td>data</td>
              <td>data</td>
              <td>data</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        style={{
          display: 'inline-block',
          marginLeft: '20px',
          fontSize: '2em',
          fontWeight: '700',
          cursor:'pointer'
        }}
        onClick={addTab}
      >
        +
      </div>
      <div>
        <table style={{border:'1px solid #bbb'}}>
          <tbody>
            <tr>
              <th rowSpan={2} style={{border:'1px solid #bbb'}}>span2a</th>
              <th rowSpan={2} style={{border:'1px solid #bbb'}}>span2b</th>
              <th style={{border:'1px solid #bbb'}}>span1-upper</th>
              <th style={{border:'1px solid #bbb'}}>span1-upper</th>
            </tr>
            <tr>
              <th style={{border:'1px solid #bbb'}}>span1-lower</th>
              <th style={{border:'1px solid #bbb'}}>span1-lower</th>
            </tr>
            <tr>
              <td style={{border:'1px solid #bbb'}}>ex</td>
              <td style={{border:'1px solid #bbb'}}>target</td>
              <td style={{border:'1px solid #bbb'}}>span1-td</td>
              <td style={{border:'1px solid #bbb'}}>span1-td</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}
