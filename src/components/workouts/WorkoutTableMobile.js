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
    // backgroundColor: theme.color2.hex,
    // color: theme.color2_text.hex
  },
  tableCell: {
    padding: '5px',
    // backgroundColor: theme.color3.rgba(0.2),
    color: theme.color3_text.hex,
    border: 0
  },
  tableHeaderCell: {
    padding: '5px',
    // backgroundColor: theme.color5.rgba(0.8),
    // color: theme.color5_text.hex
  },
  input: {
    font: 'inherit',
    // color: theme.color1_text.hex,
    width: '100%',
    // border: `1px solid ${theme.color3.hex}`,
    height: '1.1876em',
    margin: 0,
    display: 'block',
    padding: '6px 0 7px',
    minWidth: 0,
    // backgroundColor: theme.color1.hex,
    boxSizing: 'content-box',
    letterSpacing: 'inherit',
    animationDuration: '10ms',
    textAlign: 'center'
  },
  accordion: {
    // backgroundColor: theme.color2.hex,
    // color: theme.color2_text.hex,
    border: '1px solid'
  },
  expandIcon: {
    // color: theme.color2_text.hex
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
        <TableCell
          key={`${exercise.id}-header`}
          colSpan={2}
          classes={{ root: classes.tableHeaderCell }}
          align={'center'}
          // style={{ borderRight: '1px solid grey' }}
        >
          {exercise.name}
        </TableCell>
      )

      secondRowHeaderCells.push(
        <React.Fragment key={`${exercise.id}-weight`}>
          <TableCell
            classes={{ root: classes.tableHeaderCell }}
            align={'center'}
          >
            {'weight'}
          </TableCell>
          <TableCell
            classes={{ root: classes.tableHeaderCell }}
            // style={{ borderRight: '1px solid grey' }}
            align={'center'}
          >
            {'reps'}
          </TableCell>
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

  const renderRows = (exGroup, index) => {
    return props.wo.sets.map(set => {
      let matchingSetExGroup = set.exerciseGroups.find(
        setExGrp => setExGrp.id === exGroup.id
      )
      return (
        <TableRow
          key={`${set.id}-${exGroup.id}`}
          id={exGroup.id}
          style={{ borderBottom: '1px solid lightgrey' }}
        >
          {matchingSetExGroup.exercises.map(ex => {
            return (
              <React.Fragment key={`${set.id}-${ex.id}`}>
                <TableCell classes={{ root: classes.tableCell }}>
                  <input
                    data-setid={set.id}
                    data-exgroupid={exGroup.id}
                    data-exerciseid={ex.id}
                    name={'weight'}
                    type='text'
                    placeholder={'enter weight'}
                    value={ex.weight}
                    onChange={props.onChange}
                    autoComplete={'off'}
                    className={classes.input}
                  />
                </TableCell>

                <TableCell
                  classes={{ root: classes.tableCell }}
                  // style={{ borderRight: '1px solid grey' }}
                >
                  <input
                    data-setid={set.id}
                    data-exgroupid={exGroup.id}
                    data-exerciseid={ex.id}
                    name={'reps'}
                    type='text'
                    placeholder={'enter reps'}
                    value={ex.reps}
                    onChange={props.onChange}
                    autoComplete={'off'}
                    className={classes.input}
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
            expandIcon={
              <ExpandMoreIcon classes={{ root: classes.expandIcon }} />
            }
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography className={classes.heading}>
              Exercise Group {index + 1}
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
                <TableBody>{renderRows(exGroup, index)}</TableBody>
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
