import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '../modules/common/components/Modal'
import WoDayList from '../WoDay/WoDayList'
import WoDayContext from '../../context/WoDayContext'
import { retrieveWoDayById } from '../../api/wodaysApi'
import { navigate } from '@reach/router'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import FormButton from '../inputs/FormButton'
import { WODAY_PATH } from '../../constants'


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
    window.scrollTo(0, 0)
    setShowModal(!showModal)
  }

  const chooseWoDay = async (id) => {
    console.log(`woday id: ${id}`)
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
              <FormButton value={'New WoDay'} onClick={newWoDay} />
            </Grid>
            <Grid item xs={6}>
              <FormButton onClick={toggleModal} value={'Existing WoDay'}/>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

export default WoDayTracker
