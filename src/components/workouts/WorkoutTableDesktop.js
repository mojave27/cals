import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
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
import { isEmpty, isUndefined } from 'lodash'

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -5,
    top: 5,
    border: `2px solid ${theme.palette.success.light}`,
    backgroundColor: theme.palette.success.light,
  },
}))(Badge)

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: `${theme.mobile === true ? '100%' : 'auto'}`,
  },
  table: {
    maxWidth: '80%',
    margin: 'auto'
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
          colSpan={2}
          classes={{ root: classes.tableHeaderCell }}
          align={'center'}
        >
          <Typography className={classes.heading}>
            {exercise.name} - <i>{exercise.targets}</i>
            <Tooltip title='Add Set'>
              <IconButton
                aria-label='delete'
                onClick={() => addSet(exGroup.id, exercise.id)}
              >
                <AddIcon color='inherit' style={{ margin: '1px' }} />
              </IconButton>
            </Tooltip>
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

  const maxSets = (exGroup) => {
    let max = 0
    exGroup.exercises.forEach((ex) => {
      let total = ex.sets.length
      if (total > max) max = total
    })
    return max
  }

  const handleSetChange = (event) => {
    let update = {
      rowIndex: event.target.dataset.rowindex,
      exerciseId: event.target.dataset.exerciseid,
      exGroupId: event.target.dataset.exgroupid,
      name: event.target.name,
      value: event.target.value,
    }
    props.onChange(update)
  }

  const renderSetForRow = (exGroup, rowIndex) => {
    let cellBlocks = []
    exGroup.exercises.forEach((ex) => {
      let set = ex.sets[rowIndex]
      if (isUndefined(set)) {
        cellBlocks.push(disabledCellBlock(exGroup, ex, rowIndex))
      } else {
        cellBlocks.push(
          <React.Fragment key={`${ex.id}-${rowIndex}`}>
            <TableCell classes={{ root: classes.tableCell }}>
              <input
                data-rowindex={rowIndex}
                data-exgroupid={exGroup.id}
                data-exerciseid={ex.id}
                name={'weight'}
                type='tel'
                placeholder={'enter weight'}
                value={set.weight}
                onChange={handleSetChange}
                autoComplete={'off'}
                className={classes.input}
              />
            </TableCell>

            <TableCell classes={{ root: classes.tableCell }}>
              <input
                data-rowindex={rowIndex}
                data-exgroupid={exGroup.id}
                data-exerciseid={ex.id}
                name={'reps'}
                type='tel'
                placeholder={'enter reps'}
                value={set.reps}
                onChange={handleSetChange}
                autoComplete={'off'}
                className={classes.input}
              />
            </TableCell>
          </React.Fragment>
        )
      }
    })
    return cellBlocks
  }

  const disabledCellBlock = (exGroup, ex, index) => {
    return (
      <React.Fragment key={`${ex.id}-${index}`}>
        <TableCell classes={{ root: classes.tableCell }}>
          <input
            data-rowindex={'disabled'}
            data-exgroupid={exGroup.id}
            data-exerciseid={ex.id}
            name={'weight'}
            type='tel'
            placeholder={'n/a'}
            value={''}
            autoComplete={'off'}
            className={classes.input}
            disabled={true}
          />
        </TableCell>

        <TableCell classes={{ root: classes.tableCell }}>
          <input
            data-rowindex={'disabled'}
            data-exgroupid={exGroup.id}
            data-exerciseid={ex.id}
            name={'reps'}
            type='tel'
            placeholder={'n/a'}
            value={''}
            autoComplete={'off'}
            className={classes.input}
            disabled={true}
          />
        </TableCell>
      </React.Fragment>
    )
  }

  const renderRows = (exGroup) => {
    /* for each row
     * - get the max number of sets we'll need (from exercises > ex > sets)
     * - take each ex in the exGroup
     *   - take the set from the exercise which matches the row (row 0 = set 0, row 1 = set 1, etc)
     // - use the reps and weight from that set in the TableCell
     //   - if there is no matching set for the row, make the TableCell with empty & disabled
     */

    let rows = []

    //  - get the max number of sets we'll need (from exercises > ex > sets)
    let maxSetCount = maxSets(exGroup)

    for (let rowIndex = 0; rowIndex < maxSetCount; rowIndex++) {
      rows.push(
        <TableRow
          key={`${rowIndex}-${exGroup.id}`}
          id={exGroup.id}
          style={{ borderBottom: '1px solid lightgrey' }}
        >
          {renderSetForRow(exGroup, rowIndex)}
        </TableRow>
      )
    }

    return rows
  }

  const addSet = (exGroupId, exerciseId) => {
    props.addSet(props.wo.id, exGroupId, exerciseId)
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
                <StyledBadge
                  variant='dot'
                  invisible={!exerciseGroupStarted(exGroup)}
                >
                  Exercise Group {index + 1}
                </StyledBadge>
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

const exerciseGroupStarted = exGroup => {
  let isStarted = false
  exGroup.exercises.forEach(ex => {
    if(!isEmpty(ex.sets)) {
      ex.sets.forEach(set => {
        if (set.reps > 0) isStarted = true
      })
    }
  })
  return isStarted
}

export default WorkoutTableDesktop
