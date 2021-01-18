import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import WorkoutCard from './WorkoutCard'
import {
  Card,
  CardHeader,
  CardContent,
  Popover
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    margin: 'auto'
  },
  cardHeader: {
    padding: '6px 16px 0px 16px'
  },
  cardContent: {
    padding: '8px 16px 0px 16px'
  },
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    padding: theme.spacing(1)
  }
}))

const WorkoutHighlightCard = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const open = Boolean(anchorEl)
  const id = open ? 'popper' : undefined

  const handleClick = () => {
    if (props.onClick) props.onClick(props.id)
  }

  const handleHoverOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleHoverClose = event => {
    setAnchorEl(null)
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
          : ''
      }}
      elevation={1}
      variant='outlined'
      onClick={handleClick}
      key={props.id}
      onMouseEnter={handleHoverOpen}
      onMouseLeave={handleHoverClose}
    >
      <CardHeader
        className={classes.cardHeader}
        title={props.item.name}
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent className={classes.cardContent}>
        <Popover
          className={classes.popover}
          classes={{
            paper: classes.paper
          }}
          anchorEl={anchorEl}
          open={open}
          id={id}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          onClose={handleHoverClose}
          disableRestoreFocus
        >
          <WorkoutCard {...props} />
        </Popover>
      </CardContent>
    </Card>
  )
}

export default WorkoutHighlightCard
