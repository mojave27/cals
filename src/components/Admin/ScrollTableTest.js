import React, { Fragment } from 'react'

const Test = props => {
  // const [reportData, setReportData] = useState({})

  return (
    <div >
      <div >Test Page</div>
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
    </Fragment>
  )
}
