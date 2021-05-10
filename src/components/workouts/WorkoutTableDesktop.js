import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import DeleteIcon from '@material-ui/icons/Delete'
import BlockIcon from '@material-ui/icons/Block'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Tooltip,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: `${theme.mobile === true ? '100%' : 'auto'}`,
  },
  table: {
    minWidth: '80%',
  },
  tableCell: {
    fontSize: '16px',
    padding: '5px',
    border: 0,
  },
  tableHeaderCell: {
    fontSize: '16px',
    padding: '5px',
  },
  input: {
    font: 'inherit',
    width: '100%',
    height: '1.1876em',
    margin: 0,
    display: 'block',
    padding: '6px 0 7px',
    minWidth: 0,
    boxSizing: 'content-box',
    letterSpacing: 'inherit',
    animationDuration: '10ms',
    textAlign: 'center',
  },
  accordion: {
    border: `1px solid ${theme.palette.grey[300]}`,
  },
  accordionDetails: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
  },
  expandIcon: {},
  notesIcon: { marginLeft: '10px' },
}))

const hasNotes = (exercise) => {
  const empty = undefined === exercise.notes || exercise.notes.length <= 0
  return !empty
}

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip)

const WorkoutTableDesktop = (props) => {
  const classes = useStyles()

  const renderTableOneHeaderRowsMobile = (exGroup) => {
    let headerCells = []
    let secondRowHeaderCells = []

    exGroup.exercises.forEach((exercise) => {
      headerCells.push(
        <TableCell
          key={`${exercise.id}-header`}
          colSpan={3}
          classes={{ root: classes.tableHeaderCell }}
          align={'center'}
        >
          <Typography className={classes.heading}>
            {exercise.name}
            {hasNotes(exercise) ? (
              <CustomTooltip
                title={
                  <React.Fragment>
                    <Typography color='inherit'>Exercise Notes</Typography>
                    <em>{exercise.notes}</em>
                  </React.Fragment>
                }
              >
                <AssignmentOutlinedIcon classes={{ root: classes.notesIcon }} />
              </CustomTooltip>
            ) : null}
          </Typography>
        </TableCell>
      )

      secondRowHeaderCells.push(
        <React.Fragment key={`${exercise.id}-weight`}>
          <TableCell
            classes={{ root: classes.tableHeaderCell }}
            align={'center'}
          >
            {''}
          </TableCell>
          <TableCell
            classes={{ root: classes.tableHeaderCell }}
            align={'center'}
          >
            {'weight'}
          </TableCell>
          <TableCell
            classes={{ root: classes.tableHeaderCell }}
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

  const disableIt = (event) => {
    console.log(event)
    alert('disable')
  }

  const renderRows = (exGroup, index) => {
    return props.wo.sets.map((set) => {
      let matchingSetExGroup = set.exerciseGroups.find(
        (setExGrp) => setExGrp.id === exGroup.id
      )
      return (
        <TableRow
          key={`${set.id}-${exGroup.id}`}
          id={exGroup.id}
          style={{ borderBottom: '1px solid lightgrey' }}
        >
          {matchingSetExGroup.exercises.map((ex) => {
            return (
              <React.Fragment key={`${set.id}-${ex.id}`}>
                <TableCell classes={{ root: classes.tableCell }}>
                  {/* <span onClick={disableIt}>{'disable'}</span> */}
                  <IconButton aria-label='delete' onClick={disableIt}>
                    <BlockIcon color='inherit' style={{ margin: '1px' }} />
                  </IconButton>
                </TableCell>
                <TableCell classes={{ root: classes.tableCell }}>
                  <input
                    data-setid={set.id}
                    data-exgroupid={exGroup.id}
                    data-exerciseid={ex.id}
                    name={'weight'}
                    // type='text'
                    type='tel'
                    placeholder={'enter weight'}
                    value={ex.weight}
                    onChange={props.onChange}
                    autoComplete={'off'}
                    className={classes.input}
                  />
                </TableCell>

                <TableCell classes={{ root: classes.tableCell }}>
                  <input
                    data-setid={set.id}
                    data-exgroupid={exGroup.id}
                    data-exerciseid={ex.id}
                    name={'reps'}
                    // type='text'
                    type='tel'
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
    if (props.wo.exerciseGroups.length === 1) {
      const exGroup = props.wo.exerciseGroups[0]
      return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='a dense table'>
            {renderTableOneHeaderRowsMobile(exGroup)}
            <TableBody>{renderRows(exGroup, 0)}</TableBody>
          </Table>
        </TableContainer>
      )
    } else {
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
            <AccordionDetails className={classes.accordionDetails}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='a dense table'>
                  {renderTableOneHeaderRowsMobile(exGroup)}
                  <TableBody>{renderRows(exGroup, index)}</TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        )
      })
    }
  }

  return <div style={{ margin: 'auto' }}>{renderExerciseGroups()}</div>
}

export default WorkoutTableDesktop
