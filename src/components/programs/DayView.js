import React, { useContext } from 'react'
import { convertTemplateToActiveWorkout } from 'components/workouts/workoutTemplateConverter'
import ProgramContext from 'context/ProgramContext'
import WoDayContext from 'context/WoDayContext'
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core'
import CardioCard from 'components/programs/CardioCard'
import WorkoutCard from 'components/workouts/WorkoutCard'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { makeStyles } from '@material-ui/core/styles'
import { retrieveItemById } from 'components/modules/common/utilties/ArrayUtils'
import FormButton from 'components/inputs/FormButton'
import { navigate } from '@reach/router';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    margin: 'auto'
  },
  container: {
    marginBottom: '10px'
  },
  th: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
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
    // padding: '5px',
    margin: '0px'
  }
}))

const DayView = props => {
  let programContext = useContext(ProgramContext)
  let woDayContext = useContext(WoDayContext)
  const classes = useStyles()

  const handleClick = () => {
    if (props.onClick) props.onClick(props.id)
  }

  const editItem = id => {
    if (props.editItem) props.editItem(id)
  }

  const deleteItem = id => {
    if (props.deleteItem) props.deleteItem(id)
  }

  const launchWoDay = async id => {
    let cardio = []
    let workouts = []
    props.item.routine.cardio.forEach(id => {
      // eslint-disable-next-line eqeqeq
      let cardioEx = programContext.program.cardio.find(ex => ex.id == id)
      cardioEx.type = cardioEx.name
      cardio.push(cardioEx)
    })
    props.item.routine.workouts.forEach(id => {
      // eslint-disable-next-line eqeqeq
      let wo = programContext.program.workouts.find(ex => ex.id == id)
      workouts.push(wo)
    })

    await woDayContext.setEmptyWoDay() 
    let woday = woDayContext.copyWoDay()
    woday.cardio.exercises = cardio
    let newWo = convertTemplateToActiveWorkout(workouts[0])
    woday.wo = newWo
    woDayContext.updateWoDay(woday)
    navigate("/woday")  
  }

  const renderCardioForDay = id => {
    let day = retrieveItemById(id, programContext.program.schedule.days)
    return day.routine.cardio && day.routine.cardio.length > 0 ? (
      <React.Fragment>
        <Typography variant={'h5'} gutterBottom>
          {'Cardio'}
        </Typography>
        {day.routine.cardio.map(cardioId => {
          let cardioRoutine = retrieveItemById(
            cardioId,
            programContext.program.cardio
          )
          return <CardioCard data={[cardioRoutine]} key={cardioRoutine.id} />
        })}
      </React.Fragment>
    ) : null
  }

  const renderWorkoutsForDay = id => {
    let day = retrieveItemById(id, programContext.program.schedule.days)
    return day.routine.workouts && day.routine.workouts.length > 0 ? (
      <React.Fragment>
        <Typography variant={'h5'} gutterBottom>
          {'Weights'}
        </Typography>
        {day.routine.workouts.map(workoutId => {
          let wo = retrieveItemById(workoutId, programContext.program.workouts)
          return (
            <WorkoutCard disabled={true} item={wo} id={wo.id} key={wo.id} />
          )
        })}
      </React.Fragment>
    ) : null
  }

  return (
    <React.Fragment>
        <Grid container direction={'column'} justify={'center'} alignItems={'flex-start'}>
          {props.disabled === true ? (
          <Grid item>
            <Box style={{ padding: '10px' }}>
              <FormButton
                value={'do it'}
                onClick={() => launchWoDay(props.item.id)}
              />
            </Box>
          </Grid>) : null}
          <Grid item xs={12} sm={6}>
            <Card
              className={classes.root}
              style={{ maxWidth: props.maxWidth }}
              variant='outlined'
              onClick={handleClick}
              key={props.id}
            >
              <CardHeader
                className={classes.cardHeader}
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
                <Box style={{ padding: '10px' }}>
                  {renderCardioForDay(props.item.id)}
                </Box>
                <Box style={{ padding: '10px' }}>
                  {renderWorkoutsForDay(props.item.id)}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    </React.Fragment>
  )
}

export default DayView
