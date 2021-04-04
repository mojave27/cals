import React, { Fragment, useContext } from 'react'
import { convertTemplateToActiveWorkout } from 'components/workouts/workoutTemplateConverter'
import ProgramContext from 'context/ProgramContext'
import WoDayContext from 'context/WoDayContext'
import WorkoutHighlightCard from 'components/workouts/WorkoutHighlightCard'
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core'
import CardioHighlightCard from 'components/programs/CardioHighlightCard'
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
  },
  cardio: {
    color: theme.palette.info.main
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
        {/* <Typography variant={'h5'} gutterBottom style={{color:'blue'}}> */}
        <Typography variant={'h5'} gutterBottom className={classes.cardio}>
          {'Cardio'}
        </Typography>
        {day.routine.cardio.map(cardioId => {
          let cardioRoutine = retrieveItemById(
            cardioId,
            programContext.program.cardio
          )
          return <CardioHighlightCard data={[cardioRoutine]} key={cardioRoutine.id} />
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
            // <WorkoutCard disabled={true} item={wo} id={wo.id} key={wo.id} />
      <WorkoutHighlightCard
        disabled={true}
        selected={false}
        key={wo.id}
        id={wo.id}
        item={wo}
        onClick={() => handleClick(wo.id)}
      />
          )
        })}
      </React.Fragment>
    ) : null
  }

  const hasCardio = () => {
    if (props.item.routine.cardio === undefined) return false
    if (props.item.routine.cardio.length <= 0) return false
    return true
  }

  const hasWorkout = () => {
    // console.log(props.item.workouts)
    if (props.item.routine.workouts === undefined) return false
    if (props.item.routine.workouts.length <= 0) return false
    return true
  }

  const hasContent = () => {
    return hasCardio() || hasWorkout()
  }

  return (
    hasContent() ?
    <React.Fragment>
        <Grid container direction={'column'} justify={'center'} alignItems={'flex-start'} >
          {props.disabled === false ? (
          <Grid item>
            <Box style={{ padding: '10px' }}>
              <FormButton
                value={'do it'}
                onClick={() => launchWoDay(props.item.id)}
              />
            </Box>
          </Grid>) : null}

          <Grid item xs={12} sm={12}>
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
                {hasCardio() ?
                <Fragment>
                <Box style={{ padding: '10px' }}>
                  {renderCardioForDay(props.item.id)}
                </Box><Divider/></Fragment> : null}
                {hasWorkout() ?
                <Box style={{ padding: '10px' }}>
                  {renderWorkoutsForDay(props.item.id)}
                </Box> : null}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    </React.Fragment>
    : null
  )
}

export default DayView
