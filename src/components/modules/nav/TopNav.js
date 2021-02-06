import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import DesktopNav from 'components/modules/nav/DesktopNav'
import MobileNav from 'components/modules/nav/MobileNav'

const TopNav = props => {
  const isMobile = useMediaQuery('(max-width:768px)')
  return isMobile ? <MobileNav {...props} /> : <DesktopNav {...props} />
}

export default TopNav
