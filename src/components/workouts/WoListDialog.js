import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import WoList from '../workouts/WoList'
import ThemeContext from '../../context/ThemeContext'
import { findIndexOfId, retrieveItemById } from '../ArrayUtils'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const WoListDialog = props => {
  const theme = useContext(ThemeContext)
  const classes = useStyles(theme)

  const [items, setItems] = useState([])
  const [selected, setSelected] = useState([])

  useEffect(() => {
    async function fetchData() {
      if (!props.items) {
        console.log('no props...')
        const allItems = await props.retrieve()
        setItems(allItems)
      } else {
        console.log('props!!')
        setItems(props.items)
      }
    }
    fetchData()
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.items])

  const handleClose = () => {
    if (props.onClose) props.onClose()
  }

  const handleSave = () => {
    if (props.onSave) props.onSave(selected)
  }

  const selectItem = async itemId => {
    if (isAlreadySelected(itemId)) {
      let updatedSelected = selected.filter(item => item.id !== itemId)
      setSelected(updatedSelected)
    } else {
      let item = retrieveItemById(itemId, items)
      setSelected(prevState => {
        return [...prevState, item]
      })
    }
  }

  const isAlreadySelected = itemId => {
    let found = findIndexOfId(itemId, selected)
    return found > -1
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
            {props.title}
          </Typography>
          <Button autoFocus color='inherit' onClick={handleSave}>
            save
          </Button>
          <Button autoFocus color='inherit' onClick={handleClose}>
            done
          </Button>
        </Toolbar>
      </AppBar>
      <WoList selected={selected} items={items} onClick={selectItem} />
    </Dialog>
  )
}

WoListDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.array,
  retrieve: PropTypes.func,
  title: PropTypes.string
}

WoListDialog.defaultProps = {
  title: ''
}

export default WoListDialog
