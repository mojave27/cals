import React from 'react'
import PropTypes from 'prop-types'
import MealTable from 'modules/cals-and-macros/table/MealTable/MealTable'
import { Card, CardHeader, CardContent, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: props => ({
        maxWidth: props.maxWidth,
        border: props.selected
          ? `1px solid ${theme.highlightGreen.hex}`
          : '',
        backgroundColor: props.selected
          ? theme.palette.primary.main
          : '',
        width: props.width,
    flexGrow: 1,
    textAlign: 'center',
    margin: 'auto'
    // width: '200px'
  }),
  container: {
    marginBottom: '10px'
  },
  th: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.primary.dark
        : theme.palette.primary.main,
    textAlign: 'left'
  },
  thLeft: {
    width: '70%'
  },
  td: {
    textAlign: 'left'
  },
  tdLeft: {
    width: '70%'
  },
  cardHeader: {
    padding: '6px 16px 0px 16px'
  },
  cardContent: {
    padding: '8px 16px 0px 16px'
  }
}))

const MealMiniCard = props => {
  const classes = useStyles(props)

  const handleClick = () => {
    if (props.onClick) props.onClick(props.id)
  }

  const editItem = id => {
    if (props.editItem) props.editItem(id)
  }

  const deleteItem = id => {
    if (props.deleteItem) props.deleteItem(id)
  }

  return (
    <Card
      className={classes.root}
      elevation={1}
      variant='outlined'
      onClick={handleClick}
      key={props.id}
    >
      <CardHeader
        className={classes.cardHeader}
        title={props.item.name}
        titleTypographyProps={{ variant: 'h6' }}
        action={
          props.disabled === false ? (
            <React.Fragment>
              <IconButton
                aria-label='Edit'
                onClick={() => editItem(props.item.id)}
              >
                <EditIcon color='inherit' fontSize='small' />
              </IconButton>
              <IconButton
                aria-label='Delete'
                onClick={() => deleteItem(props.item.id)}
              >
                <DeleteForeverIcon color='inherit' fontSize='small' />
              </IconButton>
            </React.Fragment>
          ) : null
        }
      />
      <CardContent className={classes.cardContent}>
        <MealTable
          foodList={props.item.foodList}
          rowClick={props.rowClick}
          rowDelete={props.rowDelete}
          rowSelect={props.rowSelect}
          onQuantityChange={props.onQuantityChange}
          tweakUp={props.tweakUp}
          tweakDown={props.tweakDown}
          viewOnly={props.viewOnly}
        />
      </CardContent>
    </Card>
  )
}

MealMiniCard.propTypes = {
  item: PropTypes.object.isRequired,
  viewOnly: PropTypes.bool
}

MealMiniCard.defaultProps = {
  viewOnly: true,
  item: {}
}

export default MealMiniCard
