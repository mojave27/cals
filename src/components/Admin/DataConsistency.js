/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext, useEffect, useState } from 'react'
import { retrieveDataConsistencyReport as retrieve } from '../../api/adminApi'
import { isEmpty } from 'lodash'
import ThemeContext from '../../context/ThemeContext'

import { formContainer, row } from '../../styles/main-styles'


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
    <div css={formContainer}>
      <div css={row}>
        data consistency report
      </div>
      <div css={row}>
        <h3>Programs</h3>
        {isEmpty(reportData)
         ? null
        //  : renderProgramReport()
         : renderItemReport('programs')
         }
      </div>
      <div css={row} style={{marginTop: '30px', borderTop: `1px solid ${context.theme.color2.hex}`}}>
        <h3>Sets</h3>
        {isEmpty(reportData)
         ? null
        //  : renderProgramReport()
         : renderItemReport('sets')
         }
      </div>
    </div>
  )

}

export default DataConsistency
