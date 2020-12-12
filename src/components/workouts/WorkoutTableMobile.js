import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: `${theme.mobile === true ? '100%' : 'auto'}`
  },
  table: {
    minWidth: '80%',
    backgroundColor: theme.color3.rgba(0.5),
    color: theme.color3_text.hex
  },
  tableCell: {
    padding: '5px'
  },
  accordion: {
    backgroundColor: theme.color3.hex,
    color: theme.color3_text.hex
  }
}))

const WorkoutTableMobile = props => {
  let context = useContext(ThemeContext)
  const classes = useStyles(context)

  const renderTableOneHeaderRowsMobile = exGroup => {
    let headerCells = []
    let secondRowHeaderCells = []

    exGroup.exercises.forEach(exercise => {
      headerCells.push(
        <TableCell key={`${exercise.id}-header`} colSpan={2} classes={{ root: classes.tableCell }} align={'center'}>
          {exercise.name}
        </TableCell>
      )

      secondRowHeaderCells.push(
        <React.Fragment key={`${exercise.id}-weight`}>
          <TableCell classes={{ root: classes.tableCell }} align={'center'} >{'weight'}</TableCell>
          <TableCell classes={{ root: classes.tableCell }} align={'center'} >{'reps'}</TableCell>
        </React.Fragment>
      )
    })

    return (
      <TableHead>
        <TableRow>{headerCells}</TableRow>
        <TableRow>{secondRowHeaderCells}</TableRow>
      </TableHead>
    )
  }

  const renderRowsMobile = (exGroup, index) => {
    return props.wo.sets.map(set => {
      let matchingSetExGroup = set.exerciseGroups.find(
        setExGrp => setExGrp.id === exGroup.id
      )
      return (
        <TableRow key={`${set.id}-${exGroup.id}`} id={exGroup.id}>
          {matchingSetExGroup.exercises.map(ex => {
            return (
              <React.Fragment key={`${set.id}-${ex.id}`}>
                <TableCell classes={{ root: classes.tableCell }}>
                  <TextField
                    inputProps={{
                      'data-setid': set.id,
                      'data-exgroupid': exGroup.id,
                      'data-exerciseid': ex.id,
                      name: 'weight'
                    }}
                    type='text'
                    placeholder={'enter weight'}
                    value={ex.weight}
                    onChange={props.onChange}
                    autoComplete={'off'}
                    variant='outlined'
                    size='small'
                  />
                </TableCell>

                <TableCell classes={{ root: classes.tableCell }}>
                  <TextField
                    inputProps={{
                      'data-setid': set.id,
                      'data-exgroupid': exGroup.id,
                      'data-exerciseid': ex.id,
                      name: 'reps'
                    }}
                    type='text'
                    placeholder={'enter reps'}
                    value={ex.reps}
                    onChange={props.onChange}
                    autoComplete={'off'}
                    variant='outlined'
                    size='small'
                  />
                </TableCell>
              </React.Fragment>
            )
          })}
        </TableRow>
      )
    })
  }

  const renderExerciseGroups = () => {
    return props.wo.exerciseGroups.map((exGroup, index) => {
      return (
        <Accordion key={`${exGroup}-${index}`} className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography className={classes.heading}>
              Exercise Group {index}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                // size='small'
                aria-label='a dense table'
              >
                {renderTableOneHeaderRowsMobile(exGroup)}
                <TableBody>{renderRowsMobile(exGroup, index)}</TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      )
    })
  }

  return <div style={{ margin: 'auto' }}>{renderExerciseGroups()}</div>
}

export default WorkoutTableMobile
