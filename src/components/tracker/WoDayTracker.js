import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '../Modal'
import WoDayList from '../WoDay/WoDayList'
import WoDayContext from '../../context/WoDayContext'
import { retrieveWoDayById } from '../../api/wodaysApi'
import { navigate } from '@reach/router'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import FormButton from '../inputs/FormButton'

const WODAY_PATH = '/woday'

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

  let woDayContext = useContext(WoDayContext)
  const classes = useStyles()

  const toggleModal = () => {
    setShowModal(!showModal)
    window.scrollTo(0, 0)
  }

  const chooseWoDay = async (id) => {
    console.log(id)
    const response = await retrieveWoDayById(id)
    console.log(response)
    await woDayContext.updateWoDay(response)
    navigate(WODAY_PATH)
  }

  const newWoDay = async () => {
    await woDayContext.setEmptyWoDay()
    navigate(WODAY_PATH)
  }

  return (
    <React.Fragment>
      <Modal showModal={showModal} handleClose={toggleModal}>
        <WoDayList done={toggleModal} chooseWoDay={chooseWoDay} />
      </Modal>
      <Container maxWidth='xs'>
        <Paper className={classes.paper} elevation={0}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              {/* <Button variant='outlined' onClick={newWoDay}>{'New WoDay'}</Button> */}
              <FormButton buttonText={'New WoDay'} onClick={newWoDay} />
            </Grid>
            <Grid item xs={6}>
              <FormButton onClick={toggleModal} buttonText={'Existing WoDay'}/>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

export default WoDayTracker
