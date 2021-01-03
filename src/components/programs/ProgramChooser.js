import React, { useContext, useState } from 'react'
import Modal from '../Modal'
import ProgramsList from '../tracker/ProgramsList'
import ThemeContext from '../../context/ThemeContext'
import { retrieveProgramById } from '../../api/programsApi'
import { makeStyles } from '@material-ui/core/styles'
import { basicButton } from '../../styles/Styles'
import { Container, Grid, Paper } from '@material-ui/core'

import FormButton from '../inputs/FormButton'
import ProgramContext from '../../context/ProgramContext'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.color2_text.hex,
    backgroundColor: theme.color2.hex,
    margin: '3px'
  },
  basicButton: basicButton(theme)
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
                <FormButton buttonText={'New Program'} onClick={newProgram} />
              </Grid>
              <Grid item xs={6}>
                <FormButton onClick={toggleModal} buttonText={'Existing Program'}/>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </React.Fragment>
  )
}

export default ProgramChooser
