import React, { useContext } from 'react'
import ThemeContext from '../../../../context/ThemeContext'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    margin: 'auto',
    position: 'absolute',
    top: 30,
    left: 30,
    boxShadow: theme.shadows[5],
    overflow: 'auto'
  },
  content: {
    backgroundColor: theme.palette.background.default,
    margin: 'auto',
    overflow: 'auto'

  },
  close: {
    float: 'right',
    fontSize: '24px',
    fontWeight: 'bold',
    padding: '0px 10px',
    margin: '3px 5px',
    transition: '0.3s',
    '&:hover': {
      textDecoration: 'none',
      cursor: 'pointer'
    },
    '&:focus': {
      textDecoration: 'none',
      cursor: 'pointer'
    }
  }
}))

const MyModal = props => {
  let context = useContext(ThemeContext)
  const classes = useStyles(context.theme)

  return props.showModal ? (
      <Modal
        open={true}
        onClose={props.handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className={classes.paper}
      >
        <div className={classes.content} >
          <span className={classes.close} onClick={props.handleClose}>&times;</span>
          {props.children}
        </div>
      </Modal>
  ) :
  null
}

export default MyModal
