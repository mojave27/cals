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
    if (id === 'program') navigate(`/program-tracker`)
    if (id === 'woday') navigate(`/tracker/woday`)
  }

  return (
    <div>
      <Button color='inherit' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        trackers
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem id={'program'} onClick={handleMenuItemClick} >programs</MenuItem>
        <MenuItem id={'woday'}   onClick={handleMenuItemClick} >WoDay</MenuItem>
      </Menu>
    </div>
  )
}

export default TrackerMenu