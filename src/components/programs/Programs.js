import React, { useState, useEffect } from 'react'
import retrieve from '../../api/retrievePrograms'
import { makeStyles } from '@material-ui/core/styles';
import Program from './Program'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    // gridTemplateColumns: 'repeat(12, 1fr)',
    gridTemplateColumns: 'auto',
    gridGap: '10px'
  },
  paper: {
    margin: '5px',
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary
  }
}))

const Programs = props => {
  const [programs, setPrograms] = useState([])
    const classes = useStyles()

  const ProgramRow = program => {
    console.log(`in ProgramRow with ${program}`)
    let index = program.id
    return (
    //   <React.Fragment key={index}>
    //     <Grid container item xs={12}>
    //       <Grid item xs={12}>
    //         <Paper className={classes.paper}>{program.name}</Paper>
    //       </Grid>
    //     </Grid>
    //   </React.Fragment>
            // <div key={index} style={{ border: '1px solid lime ', textAlign: 'center' }} >
            //   <div className={classes.paper}>{program.name}</div>
            // </div>
            <Program program={program} />
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
    <div className={classes.container}>
        {renderPrograms(programs)}
    </div>
  )
}

export default Programs
