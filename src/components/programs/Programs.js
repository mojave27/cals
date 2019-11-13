/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState, useEffect } from 'react'
import retrieve from '../../api/retrievePrograms'
import retrieveWorkouts from '../../api/retrieveWorkoutsByProgramId'
import Program from './Program'

const container = css({
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridGap: '10px'
})

const Programs = props => {
  const [programs, setPrograms] = useState([])
  const [selectedProgram, setSelectedProgram] = useState([])

  const handleProgramSelect = event => {
    let id = event.currentTarget.id
    // let program = programs.find( program => {
    //   return program.id == id
    // })
    retrieveProgram(id)
    // setSelectedProgram(program)
  }

  const retrieveProgram = (programId) => {
    async function fetchWorkoutsForProgram(programId) {
      const response = await retrieveWorkouts(programId)
      console.log(response)
    }
    fetchWorkoutsForProgram(programId)
  }

  const ProgramRow = program => {
    let index = program.id
    return (
      <Program key={index} program={program} onClick={handleProgramSelect}/>
    )
  }

  const renderPrograms = programs => {
    if (programs && programs.length > 0) {
      return programs.map(program => {
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
