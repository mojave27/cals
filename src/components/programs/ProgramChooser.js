import React, { useContext, useState } from 'react'
import Modal from 'components/modules/common/components/Modal'
import ProgramsList from 'components/tracker/ProgramsList'
import ThemeContext from 'context/ThemeContext'
import { retrieveProgramById } from 'api/programsApi'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Paper } from '@material-ui/core'

import FormButton from 'components/inputs/FormButton'
import ProgramContext from 'context/ProgramContext'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    margin: '3px'
  }
}))

const ProgramChooser = props => {
  let programContext = useContext(ProgramContext)
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)
  let [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const chooseProgram = async (id) => {
    console.log(id)
    const response = await retrieveProgramById(id)
    console.log(response)
    await programContext.updateProgram(response)
    props.onClose()
  }

  const newProgram = async () => {
    await programContext.clearProgram()
    props.onClose()
  }

  return (
      <React.Fragment>
        <Modal showModal={showModal} handleClose={toggleModal}>
          <ProgramsList done={toggleModal} select={chooseProgram} />
        </Modal>
        <Container maxWidth='xs'>
          <Paper className={classes.paper} elevation={0}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormButton value={'New Program'} onClick={newProgram} />
              </Grid>
              <Grid item xs={6}>
                <FormButton onClick={toggleModal} value={'Existing Program'}/>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </React.Fragment>
  )
}

export default ProgramChooser
