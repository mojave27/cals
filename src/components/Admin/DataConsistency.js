import React, { useContext, useEffect, useState } from 'react'
import { retrieveDataConsistencyReport as retrieve } from 'api/adminApi'
import { isEmpty } from 'lodash'
import ThemeContext from 'context/ThemeContext'
import { Container } from '@material-ui/core'

const DataConsistency = props => {
  const [reportData, setReportData] = useState({})
  let context = useContext(ThemeContext)

  useEffect(() => {

    async function fetchData() {
      const response = await retrieve()
      setReportData(response)
    }

    fetchData()
    return () => { }
  }, [])

  const itemValues = {
    'programs': { itemHeader: 'Program', badItemHeader: 'Workout'},
    'sets': { itemHeader: 'Set', badItemHeader: 'Exercise'},
  }

  const renderItemReport = itemType => {
    return reportData[itemType].length > 0
    ? reportData[itemType].map( item => {
        return (
          <div>
            <h4>{itemValues[itemType].itemHeader} ID: {item.id}</h4>
            <h5>{itemValues[itemType].badItemHeader} Inconsistencies</h5>
            {item.badItems.map(badItem => <div>{badItem}</div>)}
          </div>
        )
      })
      : <div>{itemType} are consistent</div>
  }


  return (
    <Container>
      <div>
        data consistency report
      </div>
      <div>
        <h3>Programs</h3>
        {isEmpty(reportData)
         ? null
         : renderItemReport('programs')
         }
      </div>
      <div style={{marginTop: '30px', borderTop: `1px solid ${context.theme.color2.hex}`}}>
        <h3>Sets</h3>
        {isEmpty(reportData)
         ? null
         : renderItemReport('sets')
         }
      </div>
    </Container>
  )

}

export default DataConsistency
