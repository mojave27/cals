/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 1200,
    top: 30,
    left: 30,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: 'auto'
  },
  content: {
    border: `2px solid ${theme.color1.hex}`,
    overflow: 'auto'

  },
  close: {
    color: theme.color3.hex,
    float: 'right',
    fontSize: '24px',
    fontWeight: 'bold',
    padding: '0px 10px',
    margin: '3px 5px',
    transition: '0.3s',
    '&:hover': {
      color: theme.color1.hex,
      textDecoration: 'none',
      cursor: 'pointer'
    },
    '&:focus': {
      color: theme.color5.hex,
      textDecoration: 'none',
      cursor: 'pointer'
    }
  }
}))

const MyModal = props => {
  let context = useContext(ThemeContext)
  const classes = useStyles(context.theme)
  return props.showModal ? (
    // <div className={classes.paper}>
      <Modal
        open={true}
        onClose={props.handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className={classes.paper}
      >
        <div className={classes.content}>
          <span className={classes.close} onClick={props.handleClose}>&times;</span>
          {props.children}
        </div>
      </Modal>
    // </div>
  ) :
  null
}

export default MyModal
