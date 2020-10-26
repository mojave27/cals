import React from 'react'
import { navigate } from '@reach/router';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const TrackerMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = event => {
    let id = event.target.id
    handleClose()
    if (id === '1rm') navigate(`/1rm`)
  }

  return (
    <div>
      <Button color='inherit' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        calcs
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem id={'1rm'} onClick={handleMenuItemClick} >1 rep max</MenuItem>
        {/* <MenuItem id={'woday'}   onClick={handleMenuItemClick} >WoDay</MenuItem> */}
      </Menu>
    </div>
  )
}

export default TrackerMenu