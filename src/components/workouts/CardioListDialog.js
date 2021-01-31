import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button, Dialog, IconButton, Slide, Toolbar, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import CardioList from '../workouts/CardioList'
// import { retrieve as retrieveWorkouts } from '../../api/workoutsApi'
import ThemeContext from '../../context/ThemeContext'
import { retrieveItemByStringId } from '../modules/common/utilties/ArrayUtils'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const CardioListDialog = props => {
  const theme = useContext(ThemeContext)
  const classes = useStyles(theme)

  const [cardioRoutines, setCardioRoutines] = useState([])
  const [selected, setSelected] = useState([])

  useEffect(() => {
    async function fetchData() {
      if (!props.cardioRoutines) {
        // const allCardioRoutines = await retrieveCardioRoutines()
        // setCardioRoutines(allCardioRoutines)
      } else {
        setCardioRoutines(props.cardioRoutines)
      }
    }

    fetchData()
    return () => {}
  }, [props.cardioRoutines])

  const handleClose = () => {
    if (props.onClose) props.onClose()
  }

  const handleSave = () => {
    if (props.onSave) props.onSave(selected)
  }

  const selectCardio = async cardioId => {
    let cardio = retrieveItemByStringId(cardioId, cardioRoutines)
    setSelected(prevState => {
      return [...prevState, cardio]
    })
    // props.onSelect(cardio)
  }

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='end'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Choose Cardio Routine(s)
          </Typography>
          <Button autoFocus color='inherit' onClick={handleSave}>
            save
          </Button>
          <Button autoFocus color='inherit' onClick={handleClose}>
            done
          </Button>
        </Toolbar>
      </AppBar>
      <CardioList selected={selected} cardioRoutines={cardioRoutines} onClick={selectCardio} />
    </Dialog>
  )
}

export default CardioListDialog
