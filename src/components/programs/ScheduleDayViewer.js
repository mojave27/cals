import React, { useContext } from 'react'
import ThemeContext from '../../context/ThemeContext'
import {
  Card,
  CardHeader,
  CardContent,
  Container
} from '@material-ui/core'
import CardioCard from './CardioCard'
import WorkoutCard from '../workouts/WorkoutCard'
import { makeStyles } from '@material-ui/core/styles'
import { retrieveItemById } from '../ArrayUtils'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    margin: 'auto'
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
    width: '70%'
  },
  td: {
    textAlign: 'left',
    color: theme.color4_text.hex
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

const ScheduleDayViewer = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)

  const renderCardio = () => {
    return (
      props.day.routine.cardio ?
      <Container>
        {props.day.routine.cardio.map(cardioId => {
          let cardioRoutine = retrieveItemById(
            cardioId,
            props.program.cardio
          )
          return (
            <CardioCard data={[cardioRoutine]} key={cardioRoutine.id} />
          )
        })}
      </Container>
      :
      null
    )
  }

  const renderWorkouts = () => {
    return (
      props.day.routine.workouts.length > 0 ?
      <Container>
        {props.day.routine.workouts.map(workoutId => {
          let wo = retrieveItemById(workoutId, props.program.workouts)
          return (
            <WorkoutCard disabled={true} item={wo} id={wo.id} key={wo.id} />
          )
        })}
      </Container>
      : null
    )
  }

  return (
    <React.Fragment>
      <Card
        className={classes.root}
        style={{ maxWidth: props.maxWidth }}
        variant='outlined'
        key={props.id}
      >
        <CardHeader
          className={classes.cardHeader}
          title={props.day.name}
          titleTypographyProps={{ variant: 'h6' }}
        />
        <CardContent className={classes.cardContent}>
          {renderCardio()}
          {renderWorkouts()}
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

export default ScheduleDayViewer
