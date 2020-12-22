import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { Card, CardHeader, CardContent} from '@material-ui/core'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  container: {
    marginBottom: '10px'
  },
  table: {
    backgroundColor: theme.color4.hex
  },
  th: {
    backgroundColor: theme.color3.hex,
    color: theme.color3_text.hex,
    textAlign: 'left'
  },
  thLeft: {
    width: '70%',
  },
  td: { 
    textAlign: 'left',
    color: theme.color4_text.hex
  },
  tdLeft: { 
    width: '70%',
  },
  cardHeader:{
    padding: '6px 16px 0px 16px'
  },
  cardContent: {
    padding: '8px 16px 0px 16px'
  }
}))

const WorkoutCard = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)
  // const { editItem, deleteItem, id, item } = props

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
              <TableContainer component={Paper} className={classes.container} key={exGroup.id}>
              <Table className={classes.table} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className={`${classes.thLeft} ${classes.th}`}>{'name'}</TableCell>
                    <TableCell className={classes.th}>{'reps'}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className={`${classes.tdLeft} ${classes.td}`}>{row.name}</TableCell>
                      <TableCell className={classes.td}>{row.reps}</TableCell>
                    </TableRow>
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
    <Card className={classes.root} onClick={handleClick} key={props.id}>
      <CardHeader
      className={classes.cardHeader}
        title={props.item.name}
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <React.Fragment>
            <IconButton aria-label='Edit' onClick={() => editItem(props.item.id)}>
              <EditIcon color='inherit' fontSize='small' />
            </IconButton>
            <IconButton aria-label='Delete' onClick={() => deleteItem(props.item.id)}>
              <DeleteForeverIcon color='inherit' fontSize='small' />
            </IconButton>
          </React.Fragment>
        }
      />
      <CardContent className={classes.cardContent}>
        <div>{renderExerciseGroups(props.item.exerciseGroups)}</div>
      </CardContent>
    </Card>
  )
}

export default WorkoutCard
