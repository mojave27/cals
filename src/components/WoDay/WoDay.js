import React, { useContext } from 'react'
import ThemeContext from 'context/ThemeContext'
import WoDayMobile from 'components/WoDay/WoDayMobile'
import WoDayDesktop from 'components/WoDay/WoDayDesktop'

const WoDay = (props) => {
  let context = useContext(ThemeContext) 
  return (
    context.mobile ? <WoDayMobile {...props} /> : <WoDayDesktop {...props} />
  )
}

export default WoDay
