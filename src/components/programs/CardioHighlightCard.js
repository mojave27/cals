import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  container: {
    marginBottom: '10px',
  },
  th: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    textAlign: 'left',
  },
  td: {
    textAlign: 'left',
  },
  cardHeader: {
    padding: '6px 16px 0px 16px',
  },
  cardContent: {
    padding: '8px 16px 0px 16px',
  },
  cardio: {
    color: theme.palette.info.main,
  },
}))

const CardioHighlightCard = (props) => {
  let classes = useStyles()

  return (
    <React.Fragment>
      <Card
        className={classes.root}
        style={{ maxWidth: props.maxWidth }}
        variant='outlined'
        key={props.id}
      >
        <CardContent>
          {props.data.map((row, index) => {
            return (
              <div
                key={`${row.name}-${index}`}
                className={classes.cardio}
              >{`${row.name} - ${row.targets}`}</div>
            )
          })}
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

CardioHighlightCard.defaultProps = {
  id: 0,
  data: { headers: [], rows: [] },
  deleteRow: (event) => {
    console.log({ event })
  },
}

export default CardioHighlightCard
