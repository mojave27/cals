import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import ThemeContext from '../../context/ThemeContext'
import Modal from '../Modal'
import WoDayList from '../WoDay/WoDayList'
import { Link, navigate } from '@reach/router'
// import { styles } from '../../styles/MainStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

const WODAY_PATH = '/admin/test/woday'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

const WoDayTracker = props => {
  let [showModal, setShowModal] = useState(false)
  const classes = useStyles()

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const chooseWoDay = id => {
    console.log(id)
    navigate(WODAY_PATH, { state: { id: id } })
  }

  return (
    <React.Fragment>
      <Modal showModal={showModal} handleClose={toggleModal}>
        <WoDayList done={toggleModal} chooseWoDay={chooseWoDay} />
      </Modal>
      <Container maxWidth='sm'>
        <Paper className={classes.paper} elevation={0}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Link to={WODAY_PATH} state={{ new: true }}>
                <input
                  style={{ margin: '5px' }}
                  type='button'
                  value='New WoDay'
                />
              </Link>
            </Grid>
            <Grid item xs={6}>
              <input
                style={{ margin: '5px' }}
                type='button'
                value='Existing WoDay'
                onClick={toggleModal}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

export default WoDayTracker
