import React, { useContext, useState, useEffect } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { retrieve } from '../../api/wodaysApi'
// import Modal from '../Modal'
// import { dynamicSort } from '../ArrayUtils'

import ThemeContext from '../../context/ThemeContext'
import { styles } from '../../styles/MainStyles'

const WoDayList = props => {
  const [woDays, setWoDays] = useState([])

  const themeContext = useContext(ThemeContext)
  let { basics } = styles(themeContext.theme)

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await retrieve()
      console.log(response)
      setWoDays(response)
    }

    fetchMyAPI()
  }, [])

  const doStuff = id => {
    console.log(`doing stuff with ${id}`)
    props.chooseWoDay(id)
  }

  const renderWoDays = woDays => {
    let sortedWoDays = [...woDays]
    return (
      woDays.map( woDay => {
        let date = `${Number(woDay.date.month)+1}-${woDay.date.day}-${woDay.date.year}`
        let woName = woDay.wo.name ? woDay.wo.name : ''
        return (
          <div 
            css={basics}
            key={`${date}-${woDay.id}`}
            onClick={() => doStuff(woDay.id)}
          >
            {date} / {woName}
          </div>
        )
      })
    )
  }

  return (
    <React.Fragment>
      <div style={{ maxWidth: '500px', margin: '0px auto' }}>
        {renderWoDays(woDays)} 
      </div>
    </React.Fragment>
  )
}

export default WoDayList
