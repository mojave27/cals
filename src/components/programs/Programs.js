import React, { useState, useEffect } from 'react'
import retrieve from '../../api/retrievePrograms'
// import { makeStyles } from '@material-ui/core/styles';
import Program from './Program'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const container = css({
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridGap: '10px'
})

const paper = css({
  margin: '5px'
  //     padding: theme.spacing(1),
  //     textAlign: 'center',
  //     color: theme.palette.text.secondary
})

const Programs = props => {
  const [programs, setPrograms] = useState([])

  const ProgramRow = program => {
    let index = program.id
    return (
      <Program key={index} program={program} />
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
      return <div></div>
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
  return <div css={container}>{renderPrograms(programs)}</div>
}

export default Programs
