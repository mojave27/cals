import React from 'react'
import { navigate } from '@reach/router';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const ManageMenu = () => {
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
    if ( id === 'workouts') navigate('/progress')
    // if ( id === 'workouts') navigate('/manage/workouts')
    // if ( id === 'exercises') navigate('/exercises')
  }

  return (
    <div>
      <Button color='inherit' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        -progress-
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem id={'workouts'}  onClick={handleMenuItemClick} >workouts</MenuItem>
      </Menu>
    </div>
  );
}

export default ManageMenu