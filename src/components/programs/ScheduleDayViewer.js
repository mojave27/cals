import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import { Card, CardContent, Container, Typography } from '@material-ui/core'
import CardioCard from './CardioCard'
import WorkoutCard from '../workouts/WorkoutCard'
import { makeStyles } from '@material-ui/core/styles'
import { retrieveItemById } from '../ArrayUtils'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    margin: 'auto',
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
    padding: '5px',
    margin: '0px',
  }
}))

const ScheduleDayViewer = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)

  const renderCardio = () => {
    return props.day.routine.cardio ? (
      <React.Fragment>
        <Typography variant={'h5'} gutterBottom>{'Cardio'}</Typography>
        {props.day.routine.cardio.map(cardioId => {
          let cardioRoutine = retrieveItemById(cardioId, props.program.cardio)
          return <CardioCard data={[cardioRoutine]} key={cardioRoutine.id} />
        })}
      </React.Fragment>
    ) : null
  }

  const renderWorkouts = () => {
    return props.day.routine.workouts.length > 0 ? (
      <React.Fragment>
        <Typography variant={'h5'} gutterBottom>{'Weights'}</Typography>
        {props.day.routine.workouts.map(workoutId => {
          let wo = retrieveItemById(workoutId, props.program.workouts)
          return (
            <WorkoutCard disabled={true} item={wo} id={wo.id} key={wo.id} />
          )
        })}
      </React.Fragment>
    ) : null
  }

  return (
    <Card
      className={classes.root}
      variant='outlined'
      key={props.id}
      id={'card'}
    >
      <CardContent className={classes.cardContent} id={'cardContent'}>
        {renderCardio()}
        {renderWorkouts()}
      </CardContent>
    </Card>
  )
}

export default ScheduleDayViewer
