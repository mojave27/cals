import React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { navigate } from '@reach/router'
import { useState, useEffect } from 'react'
import retrieve from '../../api/retrievePrograms'
import retrieveProgram from '../../api/retrieveProgramById'
import ProgramHighlightCard from './ProgramHighlightCard'
import ProgramCard from './ProgramCard'
import { isEmpty } from 'lodash'
import { formButton } from '../../styles/theme'

const container = css({
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridGap: '10px'
})

const Programs = () => {
  const [programs, setPrograms] = useState([])
  const [selectedProgram, setSelectedProgram] = useState({})

  const handleProgramSelect = event => {
    let id = event.currentTarget.id
    const program = retrieveFullProgram(id)
    setSelectedProgram(program)
  }

  const retrieveFullProgram = programId => {
    async function fetchProgram(programId) {
      const response = await retrieveProgram(programId)
      console.log(response.fullProgram)
      setSelectedProgram(response.fullProgram)
    }
    fetchProgram(programId)
  }

  const ProgramRow = program => {
    let index = program.id
    return (
      <ProgramHighlightCard
        key={index}
        program={program}
        onClick={handleProgramSelect}
      />
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

  const handleAddProgramClick = async () => {
    await navigate(
      `/program-form`
    )
  }

  //   TODO: fix this conditional render.
  return isEmpty(selectedProgram) ? (
    <React.Fragment>
      <button css={formButton} style={{float:'none',marginBottom: '10px'}} onClick={handleAddProgramClick}>Add Program</button>
      <div css={container}>{renderPrograms(programs)}</div>
    </React.Fragment>
  ) : (
    <ProgramCard program={selectedProgram} />
  )
}

export default Programs
