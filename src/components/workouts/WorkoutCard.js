import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    margin: 'auto',
    // width: '200px'
  },
  container: {
    marginBottom: '10px'
  },
  th: {
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
    // color: theme.palette.primary.contrastText,
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

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const WorkoutCard = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles()

  const handleClick = () => {
    if (props.onClick) props.onClick(props.id)
  }

  const renderExerciseGroups = exerciseGroups => {
    if (exerciseGroups !== undefined && exerciseGroups.length > 0) {
      return exerciseGroups.map((exGroup, index) => {
        let data = {
          headers: ['name', 'reps'],
          rows: [...exGroup.exercises]
        }
        return (
          <TableContainer
            component={Paper}
            className={classes.container}
            key={exGroup.id}
          >
            <Table size='small'>
              <TableHead>
                <StyledTableRow>
                  <TableCell className={`${classes.thLeft} ${classes.th}`}>
                    {'name'}
                  </TableCell>
                  <TableCell className={classes.th}>{'reps'}</TableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {data.rows.map(row => (
                  <StyledTableRow key={row.name}>
                    <TableCell className={`${classes.tdLeft} ${classes.td}`}>
                      {row.name}
                    </TableCell>
                    <TableCell className={classes.td}>{row.reps}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      })
    } else {
      return null
    }
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
      style={{
        maxWidth:props.maxWidth, 
        border: props.selected ? `1px solid ${themeContext.theme.highlightGreen.hex}` : '',
        backgroundColor: props.selected ? themeContext.theme.color3.rgba(.25) : '',
        width:props.width
      }}
      elevation={1}
      variant="outlined"
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
        <div>{renderExerciseGroups(props.item.exerciseGroups)}</div>
      </CardContent>
    </Card>
  )
}

export default WorkoutCard
