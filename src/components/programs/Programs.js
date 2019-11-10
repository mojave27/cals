import React, { useState, useEffect } from 'react'
import retrieve from '../../api/retrievePrograms'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin:'10px'
  },
  paper: {
    margin: '5px',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

const Programs = props => {
  const [programs, setPrograms] = useState([])
  const classes = useStyles()

  const ProgramRow = program => {
      console.log(`in ProgramRow with ${program}`)
    let index = program.id
    return (
      <React.Fragment key={index}>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>{program.name}</Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  const renderPrograms = programs => {
    if (programs && programs.length > 0) {
        console.log(`we have programs`)
      return programs.map(program => {
        console.log(program)
        return ProgramRow(program)
      })
    } else {
      return <div>No Progams</div>
    }
  }

  useEffect(() => {
    let didCancel = false

    async function fetchMyAPI() {
      const response = await retrieve()
      if (!didCancel) {
        // Ignore if we started fetching something else
        console.log(response)
        setPrograms(response)
      }
    }

    fetchMyAPI()
    return () => {
      didCancel = true
    } // Remember if we start fetching something else
  }, [])

  //   return <React.Fragment>{renderPrograms(programs)}</React.Fragment>
  return (
    <div className={classes.root}>
      <Grid container direction={'column'}spacing={0} >
        {renderPrograms(programs)}
      </Grid>
    </div>
  )
}

export default Programs
