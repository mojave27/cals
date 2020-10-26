import React from 'react'
import { navigate } from '@reach/router';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const AdminMenu = () => {
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
    if ( id === 'data-check') navigate('/admin/consistency-check')
    if ( id === 'test-page') navigate('/admin/test')
    if (id === 'themer') navigate('/admin/themer')
    if (id === 'woday-test') navigate('/admin/test/woday')
  }

  return (
    <div>
      <Button color='inherit' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        admin
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem id={'data-check'} onClick={handleMenuItemClick} >data check</MenuItem>
        <MenuItem id={'test-page'}  onClick={handleMenuItemClick} >test page</MenuItem>
        <MenuItem id={'themer'}     onClick={handleMenuItemClick} >themer</MenuItem>
        <MenuItem id={'woday-test'} onClick={handleMenuItemClick} >woday test</MenuItem>
      </Menu>
    </div>
  );
}

export default AdminMenu