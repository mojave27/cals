import React, { useContext, useState } from 'react'
import ThemeContext from '../../context/ThemeContext'
// import WorkoutCard from './WorkoutCard'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { Card, CardHeader, CardContent, Popover } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    margin: 'auto',
  },
  cardHeader: {
    padding: '6px 16px 0px 16px',
  },
  cardContent: {
    padding: '8px 16px 0px 16px',
  },
  popover: {
    pointerEvents: 'none',

    position: 'fixed',
    top: '-100px',
    right: '5px',
    zIndex: '10',
    overflow:'none'
  },
  paper: {
    padding: theme.spacing(1),
  },
}))

const WorkoutHighlightCard = (props) => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorEl2, setAnchorEl2] = useState(null)

  const openCard = Boolean(anchorEl)
  const id = openCard ? 'popper' : undefined
  const openButtons = Boolean(anchorEl2)

  const handleClick = event => {
    handleHoverOpen(event)
    if (props.onClick) props.onClick(props.id)
  }

  const handleHoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleHoverClose = (event) => {
    setAnchorEl(null)
  }

  const handleMoreClick = (event) => {
    setAnchorEl(null)
    setAnchorEl2(event.currentTarget)
  }

  const handleMoreClose = () => {
    setAnchorEl2(null)
  }

  const viewItem = (id) => {
    handleMoreClose()
    if (props.viewItem) props.viewItem(id)
  }

  const editItem = (id) => {
    handleMoreClose()
    if (props.editItem) props.editItem(id)
  }

  const deleteItem = (id) => {
    handleMoreClose()
    if (props.deleteItem) props.deleteItem(id)
  }

  const copyItem = (id) => {
    handleMoreClose()
    if (props.copyItem) props.copyItem(id)
  }

  return (
    <Card
      className={classes.root}
      style={{
        maxWidth: props.maxWidth,
        border: props.selected
          ? `1px solid ${themeContext.theme.highlightGreen.hex}`
          : '',
        backgroundColor: props.selected
          ? themeContext.theme.color3.rgba(0.25)
          : '',
      }}
      elevation={1}
      variant='outlined'
      onClick={handleClick}
      key={props.id}
      // onMouseEnter={handleHoverOpen}
      onMouseLeave={handleHoverClose}
    >
      <CardHeader
        className={classes.cardHeader}
        title={props.item.name}
        titleTypographyProps={{ variant: 'h6' }}
        action={
          props.disabled === false ? (
            <React.Fragment>
              <IconButton aria-label='More' onClick={handleMoreClick}>
                <MoreVertIcon color={'inherit'} />
              </IconButton>
            </React.Fragment>
          ) : null
        }
      />
      <CardContent className={classes.cardContent}>
        <Popover
          classes={{
            paper: classes.paper,
          }}
          anchorEl={anchorEl2}
          open={openButtons}
          id={id}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handleMoreClose}
          disableRestoreFocus
        >
          <React.Fragment>
            <div>
              <IconButton
                aria-label='View'
                onClick={() => viewItem(props.item.id)}
              >
                <VisibilityIcon color='inherit' fontSize='small' />
              </IconButton>
            </div>
            <div>
              <IconButton
                aria-label='Copy'
                onClick={() => copyItem(props.item.id)}
              >
                <FileCopyIcon color='inherit' fontSize='small' />
              </IconButton>
            </div>
            <div>
              <IconButton
                aria-label='Edit'
                onClick={() => editItem(props.item.id)}
              >
                <EditIcon color='inherit' fontSize='small' />
              </IconButton>
            </div>
            <div>
              <IconButton
                aria-label='Delete'
                onClick={() => deleteItem(props.item.id)}
              >
                <DeleteForeverIcon color='inherit' fontSize='small' />
              </IconButton>
            </div>
          </React.Fragment>
        </Popover>
      </CardContent>
    </Card>
  )
}

export default WorkoutHighlightCard
